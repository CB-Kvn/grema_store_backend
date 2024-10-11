import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'

// import { router as userRoutes } from './src/routes/user.routes'
// import { router as categoryRoutes } from './src/routes/category.routes'
// import { router as productRoutes } from './src/routes/product.routes'
import { router as filterstRoutes } from './src/routes/new_routes/filters.routes'
// import { router as favorities } from './src/routes/favorites.routes'
// import { router as shopping } from './src/routes/shoppinCar.routes'
// import { router as emails } from './src/routes/sendEmails.routes'
import { router as orders } from './src/routes/new_routes/orders.routes'
import { router as inventory } from './src/routes/new_routes/inventary.routes'
import { router as login } from './src/routes/new_routes/login.routes'
import { router as carrier } from './src/routes/new_routes/carrier.routes'
import { router as signIn } from './src/routes/new_routes/sign.routes'
import { router as users } from './src/routes/new_routes/users.routes'
import { router as mantenaince } from './src/routes/new_routes/mantenaince.routes'



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


let url_base = process.env.URL_API
console.log(url_base)

// app.use(url_base + 'category/', categoryRoutes)
// app.use(url_base + 'product/', productRoutes)

// app.use(url_base + 'favorities/', favorities)
app.use(url_base + 'mantenaince/', mantenaince)
app.use(url_base + 'signIn/', signIn)
app.use(url_base + 'filters/', filterstRoutes)
app.use(url_base + 'orders/', orders)
app.use(url_base + 'inventory/', inventory)
app.use(url_base + 'verify/', login)
app.use(url_base + 'carrier/', carrier)
app.use(url_base + 'users/', users)

const server = http.createServer(app);

let port = process.env.PORT

if (!port) {
    process.exit(1)
}

const PORT: number = parseInt(port as string, 10)

server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000/')
})