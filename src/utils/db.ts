import { dbConfig } from '../configs/db.config';
import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;
const database = process.env.DB_NAME as string;

const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
    : new Sequelize(database ?? '', dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        port: dbConfig.port ? Number(dbConfig.port) : undefined,
        dialect: 'postgres',
        logging: false
    });

export default sequelize;
