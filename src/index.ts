import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import dotenv from 'dotenv'; 
import path from 'path'

import { router as userRoutes } from './routes/user.routes'
import { router as categoryRoutes } from './routes/category.routes'
import { router as productRoutes } from './routes/product.routes'
import { router as filterstRoutes } from './routes/filters.routes'
import { router as favorities } from './routes/favorites.routes'
import { router as shopping } from './routes/shoppinCar.routes'
import { router as emails } from './routes/sendEmails.routes'

import multer from "multer";

const app = express();
dotenv.config();

app.use(cors({
    credentials: true,
    origin: true,
    preflightContinue: false,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '200mb' }));

const storage = multer.diskStorage({
      destination: path.join(__dirname, 'public/img/uploads'),
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      }
    });

app.use(multer({storage}).array('images'));

app.use(express.static(path.join(__dirname, 'public')));

let url_base = process.env.URL_API
console.log(url_base)
app.use(url_base + 'user/', userRoutes)
app.use(url_base + 'category/', categoryRoutes)
app.use(url_base + 'product/', productRoutes)
app.use(url_base + 'filters/', filterstRoutes)
app.use(url_base + 'favorities/', favorities)
app.use(url_base + 'shopping/', shopping)
app.use(url_base + 'email/', emails)

const server = http.createServer(app);

let port = process.env.PORT

if (!port) {
    process.exit(1)
}

const PORT: number = parseInt(port as string, 10)

server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/')
})