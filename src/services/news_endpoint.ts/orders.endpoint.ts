import { PrismaClient } from "@prisma/client";
import logger from "../../../src/utils/logger/logger";
import { v4 as uuidv4 } from 'uuid';
import { ResponseEnpoints } from "./sign.endpoint";

class OrdersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async postOrders(body: any): Promise<ResponseEnpoints> {
    try {
      const orderNumber = uuidv4();

      // Creación de la factura
      const invoice = await this.prisma.invoice.create({
        data: {
          orderId: orderNumber,
          subtotal: body.data.orders.productsInfo.subTotal,
          userId: body.data.orders.sendInfo.id,
          name: body.data.orders.sendInfo.name,
          phone: body.data.orders.sendInfo.phone,
          email: body.data.orders.sendInfo.email,
          address: body.data.orders.sendInfo.address,
          typeUser: "",  // Cambiado para usar el valor correcto
          tax: 0.13,
          total: body.data.orders.productsInfo.total,
          taxAmount: body.data.orders.productsInfo.tax,
          discount: body.data.orders.productsInfo.discount,
          typeShipping: body.data.orders.productsInfo.typeCarrier,
          shipping: body.data.orders.productsInfo.priceCarrier,
          status: "receive",
        },
      });

      // Manejar los detalles de la orden
      await Promise.all(
        body.data.orders.productsInfo.car.map((detail: any) => {
          return this.prisma.invoiceDetail.create({
            data: {
              orderNumber: orderNumber,
              inventoryId: detail.id,
              quantity: detail.orderQty,
              price: Number(detail.price) * detail.orderQty,
              discount: Number(detail.price) * detail.desc / 100,
              amountDiscount: Number(detail.price * detail.quantity) - Number(detail.price * detail.quantity) * detail.desc,
              porcentageDiscount: detail.desc,
              status: "receive",
            },
          });
        })
      );

      return { message: "Order created successfully", data: orderNumber };
    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
  public async getOrdersUsers(email: string): Promise<ResponseEnpoints> {
    try {
      // Creación de la factura
      const invoice = await this.prisma.invoice.findMany({
        where: {
          email: email
        },
        include: {
          user: true,
          details: {
            include: {
              inventory: {
                include: {
                  product: true
                }
              }
            }
          }
        },

        orderBy: {
          orderId: "desc"
        }
      });


      return { message: "Order created successfully", data: invoice };
    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
  public async getOrdersUsersWeek(email: string): Promise<ResponseEnpoints> {
    try {
      const orderNumber = uuidv4();

      // Creación de la factura
      const invoiceLastWeek = await this.prisma.invoice.findMany({
        where: {
          email: email,
          createAtInvoice: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Últimos 7 días
          },
        },
        include: {
          user: true,
          details: {
            include: {
              inventory: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        orderBy: {
          orderId: 'desc',
        },
      });


      return { message: "Order created successfully", data: invoiceLastWeek };
    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
  public async getOrdersUsersMonth(email: string): Promise<ResponseEnpoints> {
    try {
      const orderNumber = uuidv4();

      // Creación de la factura
      const invoiceLastMonth = await this.prisma.invoice.findMany({
        where: {
          email: email,
          createAtInvoice: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Últimos 30 días
          },
        },
        include: {
          user: true,
          details: {
            include: {
              inventory: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        orderBy: {
          orderId: 'desc',
        },
      });


      return { message: "Order created successfully", data: invoiceLastMonth };
    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
  public async getOrdersUsersYear(email: string): Promise<ResponseEnpoints> {
    try {
      const orderNumber = uuidv4();

      // Creación de la factura
      const invoiceLastYear = await this.prisma.invoice.findMany({
        where: {
          email: email,
          createAtInvoice: {
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Últimos 365 días
          },
        },
        include: {
          user: true,
          details: {
            include: {
              inventory: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
        orderBy: {
          orderId: 'desc',
        },
      });


      return { message: "Order created successfully", data: invoiceLastYear };
    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
  public async getAmountMonthYear(): Promise<ResponseEnpoints> {
    try {

      const totalLastYear = await this.prisma.invoice.aggregate({
        _sum: {
          total: true,
        },
        where: {
          createAtInvoice: {
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          },
        },
      });

      // Sumatoria del total del último mes
      const totalLastMonth = await this.prisma.invoice.aggregate({
        _sum: {
          total: true,
        },
        where: {
          createAtInvoice: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      });


      return {
        message: "Order created successfully", data: {
          totalLastYear: totalLastYear._sum.total || 0, // Manejar el caso de que no haya resultados
          totalLastMonth: totalLastMonth._sum.total || 0,
        }
      };


    } catch (error: any) {
      logger.error(`Error posting data: ${error.message}`);
      throw new Error("Error posting order data");
    }
  }
}

export default OrdersService;