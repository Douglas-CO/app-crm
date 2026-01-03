import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Column } from "@/components/column";
import { InputTextField } from "@/components/fields";
import { usePaletteStore } from "@/store/usePaletteStore";
import { useForm } from "react-hook-form";
import CustomTableStyle from "./custom-table.styles";

export interface RenderHeaderProps<T extends Record<string, any>> {
  enableGlobalFilter: boolean;
  globalFilterValue: string | undefined;
  localGlobalFilter: string;
  handleGlobalFilterChange: (value: string) => void;
  renderTopToolbarCustomActions: (() => React.ReactNode) | undefined;
  selectedRows: Set<string>;
  rowCount: number;
  data: T[];
  enableExport: boolean;
  handleExport: () => void;
  enableManualFiltering: boolean;
  columns: Column<T>[];
  localColumnFilters: Record<string, string>;
  handleColumnFilterChange: (key: string, value: string) => void;
}

function RenderHeader<T extends Record<string, any>>({
  enableGlobalFilter,
  globalFilterValue,
  localGlobalFilter,
  handleGlobalFilterChange,
  renderTopToolbarCustomActions,
  selectedRows,
  rowCount,
  data,
  enableExport,
  handleExport,
  enableManualFiltering,
  columns,
  localColumnFilters,
  handleColumnFilterChange,
}: RenderHeaderProps<T>) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showFilters, setShowFilters] = useState(false);
  const { selectedPalette } = usePaletteStore();
  const styles = CustomTableStyle();

  const { control } = useForm({
    defaultValues: {},
  });

  // Animate filter panel
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showFilters ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showFilters, fadeAnim]);

  return (
    <View style={styles.headerContainer}>
      {/* Search Bar */}
      {/**
        {enableGlobalFilter && (
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              value={globalFilterValue ?? localGlobalFilter}
              onChangeText={handleGlobalFilterChange}
              accessibilityLabel="Campo de búsqueda global"
              accessibilityHint="Ingresa texto para filtrar los datos de la tabla"
            />
            {(globalFilterValue ?? localGlobalFilter) && (
              <TouchableOpacity
                onPress={() => handleGlobalFilterChange("")}
                style={styles.clearButton}
                accessibilityLabel="Limpiar búsqueda"
              >
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        )}
      */}

      {/* Toolbar */}
      <View style={styles.topToolbar}>
        <View style={styles.toolbarLeft}>
          {renderTopToolbarCustomActions ? (
            renderTopToolbarCustomActions()
          ) : (
            <Text style={styles.totalText}>
              {selectedRows.size > 0
                ? `${selectedRows.size} seleccionados de ${
                    rowCount || data.length
                  }`
                : `Total: ${rowCount || data.length}`}
            </Text>
          )}
        </View>

        <View style={styles.toolbarRight}>
          {enableExport && (
            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={handleExport}
              accessibilityLabel="Exportar datos"
            >
              <Ionicons name="download-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
          )}

          {enableManualFiltering && (
            <TouchableOpacity
              style={[
                styles.toolbarButton,
                showFilters && styles.activeButton,
              ]}
              onPress={() => setShowFilters(!showFilters)}
              accessibilityLabel={
                showFilters ? "Ocultar filtros" : "Mostrar filtros"
              }
            >
              <Ionicons
                name={showFilters ? "filter" : "filter-outline"}
                size={20}
                color={selectedPalette.additional_third}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Column Filters */}
      {showFilters && enableManualFiltering && (
        <Animated.View
          style={[styles.filtersContainer, { opacity: fadeAnim }]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              {columns.map(
                (column) =>
                  column.enableColumnFilter !== false && (
                    <View
                      key={column.accessorKey}
                      style={[
                        styles.columnFilter,
                        { width: column.size || 120 },
                      ]}
                    >
                      <Text style={styles.filterLabel}>
                        {column.header}
                      </Text>
                      <InputTextField
                        name={column.accessorKey}
                        control={control} // viene del useForm()
                        placeholder={`Filtrar ${column.header}`}
                        style={styles.filterInput}
                        onSearch // si quieres el icono de búsqueda
                        onChange={(e) => {
                          const text = e.nativeEvent.text;
                          handleColumnFilterChange(column.accessorKey, text);
                        }}
                      />
                    </View>
                  )
              )}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

export default React.memo(RenderHeader) as typeof RenderHeader;
