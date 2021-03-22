import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Company } from '../company.model';
import { TaskStatus } from './taskStatus.model';
import { TaskType } from './taskType.model';

export interface TaskAttributes {
  id: number;
  title: string;
  desciption: string;
  isActive: boolean;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  type: TaskType;
  status: TaskStatus;
  company: Company;
}

export interface TaskModel extends Model<TaskAttributes>, TaskAttributes {}
export class Task extends Model<TaskModel, TaskAttributes> {}

export type TaskStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TaskModel;
};

export function TaskFactory(sequelize: Sequelize): TaskStatic {
  return <TaskStatic>sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
      },
      due_date: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'TASK',
    }
  );
}
