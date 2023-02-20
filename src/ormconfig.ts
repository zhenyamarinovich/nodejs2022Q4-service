import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  autoLoadEntities: true,
} as DataSourceOptions;

export default new DataSource(dataSourceOptions);
