import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `${__dirname}/.db/sql`,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(
  config as unknown as DataSourceOptions,
);
