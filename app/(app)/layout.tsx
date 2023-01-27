import "./globals.css";
import { Roboto_Flex } from "@next/font/google";
import { classNames } from "@/utils";

// const inter = Inter({ subsets: ["latin"] });
const robotoFlex = Roboto_Flex({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={classNames(
          robotoFlex.className,
          "bg-black text-white",
          "flex flex-col items-center"
        )}
      >
        {children}
      </body>
    </html>
  );
}
