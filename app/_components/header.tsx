"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function Header() {
  const { data, status } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="" width={100} height={30} loading="lazy" />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" ? (
            <div className="flex justify-between pt-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá! Faça seu login!</h2>
              <Button size="icon" onClick={handleSignInClick}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {status === "authenticated" && (
              <>
                <Button
                  variant="ghost"
                  className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders" prefetch={false}>
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {status === "authenticated" && (
            <Button
              variant="ghost"
              className="w-full  justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
