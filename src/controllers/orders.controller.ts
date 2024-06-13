import { PrismaClient } from "@prisma/client";
import { Invoice, InvoiceDetail } from "../interfaces/grema.interfaces";

const prisma = new PrismaClient({});

export class OrdersControllers {
  async Orders(body: Invoice) {
    try {

      const invoice = await prisma.invoice.create({
        data: {
          orderId: body.orderNumber,
          amount: body.amount,
          userId: body.userId,
          name: body.name,
          idGues: body.idGues,
          phone: body.phone,
          email: body.email,
          address: body.address,
          typeUser: body.typeUser,
          tax: body.tax,
          typeShipping: body.typeShipping,
          shipping: body.shipping,
          status: "recibida"
        }

      });


       body.details.map(async (detail) => {
        const details = await prisma.invoiceDetail.create({
          data: {
            orderNumber: body.orderNumber,
            inventoryId: detail.inventoryId,
            quantity: detail.quantity,
            price: detail.price,
            status: "solicitado"
          }
        })
      })

      return {
        success: "Ok",
        status: 200,
        msg: "Create order sucessfully",
        data: {invoice},
      };
    } catch (error: any) {
      return {
        status: 400,
        msg: "Error create order",
        error: { error: error },
      };
    }
  }
  async ConfirmationOrders(body: any) {
    try {

      const order = prisma.invoice.update({
        where: {
          orderId: body.orderId
        },
        data: {
          confirmation: body.nameConfirmation
        }
      })

      return {
        success: "Ok",
        status: 201,
        msg: "Order updated",
        data: { order },
      };
    } catch (error: any) {

      return {
        status: 400,
        msg: "Error update order",
        error: { ...error },
      };

    }
  }
}

