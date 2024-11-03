// src/services/socketService.ts
import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { verifyTokenIO } from '../../../src/middlewares/tokens/verify_token';
import logger from '../../../src/utils/logger/logger';

export class SocketService {
    private io: Server;
    private prisma: PrismaClient;

    constructor(io: Server, prisma: PrismaClient) {
        this.io = io;
        this.prisma = prisma;
        this.setupListeners();
    }

    private setupListeners(): void {
        this.io.on('connection', (socket: Socket) => {


            const token = socket.handshake.auth.token;

            if (token && verifyTokenIO(token)) {
                logger.info(`Usuario conectado: ${socket.id}`);

            } else {
                new Error('Autenticación fallida');
            }

            socket.on('requestInventory', async () => {
                try {
                    const inventory = await this.prisma.product.findMany();
                    socket.emit('initInventory', inventory);
                    logger.info('initInventory')
                } catch (error) {
                    socket.emit('error', { message: 'Error al obtener el inventario' });
                    logger.info('Error al obtener el inventario')
                }
            });

            socket.on('updateInventory', async (data) => {
                const { productId, quantity } = data;
                try {
                    const product = await this.prisma.inventory.update({
                        where: { id: productId },
                        data: { quantity:{decrement:quantity} },
                    });
                    this.io.emit('inventoryUpdated', product);
                    logger.info('inventoryUpdated')
                } catch (error) {
                    socket.emit('error', { message: 'Error al actualizar el inventario' });
                    logger.info('Error al actualizar el inventario')
                }
            });

            socket.on('disconnect', () => {
                logger.info(`Usuario desconectado: ${socket.id}`);
            });
        });
    }
}