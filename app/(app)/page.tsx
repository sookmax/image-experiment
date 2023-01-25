import { getAllRandomImages } from "@/lib/sanity.client";
import Image from "@/components/Image";
import { Inter } from "@next/font/google";
import { classNames } from "@/utils";
import ImageList from "@/components/ImageList";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const data = await getAllRandomImages();
  // console.log(data);
  return (
    <main className={inter.className}>
      <ImageList
        images={data}
        className="p-4 md:grid md:grid-cols-2 xl:grid-cols-3 space-y-6 md:space-y-0 md:gap-6"
      >
        {({ image, idx, previewElProps, imageElProps }) => {
          return (
            <li key={image.url}>
              <figure className="border border-slate-800 rounded-lg bg-slate-800">
                <div
                  className={classNames(
                    "relative rounded-lg",
                    "h-[300px] sm:h-[400px] md:h-[300px] lg:h-[400px] xl:h-[300px]"
                  )}
                >
                  <div {...previewElProps} className="h-full rounded-t-lg" />
                  <Image
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    url={image.url}
                    alt={image.caption}
                    sizes={imageElProps.sizes}
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                </div>
                <figcaption className="text-slate-200 rounded-b-lg px-4 py-2">
                  {image.caption}
                </figcaption>
              </figure>
            </li>
          );
        }}
      </ImageList>
    </main>
  );
}
