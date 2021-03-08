import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CompanyAttributes {
  id: number;
  name: string;
  logo: Blob;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyModel extends Model<CompanyAttributes>, CompanyAttributes {}
export class Company extends Model<CompanyModel, CompanyAttributes> {}

export type CompanyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CompanyModel;
};

export function CompanyFactory(sequelize: Sequelize): CompanyStatic {
  return <CompanyStatic>sequelize.define('companies', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
}
