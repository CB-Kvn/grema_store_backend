import { Inventory, PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import bcrypt from "bcrypt"
import { ResponseEnpoints } from "./sign.endpoint";
import { generateTokens } from "../../utils/tokens/generate_token";


class LoginService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async getLogin(email: string, password: string): Promise<ResponseEnpoints> {
        try {

            const result = await this.prisma.profile.findFirst({
                where: {
                    AND: [
                        {
                            email: email,
                        },
                        {
                            user: {
                                status: true
                            }
                        }

                    ]
                },

                select: {
                    userId: true,
                    password: true,
                    address: true,
                    createAtProfile: true,
                    email: true,
                    id: true,
                    image: true,
                    updateAtProfile: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            cellphone: true,

                        }
                    }

                },

            })

            if (!result) {
                return {
                    message:"User not found",
                    data:{token: null}
                };
            }

            const verifiedPassword = await bcrypt.compare(password, result.password)

            if (!verifiedPassword) {
                return {
                    message:"Invalid credentials",
                    data:{token: null}
                };
            }

            const {token_jwt,refreshToken} = generateTokens({ userId: result.userId, email: result.email })

            return {
                message: "Login succesfull",
                data:{token_jwt,refreshToken}
            };
        } catch (error: any) {
            logger.error(`Error fetching data: ${error.message}`);
            throw new Error('Error fetching login data');
        }
    }
}

export default LoginService;