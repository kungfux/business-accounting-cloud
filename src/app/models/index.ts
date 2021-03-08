import * as dotenv from 'dotenv';
import * as sequelize from 'sequelize';
import { CompanyFactory } from './company.model';

export const db = new sequelize.Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'bac.sqlite',
});

export const Company = CompanyFactory(db);
