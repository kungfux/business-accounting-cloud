import * as sequelize from 'sequelize';
import { CompanyFactory } from './company.model';
import { DocumentFactory } from './document.model';
import { ImageFactory } from './image.model';
import { TaskFactory } from './task/task.model';
import { TaskStatusFactory } from './task/taskStatus.model';
import { TaskTypeFactory } from './task/taskType.model';

export const db = new sequelize.Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'bac.sqlite',
});

export const Image = ImageFactory(db);
export const Document = DocumentFactory(db);

export const Company = CompanyFactory(db);

export const TaskStatus = TaskStatusFactory(db);
export const TaskType = TaskTypeFactory(db);
export const Task = TaskFactory(db);

Company.belongsTo(Image, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

Company.belongsToMany(Document, {
  through: 'COMPANY_DOCUMENTS',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

TaskStatus.belongsTo(Company, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

TaskType.belongsTo(Company, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

Task.belongsTo(TaskType, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

Task.belongsTo(TaskStatus, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

Task.belongsTo(Company, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
