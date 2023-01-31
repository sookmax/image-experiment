type PropsOf<TagName> = TagName extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[TagName]
  : // this is for the case when the user didn't specify `as` prop.
    // because destructuring `{ as = "div" }` doesn't work.
    JSX.IntrinsicElements["div"];

type Props<TagName extends string> = { as?: TagName } & PropsOf<TagName>;

export type SlotProps<TagName extends string> = Props<TagName>;

export default function Slot<TagName extends string>({
  as,
  ...props
}: Props<TagName>) {
  const Component = as ? as : ("div" as string);

  return <Component {...props} />;
}
