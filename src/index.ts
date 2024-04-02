import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import dotenv from 'dotenv'; 

import { router as userRoutes } from './routes/user.route'
import { router as categoryRoutes } from './routes/category.route'
import { router as productRoutes } from './routes/product.route'
import { router as filterstRoutes } from './routes/filters.route'

const app = express();
dotenv.config();

app.use(cors({
    credentials: true,
    origin: true,
    preflightContinue: false,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '200mb' }));

let url_base = process.env.URL_API
app.use(url_base + 'user/', userRoutes)
app.use(url_base + 'category/', categoryRoutes)
app.use(url_base + 'product/', productRoutes)
app.use(url_base + 'filters/', filterstRoutes)

const server = http.createServer(app);

let port = process.env.PORT

if (!port) {
    process.exit(1)
}

const PORT: number = parseInt(port as string, 10)

server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/')
})