import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        loading="lazy"
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
}
