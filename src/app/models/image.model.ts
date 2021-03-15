import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ImageAttributes {
  id: number;
  image: Blob;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageModel extends Model<ImageAttributes>, ImageAttributes {}
export class Image extends Model<ImageModel, ImageAttributes> {}

export type ImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};

export function ImageFactory(sequelize: Sequelize): ImageStatic {
  return <ImageStatic>sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  });
}
