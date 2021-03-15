import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface DocumentAttributes {
  id: number;
  title: string;
  comment: string;
  document: Blob;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentModel extends Model<DocumentAttributes>, DocumentAttributes {}
export class Document extends Model<DocumentModel, DocumentAttributes> {}

export type DocumentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DocumentModel;
};

export function DocumentFactory(sequelize: Sequelize): DocumentStatic {
  return <DocumentStatic>sequelize.define('documents', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    document: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  });
}
