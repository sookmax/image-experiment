import React from "react";

type PropsOf<TagName> = TagName extends keyof JSX.IntrinsicElements
  ? React.ComponentPropsWithoutRef<TagName>
  : // this is for the case when the user didn't specify `as` prop.
    // because destructuring `{ as = "div" }` doesn't work.
    React.ComponentPropsWithoutRef<"div">;

type Props<TagName extends string> = { as?: TagName } & PropsOf<TagName>;

export type SlotProps<TagName extends string> = Props<TagName> &
  React.RefAttributes<HTMLElement>;

function Slot<TagName extends string, E extends HTMLElement>(
  { as, ...props }: Props<TagName>,
  ref: React.ForwardedRef<E>
) {
  const Component = as ? as : ("div" as string);

  return <Component ref={ref} {...props} />;
}

export default React.forwardRef(Slot);
