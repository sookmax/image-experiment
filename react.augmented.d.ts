// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref#option-2---redeclare-forwardref
import React from "react";

// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
