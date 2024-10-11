import { Request, Response } from 'express';
import logger from '../../../src/utils/logger/logger';
import FiltersService from "../../../src/services/news_endpoint.ts/filters.endpoint";
import LoginService from '../../../src/services/news_endpoint.ts/login.enpoints';
import { verifyTokenRefresh } from '../../../src/utils/tokens/verify_token_refresh';
import { generateTokens } from '../../../src/utils/tokens/generate_token';

interface Tokens {
    token_jwt:string,
    refreshToken:string
}

class LoginController {
    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    public async login(req: Request, res: Response): Promise<void> {


        try {
            const { email, password } = req.body.data.login;

            const response = await this.loginService.getLogin(email, password);

            if (response.message === "User not found") {
                res.status(404).json({ error: "User not found"});
                return;
            }
            if (response.message === "Invalid credentials") {
                res.status(401).json({ error: "Invalid credentials" });
                return;

            }

            const {token_jwt,refreshToken} = response.data as Tokens

            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict'});
            res.status(200).json({message: response.message ,data:token_jwt});

            

        } catch (error: any) {
            logger.error(`Failed to retrieve login: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async refresh(req: Request, res: Response): Promise<void> {


        try {
            const { refreshToken } = req.cookies;
            const { email} = req.body

            if (!refreshToken) {
                res.status(401).json({ message: 'No refresh token provided' });
                return
            }
        
            const result = verifyTokenRefresh(refreshToken, process.env.REFRESH_TOKEN_GREMA as string);
        
            if (!result.valid) {
                res.status(403).json({ message: result.message });
                return
            }

            const option = "refresh"

            const { token_jwt } = generateTokens({ email, option})
            res.json(token_jwt);
            

        } catch (error: any) {
            logger.error(`Failed to retrieve login: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async dashboard(req: Request, res: Response): Promise<void> {
        console.log("")
        res.json({ message: 'Bienvenido al dashboard'});
    }


}

export default LoginController;