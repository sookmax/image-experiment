import { PortableTextMarkComponentProps } from "@portabletext/react";

export default function Code({ children }: PortableTextMarkComponentProps) {
  return <code className="bg-gray-700 p-1 rounded-md">{children}</code>;
}
