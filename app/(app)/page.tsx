import Main from "@/components/Main";
import { getArticle } from "@/lib/sanity.client";
import PortableText from "@/components/portable-text";
import GithubIcon from "@/components/icons/GithubIcon";

export default async function Home() {
  const article = await getArticle();
  const images = article.content.filter(
    (block) => block._type === "randomImage"
  );
  return (
    <Main images={images} className="max-w-4xl p-4 relative">
      <div className="flex justify-end">
        <a
          className="w-8 h-8"
          href="https://github.com/sookmax/image-experiment"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
      <h1 className="font-bold text-4xl my-6">{article.title}</h1>
      <PortableText value={article.content} />
    </Main>
  );
}
