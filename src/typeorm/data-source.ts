import 'reflect-metadata';
import { User } from './entity/users';
import { Artist } from './entity/artists';
import { Album } from './entity/albums';
import { DataSource } from 'typeorm';
import { Track } from './entity/tracks';
import { Favorites } from './entity/favourites';
import 'dotenv/config';

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_HOST = process.env.POSTGRES_HOST;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Artist, Album, Track, Favorites],
  migrations: [],
  subscribers: [],
  migrationsTableName: 'migrations',
});
