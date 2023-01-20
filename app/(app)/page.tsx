import { getAllRandomImages } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.image";
import { Inter } from "@next/font/google";
import { classNames } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const data = await getAllRandomImages();
  // console.log(data);
  return (
    <main className={inter.className}>
      <ul className="p-4 md:grid md:grid-cols-2 xl:grid-cols-3 space-y-6 md:space-y-0 md:gap-6">
        {data.map((image) => {
          return (
            <li key={image.url}>
              <figure className="border border-slate-800 rounded-lg bg-slate-800">
                <div
                  className={classNames(
                    "relative rounded-lg",
                    "h-[300px] sm:h-[400px] md:h-[300px] lg:h-[400px] xl:h-[300px]"
                  )}
                >
                  <div
                    className="h-full rounded-t-lg"
                    style={{
                      backgroundImage: `url(${image.preview})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      imageRendering: "pixelated",
                      // paddingBottom: `${(1 / image.aspectRatio) * 100}%`,
                    }}
                  />
                  <img
                    // `src` is here for browsers that don't support `srcset`
                    src={urlForImage(image.url).width(1024).url()}
                    srcSet={[
                      `${urlForImage(image.url).width(640).url()} 640w`,
                      `${urlForImage(image.url).width(768).url()} 768w`,
                      `${urlForImage(image.url).width(1024).url()} 1024w`,
                      `${urlForImage(image.url).width(1280).url()} 1280w`,
                      `${urlForImage(image.url).width(1536).url()} 1536w`,
                      `${urlForImage(image.url).width(1920).url()} 1920w`,
                      `${urlForImage(image.url).width(2560).url()} 2560w`,
                      `${urlForImage(image.url).width(3840).url()} 3840w`,
                    ].join(", ")}
                    sizes={[
                      "(max-width: 640px) 100vw",
                      "(max-width: 1024px) 50vw",
                      "33vw",
                    ].join(", ")}
                    alt={image.caption}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <figcaption className="text-slate-200 rounded-b-lg px-4 py-2">
                  {image.caption}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
