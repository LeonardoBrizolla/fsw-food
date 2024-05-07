"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import { Header } from "../_components/header";
import { RestaurantItem } from "../_components/restaurant-item";

export default function Restaurants() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  async function fetchRestaurants(search: string) {
    const foundRestaurants = await searchForRestaurants(search);
    setRestaurants(foundRestaurants);
  }

  useEffect(() => {
    if (!searchFor) {
      return notFound();
    }

    fetchRestaurants(searchFor);
  }, [searchFor]);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
