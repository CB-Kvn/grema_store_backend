import { Request, Response } from 'express';
import UsersService from '../../../src/services/news_endpoint.ts/users.endpoint';
import logger from '../../../src/utils/logger/logger';


class UsersController {
    private usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    public async getUserInformation(req: Request, res: Response): Promise<void> {


        try {

            const { email } = req.body.data

            const response = await this.usersService.getUserInformation(email);

            if (!response) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(200).json(response);
        } catch (error: any) {
            logger.error(`Failed to retrieve users: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Verificar la contraseña actual
    public async verifyCurrentPassword(req: Request, res: Response): Promise<void> {
        try {
            const { currentPassword, id } = req.body.data;

            const response = await this.usersService.getVerityPassword(currentPassword, id);


            if (!response) {
                res.status(404).json({ error: 'No se encontró el usuario' });
                return;
            }

            res.status(200).json({ isValid: true, message: 'La contraseña actual es válida' });
        } catch (error: any) {
            logger.error(`Error al verificar la contraseña: ${error.message}`);
            res.status(500).json({ error: 'Error interno del servidor. Por favor, inténtelo de nuevo más tarde.' });
        }
    }

}

export default UsersController;