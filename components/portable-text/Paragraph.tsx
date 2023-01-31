import { PortableTextBlockComponent } from "@portabletext/react";

const Paragraph: PortableTextBlockComponent = ({ children }) => {
  if (
    Array.isArray(children) &&
    children.length === 1 &&
    children.join("") === ""
  ) {
    return <p className="pt-2">{children}</p>;
  } else {
    return <p>{children}</p>;
  }
};

export default Paragraph;
