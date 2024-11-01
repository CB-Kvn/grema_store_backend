import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors';


import { router as filterstRoutes } from './src/routes/new_routes/filters.routes'
import { router as orders } from './src/routes/new_routes/orders.routes'
import { router as inventory } from './src/routes/new_routes/inventary.routes'
import { router as login } from './src/routes/new_routes/login.routes'
import { router as carrier } from './src/routes/new_routes/carrier.routes'
import { router as signIn } from './src/routes/new_routes/sign.routes'
import { router as users } from './src/routes/new_routes/users.routes'
import { router as mantenaince } from './src/routes/new_routes/mantenaince.routes'
import { router as tilopay } from './src/routes/new_routes/tilopay.routes'
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { SocketService } from "./src/services/socket-io/socketService";


const app = express();

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
app.use(url_base + 'tilopay/', tilopay)



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // Cambiar según el dominio permitido
        methods: ['GET', 'POST']
    }
});


if (!process.env.PORT || !process.env.PORTIO) {
    process.exit(1)
}
const prisma = new PrismaClient();

const socketService = new SocketService(io, prisma);

server.listen(Number(process.env.PORT), () => {
    console.log('Server running on http://localhost:5000/')
})