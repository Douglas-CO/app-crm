import { Column } from "@/components/column";

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isRefetching?: boolean;
  error?: string | null;

  // Search
  enableGlobalFilter?: boolean;
  onGlobalFilterChange?: (value: string) => void;
  globalFilterValue?: string;

  // Pagination
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaging?: (pagination: { pageIndex: number; pageSize: number }) => void;
  rowCount?: number;
  canPaginate?: boolean;
  pageSizeOptions?: number[];

  // Selection
  enableRowSelection?: boolean;
  selectedRows?: Set<string>;
  onRowSelectionChange?: (selectedRows: Set<string>) => void;
  getRowId?: (row: T, index: number) => string;

  // Actions
  actionsColumnSize?: number;
  actionsColumnPosition?: "start" | "end"; // NUEVA PROP
  canDelete?: boolean;
  canEdit?: boolean;
  onDelete?: (original: T) => void;
  onEdit?: (original: T) => void;
  enableActionsColumn?: boolean;
  onConditionDelete?: (original: T) => boolean;
  onConditionEdit?: (original: T) => boolean;

  // Sorting
  enableSorting?: boolean;
  sortingState?: Array<{ id: string; desc: boolean }>;
  onSortingChange?: (sorting: Array<{ id: string; desc: boolean }>) => void;

  // Custom buttons
  showOneCustomButton?: boolean;
  oneCustomButton?: (original: T) => React.ReactNode;
  onConditionCustomButton?: (original: T) => boolean;

  // Server side filters
  enableManualFiltering?: boolean;
  onColumnFiltersChange?: (filters: any[]) => void;
  columnFilters?: any[];

  // Custom actions
  renderTopToolbarCustomActions?: () => React.ReactNode;

  // Styling
  tableWidth?: string | number;
  maxHeight?: number;
  minHeight?: number;
  enableVerticalScroll?: boolean;

  // Performance
  enableVirtualization?: boolean;
  getItemLayout?: (
    data: any,
    index: number
  ) => { length: number; offset: number; index: number };

  // Export
  enableExport?: boolean;
  onExport?: (data: T[]) => void;

  // Refresh
  onRefresh?: () => void;
}

export default CustomTableProps