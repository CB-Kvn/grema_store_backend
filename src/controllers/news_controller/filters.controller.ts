import { Request, Response } from 'express';
import logger from '../../../src/utils/logger/logger';
import FiltersService from "../../../src/services/news_endpoint.ts/filters.endpoint";

class FiltersController {
    private filtersService: FiltersService;
  
    constructor(filtersService: FiltersService) {
      this.filtersService = filtersService;
    }
  
    public async getFiltersStore(req: Request, res: Response): Promise<void> {
  
  
      try {
        const response = await this.filtersService.getFiltersStore();
  
        if (!response) {
          res.status(404).json({ error: 'Filters not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve filters: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
  export default FiltersController;