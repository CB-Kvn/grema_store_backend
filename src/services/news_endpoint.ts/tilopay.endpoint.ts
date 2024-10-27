import { PrismaClient } from "@prisma/client";
import axios from "axios";
import logger from "../../../src/utils/logger/logger";

class TiloPayService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async tiloPayLogin(): Promise<Object | null> {
        try {
            const responseLogin = await axios.post(process.env.TILO_API_URL_LOGIN!.toString(), {
                apiuser: process.env.TILO_API_USER,
                password: process.env.TILO_API_PASS,
            });

            const responseProcess = await axios.post(
                process.env.TILO_API_URL_PROCESS!.toString(),
                {
                    redirect: "https://www.urlToRedirect.com",
                    key: process.env.TILO_API_KEY,
                    amount: "1.00",
                    currency: "USD",
                    orderNumber: "1212122",
                    capture: "1",
                    billToFirstName: "DEMO",
                    billToLastName: "DEMO",
                    billToAddress: "San Jose",
                    billToAddress2: "Catedral",
                    billToCity: "JS",
                    billToState: "SJ",
                    billToZipPostCode: "10061",
                    billToCountry: "CR",
                    billToTelephone: "88888888",
                    billToEmail: "useremail@gmail.com",
                    shipToFirstName: "DEMO",
                    shipToLastName: "DEMO",
                    shipToAddress: "San Jose",
                    shipToAddress2: "Catedral",
                    shipToCity: "JS",
                    shipToState: "SJ",
                    shipToZipPostCode: "10061",
                    shipToCountry: "CR",
                    shipToTelephone: "88888888",
                    subscription: "0",
                    platform: "api",
                    returnData: "dXNlcl9pZD0xMg==",
                    hashVersion: "V2",
                },
                {
                    headers: {
                        Authorization: `Bearer ${responseLogin.data.access_token}`, // Set the Authorization header
                    },
                }
            );


            return responseProcess.data;  // Return only the data from the response
        } catch (error: any) {
            logger.error(`Error fetching data: ${error}`);
            throw new Error('Error fetching carrier data'+error);
        }
    }
}

export default TiloPayService;