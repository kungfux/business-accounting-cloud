import * as sequelize from 'sequelize';
import { CompanyFactory } from './company.model';
import { DocumentFactory } from './document.model';
import { ImageFactory } from './image.model';

export const db = new sequelize.Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'bac.sqlite',
});

export const Company = CompanyFactory(db);
export const Image = ImageFactory(db);
export const Document = DocumentFactory(db);
