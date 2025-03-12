import { PrismaClient } from "@prisma/client";
import axios from "axios";
import logger from "../../../src/utils/logger/logger";

class TiloPayService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async tiloPayLogin(data:any): Promise<Object | null> {
        try {
            const responseLogin = await axios.post(process.env.TILO_API_URL_LOGIN!.toString(), {
                apiuser: process.env.TILO_API_USER,
                password: process.env.TILO_API_PASS,
            });

            const responseProcess = await axios.post(
                process.env.TILO_API_URL_PROCESS!.toString(),
                {
                    redirect: process.env.URL_FRONT+"response-pay",
                    key: process.env.TILO_API_KEY,
                    amount: data.monto,
                    currency: "CRC",
                    orderNumber: data.orderId,
                    capture: "1",
                    billToFirstName: data.name,
                    billToLastName: "",
                    billToAddress: data.addressCompleteFac !== "" ? data.addressCompleteFac :data.addressComplete,
                    billToAddress2: "",
                    billToCity: data.cantonFac !== "" ? data.cantonFac : data.canton,
                    billToState: data.provinceFac !== "" ? data.provinceFac : data.province,
                    billToZipPostCode: data.postalFac !== "" ? data.postalFac : data.postal,
                    billToCountry: "CR",
                    billToTelephone: data.cellphone,
                    billToEmail: data.email,
                    shipToFirstName: data.name,
                    shipToLastName: "",
                    shipToAddress: data.addressComplete,
                    shipToAddress2: "",
                    shipToCity: data.canton,
                    shipToState: data.province,
                    shipToZipPostCode: data.postal,
                    shipToCountry: "CR",
                    shipToTelephone:  data.cellphone,
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