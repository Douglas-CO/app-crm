import { Column } from "@/components/column";
import { useMemo, useState } from "react";

const useTableLogic = <T extends Record<string, any>>(
    data: T[],
    columns: Column<T>[],
    options: {
        enableGlobalFilter: boolean;
        globalFilterValue?: string;
        enableManualFiltering: boolean;
        columnFilters: any[];
        sortingState?: Array<{ id: string; desc: boolean }>;
    }
) => {
    const [localGlobalFilter, setLocalGlobalFilter] = useState("");
    const [localColumnFilters, setLocalColumnFilters] = useState<
        Record<string, string>
    >({});
    const [localSorting, setLocalSorting] = useState<
        Array<{ id: string; desc: boolean }>
    >([]);

    const globalFilter = options.globalFilterValue ?? localGlobalFilter;
    const sorting = options.sortingState ?? localSorting;

    const processedData = useMemo(() => {
        let filtered = [...data];

        // Global filter
        if (
            options.enableGlobalFilter &&
            globalFilter &&
            !options.enableManualFiltering
        ) {
            filtered = filtered.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(globalFilter.toLowerCase())
                )
            );
        }

        // Column filters
        if (!options.enableManualFiltering) {
            Object.entries(localColumnFilters).forEach(([key, value]) => {
                if (value) {
                    const column = columns.find((col) => col.accessorKey === key);
                    if (column?.filterFn) {
                        filtered = filtered.filter((item) =>
                            column.filterFn!(item, key, value)
                        );
                    } else {
                        filtered = filtered.filter((item) =>
                            String(item[key]).toLowerCase().includes(value.toLowerCase())
                        );
                    }
                }
            });
        }

        // Sorting
        if (sorting.length > 0 && !options.enableManualFiltering) {
            filtered.sort((a, b) => {
                for (const sort of sorting) {
                    const column = columns.find((col) => col.accessorKey === sort.id);
                    let result = 0;

                    if (column?.sortingFn) {
                        result = column.sortingFn(a, b);
                    } else {
                        const aValue = a[sort.id];
                        const bValue = b[sort.id];

                        if (aValue < bValue) result = -1;
                        else if (aValue > bValue) result = 1;
                    }

                    if (result !== 0) {
                        return sort.desc ? -result : result;
                    }
                }
                return 0;
            });
        }

        return filtered;
    }, [
        data,
        globalFilter,
        localColumnFilters,
        sorting,
        options.enableGlobalFilter,
        options.enableManualFiltering,
        columns,
    ]);

    return {
        processedData,
        localGlobalFilter,
        setLocalGlobalFilter,
        localColumnFilters,
        setLocalColumnFilters,
        localSorting,
        setLocalSorting,
    };
};

export default useTableLogic