import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  autoLoadEntities: true,
  synchronize: true,
} as DataSourceOptions;

export default new DataSource(dataSourceOptions);
