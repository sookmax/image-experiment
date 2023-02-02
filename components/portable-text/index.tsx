import {
  PortableText as _PortableText,
  PortableTextProps,
  PortableTextComponents,
} from "@portabletext/react";
import Anchor from "./Anchor";
import Code from "./Code";
import Image from "./Image";
import Paragraph from "./Paragraph";

type Props = {
  value: PortableTextProps["value"];
};

const components: PortableTextComponents = {
  types: {
    imageRef: Image,
  },
  marks: {
    code: Code,
    link: Anchor,
  },
  block: {
    normal: Paragraph,
  },
};

export default function PortableText({ value }: Props) {
  return (
    <div className="space-y-2">
      <_PortableText value={value} components={components} />
    </div>
  );
}
