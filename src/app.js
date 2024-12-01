import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chalk from 'chalk';
import ora from 'ora';

import dataRouter from './routes/dataRouter.js';
import citiesRouter from './routes/citiesRouter.js';
import institutesRouter from './routes/institutesRouter.js';
import roomsRouter from './routes/roomsRouter.js';
import parametersRouter from './routes/parametersRouter.js';
import aqiRouter from './routes/airQualityRouter.js';
import historyRouter from './routes/historyRouter.js';

import database from './config/database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// request counters
let requestCounts = { GET: 0, POST: 0 };
let startTime = Date.now();

app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'POST') {
        requestCounts[req.method]++;
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api', dataRouter);
app.use('/api', citiesRouter);
app.use('/api', institutesRouter);
app.use('/api', roomsRouter);
app.use('/api', parametersRouter);
app.use('/api', aqiRouter);
app.use('/api', historyRouter);

// uptime
const formatUptime = (startTime) => {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// logs update
const updateLogs = () => {
    console.clear();
    console.log(chalk.blueBright.bold('AIR QUALITY DATA API\n'));
    console.log(chalk.bold('Status: ') + chalk.green('Running'));
    console.log(chalk.bold('Server: ') + `Listening on port ${port}`);
    console.log(
        chalk.bold('Database: ') +
        `Connected to ${process.env.DB_HOST}:${process.env.DB_PORT} as ${process.env.DB_USER}`
    );
    console.log(chalk.bold('Uptime: ') + formatUptime(startTime));
    console.log(chalk.bold('Requests per Minute:'));
    console.log(`  GET: ${((requestCounts.GET / ((Date.now() - startTime) / 60000)) || 0).toFixed(2)}`);
    console.log(`  POST: ${((requestCounts.POST / ((Date.now() - startTime) / 60000)) || 0).toFixed(2)}`);
};

const spinner = ora('Initializing server...').start();

const init = async () => {
    try {
        await database.sync();
        app.listen(port, () => {
            spinner.succeed('Server started successfully.');
            setInterval(updateLogs, 5000);
        });
    } catch (error) {
        spinner.fail('Failed to initialize server.');
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

process.on('uncaughtException', (error) => {
    console.error(chalk.red.bold('Uncaught Exception: '), error);
});

process.on('unhandledRejection', (reason) => {
    console.error(chalk.red.bold('Unhandled Rejection: '), reason);
});

init();
