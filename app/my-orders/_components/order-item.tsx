"use client";

import { formatCurrency } from "@/app/_components/_helpers/price";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const getOrderStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "CANCELLED":
        return "Cancelado";
      case "PREPARING":
        return "Preparando";
      case "CONFIRMED":
        return "Confirmado";
      case "DELIVERING":
        return "Em transporte";
      case "COMPLETED":
        return "Finalizado";
    }
  };

  const isOrderStatusNotCompleted = order?.status !== "COMPLETED";
  const isOrderStatusCancelled = order?.status === "CANCELLED";

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full 
          ${
            isOrderStatusNotCompleted
              ? "bg-green-400 text-white"
              : "bg-[#EEEEEE]"
          } 
          ${isOrderStatusCancelled && "bg-red-700 text-white"} px-2 py-1 
          text-muted-foreground`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`} prefetch={false}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-5">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.orderProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-primary"
            disabled={isOrderStatusNotCompleted}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
