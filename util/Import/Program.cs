using System;
using System.Data;

namespace Import
{
    internal class Program
    {
        private const string NewCompanyName = "Импорт";
        private const string NewExpenseName = "Импортированные расходы";
        private const string NewIncomeName = "Импортированные доходы";

        private static string ConstructConnectionString(string dbPath)
        {
            return $"Data Source={dbPath};Version=3;FailIfMissing=True;UTF8Encoding=True;foreign keys=true;";
        }

        private static string ConvertDateTime(object value)
        {
            if (value.GetType() == typeof(DBNull))
            {
                return null;
            }
            if (DateTime.TryParse(value.ToString(), out var dt))
            {
                return dt.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
            }
            else
            {
                return null;
            }
        }

        private static decimal ConvertSum(object value)
        {
            return decimal.Parse(value.ToString());
        }

        private static string ConvertText(object value)
        {
            if (value.GetType() == typeof(DBNull))
            {
                return null;
            }
            return string.IsNullOrWhiteSpace(value.ToString()) ? null : value.ToString();
        }

        private static void Db_OnError(string pErrorMessage)
        {
            Console.WriteLine($"ERROR: {pErrorMessage}");
            Exit();
        }

        private static void Exit()
        {
            Console.WriteLine("Press any key to close...");
            Console.ReadKey();
            Environment.Exit(1);
        }

        private static void Main(string[] args)
        {
            Console.WriteLine("Business Accounting Cloud ::: Import Utility");
            Console.WriteLine("============================================");
            Console.WriteLine("");

            if (args.Length < 2)
            {
                Console.WriteLine("Usage:");
                Console.WriteLine("  ImportUtility.exe ba.sqlite bac.sqlite");
                Exit();
            }

            var oldDbPath = args[0];
            var newDbPath = args[1];

            Console.WriteLine($"You are going to import data from {oldDbPath} to new database {newDbPath}");
            Console.WriteLine("Is this correct?");
            var key = Console.ReadKey();
            Console.WriteLine();
            if (key.Key != ConsoleKey.Y)
            {
                Console.WriteLine("Operation not confirmed by the user, existing!");
                Exit();
            }

            var oldDb = new XDatabase.XQuerySqlite(ConstructConnectionString(oldDbPath));
            var newDb = new XDatabase.XQuerySqlite(ConstructConnectionString(newDbPath));

            oldDb.TestConnection(ConstructConnectionString(oldDbPath));
            oldDb.KeepConnectionOpen = true;
            oldDb.OnError += Db_OnError;

            newDb.TestConnection(ConstructConnectionString(newDbPath));
            newDb.KeepConnectionOpen = true;
            newDb.OnError += Db_OnError;
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            newDb.BeginTransaction();
            Console.Write("Add company...");
            var createdCompany = newDb.Insert("insert into companies (name, logo, enabled) values (@name, @logo, @enabled);",
                new XDatabase.XParameter("@name", NewCompanyName),
                new XDatabase.XParameter("@logo", "sync"),
                new XDatabase.XParameter("@enabled", 0));

            var companyId = newDb.SelectCellAs<long>("select id from companies where name = @name",
                new XDatabase.XParameter("@name", NewCompanyName));
            if (companyId <= 0)
            {
                Console.WriteLine("Failed to get the company");
                Exit();
            }
            Console.WriteLine("OK");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            Console.Write("Import contacts...");
            var employees = oldDb.SelectTable("select id, photo, hired, fired, fullname, document, telephone, address, notes from ba_employees_cardindex;");
            foreach (DataRow employee in employees.Rows)
            {
                byte[] photo = null;
                if (employee.ItemArray[1].GetType() != typeof(DBNull))
                {
                    photo = oldDb.SelectCellAs<byte[]>("select photo from ba_employees_cardindex where id = @id",
                    new XDatabase.XParameter("@id", employee.ItemArray[0]));
                }

                newDb.Insert("insert into contacts (hired, fired, name, photo, passport, cellphone, address, note, companyId) values (@hired, @fired, @name, @photo, @passport, @cellphone, @address, @note, @companyId);",
                    new XDatabase.XParameter("@hired", ConvertDateTime(employee.ItemArray[2])),
                    new XDatabase.XParameter("@fired", ConvertDateTime(employee.ItemArray[3])),
                    new XDatabase.XParameter("@name", ConvertText(employee.ItemArray[4])),
                    new XDatabase.XParameter("@photo", photo != null ? "data:image/jpeg;base64," + Convert.ToBase64String(photo) : null),
                    new XDatabase.XParameter("@passport", ConvertText(employee.ItemArray[5])),
                    new XDatabase.XParameter("@cellphone", ConvertText(employee.ItemArray[6])),
                    new XDatabase.XParameter("@address", ConvertText(employee.ItemArray[7])),
                    new XDatabase.XParameter("@note", ConvertText(employee.ItemArray[8])),
                    new XDatabase.XParameter("@companyId", companyId)
                    );
            }
            Console.WriteLine("OK");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            Console.Write("Add income category...");
            var createdIncome = newDb.Insert("insert into incomes (title, enabled, companyId) values (@title, @enabled, @companyId);",
                new XDatabase.XParameter("@title", NewIncomeName),
                new XDatabase.XParameter("@enabled", 0),
                new XDatabase.XParameter("@companyId", companyId)
                );
            long? incomeId = null;
            incomeId = newDb.SelectCellAs<long>("select id from incomes where title = @title;",
                new XDatabase.XParameter("@title", NewIncomeName));
            if (incomeId <= 0)
            {
                Console.WriteLine("Failed to get the income category");
                Exit();
            }
            Console.WriteLine("OK");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            Console.Write("Add expense category...");
            var createdExpense = newDb.Insert("insert into expenditures (title, enabled, companyId) values (@title, @enabled, @companyId);",
                new XDatabase.XParameter("@title", NewExpenseName),
                new XDatabase.XParameter("@enabled", 0),
                new XDatabase.XParameter("@companyId", companyId)
                );
            long? expenseId = null;
            expenseId = newDb.SelectCellAs<long>("select id from expenditures where title = @title;",
                new XDatabase.XParameter("@title", NewExpenseName));
            if (incomeId <= 0)
            {
                Console.WriteLine("Failed to get the expense category");
                Exit();
            }
            Console.WriteLine("OK");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            Console.Write("Import operations...");
            var operations = oldDb.SelectTable("select co.datestamp, co.summa, co.comment, ec.emid, em.fullname from ba_cash_operations as co " +
                "left join ba_employees_cash as ec on ec.opid = co.id " +
                "left join ba_employees_cardindex as em on ec.emid = em.id");
            foreach (DataRow operation in operations.Rows)
            {
                string employeeName = operation.ItemArray[3].GetType() != typeof(DBNull) ? operation.ItemArray[4].ToString() : null;
                long? employeeId = null;

                if (employeeName != null)
                {
                    employeeId = newDb.SelectCellAs<long>("select id from contacts where name = @contactName;",
                        new XDatabase.XParameter("@contactName", employeeName));
                    if (employeeId <= 0)
                    {
                        Console.WriteLine("Failed to get the contact");
                        Exit();
                    }
                }

                newDb.Insert("insert into operations (operationDate, amount, comment, contactId, incomeId, expenditureId, companyId) " +
                    "values (@operationDate, @amount, @comment, @contactId, @incomeId, @expenditureId, @companyId);",
                    new XDatabase.XParameter("@operationDate", ConvertDateTime(operation.ItemArray[0])),
                    new XDatabase.XParameter("@amount", ConvertSum(operation.ItemArray[1])),
                    new XDatabase.XParameter("@comment", ConvertText(operation.ItemArray[2])),
                    new XDatabase.XParameter("@contactId", employeeId),
                    new XDatabase.XParameter("@incomeId", employeeId == null && ConvertSum(operation.ItemArray[1]) >= 0 ? incomeId : null),
                    new XDatabase.XParameter("@expenditureId", employeeId == null && ConvertSum(operation.ItemArray[1]) < 0 ? expenseId : null),
                    new XDatabase.XParameter("@companyId", companyId)
                    );
            }
            Console.WriteLine("OK");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            newDb.CommitTransaction();
            oldDb.KeepConnectionOpen = false;
            newDb.KeepConnectionOpen = false;
        }
    }
}
