import { TypedObject } from "@portabletext/types";
import { PortableTextMarkComponentProps } from "@portabletext/react";

interface Value extends TypedObject {
  href: string;
}

export default function Anchor({
  value,
  children,
}: PortableTextMarkComponentProps<Value>) {
  const target = value?.href?.startsWith("http") ? "_blank" : undefined;
  const rel = target === "_blank" ? "noreferrer" : undefined;
  return (
    <a
      target={target}
      rel={rel}
      href={value?.href}
      className="text-pink-200 underline"
    >
      {children}
    </a>
  );
}
