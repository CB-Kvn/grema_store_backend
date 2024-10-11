import { Request, Response } from 'express';
import logger from '../../../src/utils/logger/logger';
import OrdersService from '../../../src/services/news_endpoint.ts/orders.endpoint';

class OrdersController {
    private ordersService: OrdersService;
  
    constructor(ordersService: OrdersService) {
      this.ordersService = ordersService;
    }
  
    public async postOrders(req: Request, res: Response): Promise<void> {
  
  
      try {
        const { body } = req

        const response = await this.ordersService.postOrders(body)

        if (!response) {
          res.status(404).json({ error: 'Order not post in' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to post orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    public async getOrdersUsers(req: Request, res: Response): Promise<void> {


      try {
        const {email} = req.body.data
  
        const response = await this.ordersService.getOrdersUsers(email as string)
  
        if (!response) {
          res.status(404).json({ error: 'Orders not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    public async getOrdersUsersWeek(req: Request, res: Response): Promise<void> {


      try {
        const {email} = req.body.data
  
        const response = await this.ordersService.getOrdersUsersWeek(email as string)
  
        if (!response) {
          res.status(404).json({ error: 'Orders not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }


    public async getOrdersUsersMonth(req: Request, res: Response): Promise<void> {


      try {
        const {email} = req.body.data
  
        const response = await this.ordersService.getOrdersUsersMonth(email as string)
  
        if (!response) {
          res.status(404).json({ error: 'Orders not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }


    public async getOrdersUsersYear(req: Request, res: Response): Promise<void> {


      try {
        const {email} = req.body.data
  
        const response = await this.ordersService.getOrdersUsersYear(email as string)
  
        if (!response) {
          res.status(404).json({ error: 'Orders not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }


    public async getAmountMonthYear(req: Request, res: Response): Promise<void> {


      try {
  
        const response = await this.ordersService.getAmountMonthYear()
  
        if (!response) {
          res.status(404).json({ error: 'Orders not found' });
          return;
        }
  
        res.status(200).json(response);
      } catch (error:any) {
        logger.error(`Failed to retrieve orders: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
  export default OrdersController;