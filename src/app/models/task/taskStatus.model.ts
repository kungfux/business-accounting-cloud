import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Company } from '../company.model';

export interface TaskStatusAttributes {
  id: number;
  title: string;
  isFinal: boolean;
  isVisible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  company: Company;
}

export interface TaskStatusModel extends Model<TaskStatusAttributes>, TaskStatusAttributes {}
export class TaskStatus extends Model<TaskStatusModel, TaskStatusAttributes> {}

export type TaskStatusStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TaskStatusModel;
};

export function TaskStatusFactory(sequelize: Sequelize): TaskStatusStatic {
  return <TaskStatusStatic>sequelize.define(
    'TaskStatus',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      is_final: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'TASK_STATUS',
    }
  );
}
