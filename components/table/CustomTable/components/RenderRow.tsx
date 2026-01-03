import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Column } from "@/components/column";
import { usePaletteStore } from "@/store/usePaletteStore";
import CustomTableStyle from "./custom-table.styles";

export interface RenderRowProps<T extends Record<string, any>> {
  index: number;
  isSelected: boolean;
  enableRowSelection: boolean;
  rowId: string;
  handleRowSelection: (rowId: string) => void;
  enableActionsColumn: boolean;
  actionsColumnPosition: "start" | "end";
  actionsColumnSize: number;
  canEdit: boolean;
  onEdit: ((original: T) => void) | undefined;
  onConditionEdit?: (original: T) => boolean;
  item: T;
  canDelete: boolean;
  onDelete: ((original: T) => void) | undefined;
  onConditionDelete: (original: T) => boolean;
  handleDelete: (item: T) => void;
  showOneCustomButton: boolean;
  oneCustomButton: ((original: T) => React.ReactNode) | undefined;
  onConditionCustomButton: (original: T) => boolean;
  columns: Column<T>[]
}


function RenderRow<T extends Record<string, any>> ({
  index,
  isSelected,
  enableRowSelection,
  rowId,
  handleRowSelection,
  enableActionsColumn,
  actionsColumnPosition,
  actionsColumnSize,
  canEdit,
  onEdit,
  onConditionEdit = () => canEdit,
  item,
  canDelete,
  onDelete,
  onConditionDelete = () => canDelete,
  handleDelete,
  showOneCustomButton,
  oneCustomButton,
  onConditionCustomButton,
  columns
}: RenderRowProps<T>) {
  const styles = CustomTableStyle();
  const { selectedPalette } = usePaletteStore();
  return (
    <View
      style={[
        styles.row,
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
        isSelected && styles.selectedRow,
      ]}
    >
      {enableRowSelection && (
        <TouchableOpacity
          style={styles.selectionCell}
          onPress={() => handleRowSelection(rowId)}
          accessibilityLabel={`${
            isSelected ? "Deseleccionar" : "Seleccionar"
          } fila ${index + 1}`}
        >
          <Ionicons
            name={isSelected ? "checkbox" : "square-outline"}
            size={20}
            color={selectedPalette.additional_third}
          />
        </TouchableOpacity>
      )}

      {/* Acciones al inicio */}
      {enableActionsColumn && actionsColumnPosition === "start" && (
        <View
          style={[
            styles.actionsCell,
            { width: actionsColumnSize, minWidth: actionsColumnSize },
          ]}
        >
          {canEdit && onEdit && onConditionEdit(item) && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(item)}
              accessibilityLabel={`Editar fila ${index + 1}`}
            >
              <Ionicons name="pencil" size={18} color={selectedPalette.additional_third} />
            </TouchableOpacity>
          )}

          {canDelete && onDelete && onConditionDelete(item) && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(item)}
              accessibilityLabel={`Eliminar fila ${index + 1}`}
            >
              <Ionicons name="trash" size={18} color="#FF3B30" />
            </TouchableOpacity>
          )}

          {showOneCustomButton &&
            oneCustomButton &&
            onConditionCustomButton(item) &&
            oneCustomButton(item)}
        </View>
      )}

      {columns.map((column) => (
        <View
          key={column.accessorKey}
          style={[
            styles.cell,
            {
              width: column.size || 120,
              minWidth: column.minSize || column.size || 120,
              maxWidth: column.maxSize,
            },
          ]}
        >
          {column.Cell ? (
            column.Cell({
              cell: { getValue: () => item[column.accessorKey] },
              row: { original: item },
            })
          ) : (
            <Text style={styles.cellText} numberOfLines={2}>
              {String(item[column.accessorKey] || "")}
            </Text>
          )}
        </View>
      ))}

      {/* Acciones al final */}
      {enableActionsColumn && actionsColumnPosition === "end" && (
        <View
          style={[
            styles.actionsCell,
            { width: actionsColumnSize, minWidth: actionsColumnSize },
          ]}
        >
          {canEdit && onEdit && onConditionEdit(item) && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(item)}
              accessibilityLabel={`Editar fila ${index + 1}`}
            >
              <Ionicons name="pencil" size={18} color={selectedPalette.additional_third} />
            </TouchableOpacity>
          )}

          {canDelete && onDelete && onConditionDelete(item) && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(item)}
              accessibilityLabel={`Eliminar fila ${index + 1}`}
            >
              <Ionicons name="trash" size={18} color="#FF3B30" />
            </TouchableOpacity>
          )}

          {showOneCustomButton &&
            oneCustomButton &&
            onConditionCustomButton(item) &&
            oneCustomButton(item)}
        </View>
      )}
    </View>
  );
};

export default React.memo(RenderRow) as typeof RenderRow;
