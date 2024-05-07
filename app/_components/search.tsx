"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button size={"icon"} type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
