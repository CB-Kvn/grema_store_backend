import { Request, Response } from 'express';
import logger from '../../../src/utils/logger/logger';
import FiltersService from "../../../src/services/news_endpoint.ts/filters.endpoint";
import CarrierService from '../../../src/services/news_endpoint.ts/carrier.endpoint';
import TiloPayService from '../../../src/services/news_endpoint.ts/tilopay.endpoint';

class TiloPayController {
    private tiloPayService: TiloPayService;
  
    constructor(tiloPayService: TiloPayService) {
      this.tiloPayService = tiloPayService;
    }
  
    public async getPriceCarrier(req: Request, res: Response): Promise<void> {
  
  
      try {
        const response = await this.tiloPayService.tiloPayLogin()

        if (!response) {
          res.status(404).json({ error: 'Carrier price not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve carrier price: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
  export default TiloPayController;