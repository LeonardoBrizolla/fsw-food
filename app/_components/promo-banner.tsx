import Image, { ImageProps } from "next/image";

export function PromoBanner(props: ImageProps) {
  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      quality={100}
      sizes="100vw"
      {...props}
    />
  );
}
