import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Column } from "@/components/column";
import CustomTableStyle from "./custom-table.styles";

export interface RenderTableHeaderProps<T extends Record<string, any>> {
  enableRowSelection: boolean;
  handleSelectAll: () => void;
  processedData: T[];
  selectedRows: Set<string>;
  getRowId: (row: T, index: number) => string;
  enableActionsColumn: boolean;
  actionsColumnPosition: "start" | "end";
  actionsColumnSize: number;
  columns: Column<T>[];
  sortingState?: Array<{ id: string; desc: boolean }>;
  localSorting: Array<{ id: string; desc: boolean }>;
  handleSort: (key: string) => void;
  enableSorting: boolean
}

function RenderTableHeader<T extends Record<string, any>> ({
  enableRowSelection,
  handleSelectAll,
  processedData,
  selectedRows,
  getRowId,
  enableActionsColumn,
  actionsColumnPosition,
  actionsColumnSize,
  columns,
  sortingState,
  localSorting,
  handleSort,
  enableSorting

}: RenderTableHeaderProps<T>) {
  const stickyHeader = false;
  const styles = CustomTableStyle();
  return (
    <View
        style={[
          styles.tableHeader,
          stickyHeader && styles.stickyHeader,
        ]}
      >
        {enableRowSelection && (
          <TouchableOpacity
            style={styles.selectionHeaderCell}
            onPress={handleSelectAll}
            accessibilityLabel="Seleccionar todas las filas"
          >
            <Ionicons
              name={
                processedData.length > 0 &&
                processedData.every((item, index) =>
                  selectedRows.has(getRowId(item, index))
                )
                  ? "checkbox"
                  : selectedRows.size > 0
                  ? "checkbox-outline"
                  : "square-outline"
              }
              size={20}
              color="#007AFF"
            />
          </TouchableOpacity>
        )}

        {/* Acciones al inicio */}
        {enableActionsColumn && actionsColumnPosition === "start" && (
          <View
            style={[
              styles.headerCell,
              { width: actionsColumnSize, minWidth: actionsColumnSize },
            ]}
          >
            <Text style={styles.headerText}>Acciones</Text>
          </View>
        )}

        {columns.map((column) => {
          const currentSort = (sortingState ?? localSorting).find(
            (s) => s.id === column.accessorKey
          );
          return (
            <TouchableOpacity
              key={column.accessorKey}
              style={[
                styles.headerCell,
                {
                  width: column.size || 120,
                  minWidth: column.minSize || column.size || 120,
                  maxWidth: column.maxSize,
                },
              ]}
              onPress={() => handleSort(column.accessorKey)}
              disabled={!enableSorting || column.enableSorting === false}
              accessibilityLabel={`Ordenar por ${column.header}`}
              accessibilityHint={
                currentSort
                  ? `Actualmente ordenado ${
                      currentSort.desc ? "descendente" : "ascendente"
                    }`
                  : "Toca para ordenar"
              }
            >
              <Text style={styles.headerText} numberOfLines={2}>
                {column.header}
              </Text>
              {enableSorting &&
                column.enableSorting !== false &&
                currentSort && (
                  <Ionicons
                    name={currentSort.desc ? "chevron-down" : "chevron-up"}
                    size={16}
                    color="#007AFF"
                  />
                )}
            </TouchableOpacity>
          );
        })}

        {/* Acciones al final */}
        {enableActionsColumn && actionsColumnPosition === "end" && (
          <View
            style={[
              styles.headerCell,
              { width: actionsColumnSize, minWidth: actionsColumnSize },
            ]}
          >
            <Text style={styles.headerText}>Acciones</Text>
          </View>
        )}
      </View>
  );
};

export default React.memo(RenderTableHeader) as typeof RenderTableHeader;
