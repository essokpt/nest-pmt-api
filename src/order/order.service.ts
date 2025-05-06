import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as _ from "lodash";


@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    console.log('create new order:', createOrderDto);
    let newOrderItems = []
    newOrderItems = createOrderDto.orderItems?.map((item) => {
      return {
        productItemId: item.productItemId,
        //productId : item.productId,
        unit: item.unit,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.total,
        discount: item.discount,
      }

    })
    await this.prisma.order.create({
      data: {
        code: createOrderDto.code,
        // customerId: createOrderDto.customerId,
        orderType: createOrderDto.orderType,
        paymentType: createOrderDto.paymentType,
        discount: createOrderDto.discount,
        vat: Number(createOrderDto.vat),
        total: createOrderDto.grandTotal,
        status: 'Completed',
        createdAt: createOrderDto.createdAt,
        createBy: createOrderDto.createBy,
        orderItems: {
          create: newOrderItems
        },
        customer: { connect: { id: createOrderDto.customerId } }
      },

    });

    //update product stock to reduce qty
    await this.UpdateProductStock(newOrderItems)
    await this.UpdateSummaryProduct(createOrderDto.orderItems)
    return {
      status: HttpStatus.OK,
      message: 'create order success.',
    }
  }

  async UpdateSummaryProduct(items: any[]) {
    if (items.length > 0) {
      //console.log(`product items:${items}`);

      const productGroup = _(items)
        .groupBy("productId")
        .map((items, productId) => ({
          productId: Number(productId),
          // quantity: _.sumBy(items, "quantity"),
        }))
        .value();

      try {
        for (let index = 0; index < productGroup.length; index++) {

          const sumQty = await this.prisma.productItem.aggregate({
            _sum: {
              quantity: true,
            },
            where: { productId: productGroup[index].productId }
          })

          console.log(`summary product id:${productGroup[index].productId} = ${sumQty._sum.quantity}`);

          await this.prisma.product.update({
            where: { id: productGroup[index].productId },
            data: {
              stockQuantity: sumQty._sum.quantity,
              status: sumQty._sum.quantity == 0 ? 'Out of stock' : 'Instock'
            }
          })

        }

      } catch (error) {
        console.log(error);

      }


    }

  }

  async UpdateProductStock(items: any[]) {
    if (items.length > 0) {

      try {
        for (let index = 0; index < items.length; index++) {
          const stockItem: any = await this.prisma.productItem.findFirst({
            where: { id: items[index].productItemId }
          })

          if (stockItem.id) {
            console.log('update qty:', stockItem.quantity, items[index].quantity);
            const qty = stockItem.stockOutValue + Number(items[index].quantity)
            await this.prisma.productItem.update({
              where: { id: stockItem.id },
              data: {
                status: 'update',
                stockOutValue: qty,
                quantity: stockItem.stockInValue - qty
              }
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('no data');
    }
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        orderItems: {
          include: {
            productItem: {
              include: { product: true }
            }
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id: id },
      include: {
        customer: true,
        orderItems: {
          include: {
            productItem: {
              include: { product: true, stockIn : true  },
             
              
            }
          }
        }
      }
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: {
        code: updateOrderDto.code,
        customerId: updateOrderDto.customerId,
        orderType: updateOrderDto.orderType,
        paymentType: updateOrderDto.paymentType,
        discount: updateOrderDto.discount,
        vat: updateOrderDto.vat,
        total: updateOrderDto.grandTotal,
        status: updateOrderDto.status,
        createdAt: updateOrderDto.createdAt,
        createBy: updateOrderDto.createBy,
      }
    });
  }

  remove(id: number) {
    console.log('delete order id:', id);

    return this.prisma.order.delete({
      where: { id: id }
    });
  }
}
