import Main from "@/components/Main";
import { getAllRandomImages } from "@/lib/sanity.client";
import Image from "@/components/Image";
import { classNames } from "@/utils";
import ImageList from "@/components/ImageList";

export default async function Home() {
  const images = await getAllRandomImages();
  // console.log(images);
  return (
    <Main images={images}>
      <ImageList
        images={images}
        className="p-4 md:grid md:grid-cols-2 xl:grid-cols-3 space-y-6 md:space-y-0 md:gap-6"
      >
        {({ image, idx, previewElProps, imageElProps }) => {
          return (
            <figure className="border border-slate-800 rounded-lg bg-slate-800">
              <div
                className={classNames(
                  "relative rounded-lg",
                  "h-[300px] sm:h-[400px] md:h-[300px] lg:h-[400px] xl:h-[300px]"
                )}
              >
                <div {...previewElProps} className="h-full rounded-t-lg" />
                <Image
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg cursor-zoom-in"
                  image={image.image}
                  alt={image.caption}
                  sizes={imageElProps.sizes}
                  loading={idx < 3 ? "eager" : "lazy"}
                />
              </div>
              <figcaption className="text-slate-200 rounded-b-lg px-4 py-2">
                {image.caption}
              </figcaption>
            </figure>
          );
        }}
      </ImageList>
    </Main>
  );
}
