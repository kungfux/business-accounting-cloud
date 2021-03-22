import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface TaskTypeAttributes {
  id: number;
  title: string;
  color: number;
  createdAt?: Date;
  updatedAt?: Date;
  companyId: number;
}

export interface TaskTypeModel extends Model<TaskTypeAttributes>, TaskTypeAttributes {}
export class TaskType extends Model<TaskTypeModel, TaskTypeAttributes> {}

export type TaskTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TaskTypeModel;
};

export function TaskTypeFactory(sequelize: Sequelize): TaskTypeStatic {
  return <TaskTypeStatic>sequelize.define(
    'TaskType',
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
      color: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'TASK_TYPE',
    }
  );
}
