import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: `${__dirname}/.db/sql`,
  entities:
    process.env.ENVIRONMENT === 'dev'
      ? [__dirname + '/../**/*.entity.{js,ts}']
      : ['dist/**/*.entity{.ts,.js}'],
  migrations:
    process.env.ENVIRONMENT === 'dev'
      ? [__dirname + '/migrations/*.{js,ts}']
      : ['dist/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  logging: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(
  config as unknown as DataSourceOptions,
);
