import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import config from 'config';
import { router as userRoutes } from './routes/user.route'

const app = express();

app.use(cors({
    credentials: true,
    origin: true,
    preflightContinue: false,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '200mb' }));

let url_base = config.get('url_api')
app.use(url_base + 'user/', userRoutes)

const server = http.createServer(app);

let port = config.get('port')

if (!port) {
    process.exit(1)
}

const PORT: number = parseInt(port as string, 10)

server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/')
})