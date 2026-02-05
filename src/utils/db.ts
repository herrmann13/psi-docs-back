import { dbConfig } from '../config/db.config';
import { Sequelize } from 'sequelize';

const database = process.env.DB_NAME as string

const sequelize = new Sequelize(database ?? '',dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port ? Number(dbConfig.port) : undefined,
    dialect: 'postgres',
    logging: false
})

export default sequelize;