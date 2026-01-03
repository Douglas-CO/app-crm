export interface Column<T> {
  accessorKey: string;
  header: string;
  size?: number;
  minSize?: number;
  maxSize?: number;
  enableSorting?: boolean;
  enableColumnFilter?: boolean;
  enableResizing?: boolean;
  Cell?: ({
    cell,
    row,
  }: {
    cell: { getValue: () => any };
    row: { original: T };
  }) => React.ReactNode;
  sortingFn?: (a: T, b: T) => number;
  filterFn?: (row: T, columnId: string, filterValue: string) => boolean;
}