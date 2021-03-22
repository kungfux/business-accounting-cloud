import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Image } from './image.model';

export interface CompanyAttributes {
  id: number;
  name: string;
  logo: Image;
  documents: Document[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyModel extends Model<CompanyAttributes>, CompanyAttributes {}
export class Company extends Model<CompanyModel, CompanyAttributes> {}

export type CompanyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CompanyModel;
};

export function CompanyFactory(sequelize: Sequelize): CompanyStatic {
  return <CompanyStatic>sequelize.define(
    'Company',
    {
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
      logo: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'COMPANY',
    }
  );
}
