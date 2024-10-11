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
}

export default UsersController;