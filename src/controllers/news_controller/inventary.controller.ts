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
    } catch (error: any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async getProductsToStore(req: Request, res: Response): Promise<void> {


    try {
      const { filters, offset, limit, status } = req.query

      const stats = status!.toString() === "all" ? null : status!.toString()

      const response = await this.inventaryService.getProductsToStore(filters, Number(offset), Number(limit), stats!.toString())

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error: any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async getProductsDetailsToStore(req: Request, res: Response): Promise<void> {


    try {
      const { id } = req.query

      const response = await this.inventaryService.getProductsDetailsToStore(id as string)

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error: any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async postAddProducts(req: Request, res: Response): Promise<void> {


    try {
      logger.info(req)
      const { cantidad, categoria, descripcion, color, forma, imgs, material, size, nombre, precio } = req.body

      const response = await this.inventaryService.postAddProducts({ cantidad, categoria, color, size, descripcion, forma, imgs, material, nombre, precio })

      // if (!response) {
      //   res.status(404).json({ error: 'Products not found' });
      //   return;
      // }

      // res.status(200).json(response);
    } catch (error: any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async searchProducts(req: Request, res: Response) {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    try {
      const products = await this.inventaryService.searchProducts(search as string);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  // Controlador para productos más vendidos
  public async getTopSellingProducts(req: Request, res: Response) {
    try {

      console.log("AQUI-1")
      const products = await this.inventaryService.getTopSellingProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top-selling products' });
    }
  }

  // Controlador para productos con descuento
  public async getDiscountedProducts(req: Request, res: Response): Promise<void> {

    try {
      const response = await this.inventaryService.getDiscountedProducts();

      if (!response) {
        res.status(404).json({ error: 'Products not found' });
        return;
      }

      res.status(200).json(response);
    } catch (error: any) {
      logger.error(`Failed to retrieve user: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Controlador para productos relacionados
  public async getRelatedProducts(req: Request, res: Response) {
    const { productId } = req.params;
    try {
      logger.info(productId)
      const products = await this.inventaryService.getRelatedProducts(productId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch related products' });
    }
  }

  // Controlador para productos nuevos
  public async getNewProducts(req: Request, res: Response) {
    try {
      const products = await this.inventaryService.getNewProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch new products' });
    }
  }
}

export default InventaryController;