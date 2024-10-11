import { Request, Response } from 'express';
import SignService from "../../../src/services/news_endpoint.ts/sign.endpoint";
import logger from '../../../src/utils/logger/logger';

class SignController {
    private signService: SignService;

    constructor(signService: SignService) {
        this.signService = signService;
    }

    public async createNewUser(req: Request, res: Response): Promise<void> {
        try {
            const { address, password, personal, imgs } = req.body;

            // Validación básica
            if (!address || !password || !personal) {
                res.status(400).json({ error: 'Faltan datos requeridos' });
                return;
            }

            const userData = {
                address:JSON.parse(address),
                password:password,
                personal:JSON.parse(personal),
                imgs: imgs, // Asegúrate de que imgs sea un array si no se proporcionan imágenes
            };

            const response = await this.signService.postCreateUser(userData)

            if (!response) {
                res.status(404).json({ error: 'No se pudo crear el usuario' });
                return;
            }

            res.status(201).json(response); // Cambia el estado a 201 para creación exitosa
        } catch (error: any) {
            logger.error(`Error al crear el usuario: ${error.message}`);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

export default SignController;