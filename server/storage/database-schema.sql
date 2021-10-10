CREATE TABLE IF NOT EXISTS PICTURES (
 [id]      INTEGER PRIMARY KEY AUTOINCREMENT,
 [picture] BLOB,
 [created] TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS COMPANIES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL UNIQUE,
 [picture_id] INTEGER
              REFERENCES PICTURES(id)
              ON DELETE SET NULL,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DOCUMENTS (
 [id]       INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]    VARCHAR NOT NULL,
 [comment]  VARCHAR,
 [document] BLOB NOT NULL,
 [created] TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS COMPANY_DOCUMENTS (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [company_id]  INTEGER NOT NULL
               REFERENCES COMPANIES(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES DOCUMENTS(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TITLES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [rate]       FLOAT,
 [billable]   BIT NOT NULL,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE CASCADE,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CONTACTS (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [phone]      VARCHAR,
 [cellphone]  VARCHAR,
 [email]      VARCHAR,
 [address]    VARCHAR,
 [dob]        DATE,
 [note]       VARCHAR,
 [hired]      DATE,
 [fired]      DATE,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE CASCADE,
 [title_id]   INTEGER NOT NULL
              REFERENCES TITLES(id)
              ON DELETE SET NULL,
 [picture_id] INTEGER NOT NULL
              REFERENCES PICTURES(id)
              ON DELETE SET NULL,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CONTACT_DOCUMENTS (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [contact_id]  INTEGER NOT NULL
               REFERENCES CONTACTS(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES DOCUMENTS(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PROPERTIES (
 [id]               INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]            VARCHAR NOT NULL,
 [inventory_number] VARCHAR,
 [comment]          VARCHAR,
 [company_id]       INTEGER NOT NULL
                    REFERENCES COMPANIES(id)
                    ON DELETE CASCADE,
 [created]          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PROPERTY_DOCUMENTS (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [property_id] INTEGER NOT NULL
               REFERENCES PROPERTIES(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES COMPANIES(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EXPENDITURES (
 [id]           INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]        VARCHAR NOT NULL,
 [default_cost] FLOAT,
 [company_id]   INTEGER NOT NULL
                REFERENCES COMPANIES(id)
                ON DELETE CASCADE,
 [created]      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS OPERATIONS (
 [id]             INTEGER PRIMARY KEY AUTOINCREMENT,
 [when]           DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [amount]         FLOAT NOT NULL,
 [comment]        VARCHAR,
 [document_id]    INTEGER
                  REFERENCES DOCUMENTS(id)
                  ON DELETE SET NULL,
 [contact_id]     INTEGER
                  REFERENCES CONTACTS(id)
                  ON DELETE RESTRICT,
 [property_id]    INTEGER
                  REFERENCES PROPERTIES(id)
                  ON DELETE RESTRICT,
 [expenditure_id] INTEGER
                  REFERENCES EXPENDITURES(id)
                  ON DELETE RESTRICT,
 [company_id]     INTEGER NOT NULL
                  REFERENCES COMPANIES(id)
                  ON DELETE CASCADE,
 [created]        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS USERS (
 [id]       INTEGER PRIMARY KEY AUTOINCREMENT,
 [login]    VARCHAR NOT NULL UNIQUE,
 [password] VARCHAR NOT NULL,
 [salt]     VARCHAR NOT NULL,
 [created]  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)