import { Sequelize } from 'sequelize';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';

// Create database
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './mydb.sqlite',
    logging: null,
});

// Create session middleware
// TODO: see about the session expiry timer from connect-session-sequelize
// TODO: see about making proxy setting of session configurable
const SequelizeStore = connectSessionSequelize(session.Store);

const store = new SequelizeStore({
    db: sequelize,
});

// store.clearExpiredSessions = function () {
//     console.log('waka');
// };

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: false,
});

store.sync();
