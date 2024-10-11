import { Inventory, PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";

class CarrierService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async getCarrierPrices(): Promise<Object | null> {
        try {

            const results = await this.prisma.boxPrice.findUnique({
                where: { id:1 }  
            });

            return results;
        } catch (error: any) {
            logger.error(`Error fetching data: ${error.message}`);
            throw new Error('Error fetching carrier data');
        }
    }
}

export default CarrierService;