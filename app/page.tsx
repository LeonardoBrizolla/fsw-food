import Image from "next/image";
import { CategoryList } from "./_components/category-list";
import { Header } from "./_components/header";
import { Search } from "./_components/search-input";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% em desconto em pizza!"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          quality={100}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
