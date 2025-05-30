import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    align?: "left" | "center" | "right";
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
  }
}

export interface DataTableRowAction<TData, TType = "view" | "update" | "delete"> {
  row: Row<TData>;
  type: TType;
}
