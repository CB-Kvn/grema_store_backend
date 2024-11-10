import { Request, Response } from 'express';
import logger from '../../utils/logger/logger';
import OrdersService from '../../services/news_endpoint.ts/orders.endpoint';
import { body } from 'express-validator';

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

    public async postOrdersTrack(req: Request, res: Response): Promise<void> {
  
  
      try {
        

        const response = await this.ordersService.postOrdersTrack({idOrder:req.body.data.idOrder,track:req.body.data.track})

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