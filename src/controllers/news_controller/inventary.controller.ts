import { Request, Response } from 'express';
import logger from '../../../src/utils/logger/logger';
import InventaryService from '../../../src/services/news_endpoint.ts/inventary.endpoint';


class InventaryController {
  private inventaryService: InventaryService;

  constructor(inventaryService: InventaryService) {
    this.inventaryService = inventaryService;
  }

  public async getProductsShowLanding(req: Request, res: Response): Promise<void> {


    try {
      const response = await this.inventaryService.getProductsShowLanding();

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error:any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async getProductsToStore(req: Request, res: Response): Promise<void> {


    try {
      const {filters,offset,limit,status} = req.query

      const stats = status!.toString() === "all" ? null : status!.toString()

      const response = await this.inventaryService.getProductsToStore(filters,Number(offset),Number(limit), stats!.toString())

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error:any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async getProductsDetailsToStore(req: Request, res: Response): Promise<void> {


    try {
      const {id} = req.query

      const response = await this.inventaryService.getProductsDetailsToStore(id as string)

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error:any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default InventaryController;