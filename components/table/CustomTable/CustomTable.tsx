"use client";

import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CustomTableError,
  CustomTableProps,
  CustomTableStyle,
  RenderHeader,
  RenderPagination,
  RenderRow,
  RenderTableHeader,
  TableSkeleton,
  useTableLogic
} from "./components";

function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  isRefetching = false,
  error = null,
  enableGlobalFilter = true,
  onGlobalFilterChange,
  globalFilterValue,
  canPaginate = true,
  pagination,
  onPaging,
  rowCount = 0,
  pageSizeOptions = [10, 25, 50, 100],
  enableRowSelection = false,
  selectedRows = new Set(),
  onRowSelectionChange,
  getRowId = (row, index) => String(index),
  actionsColumnSize = 120,
  actionsColumnPosition = "end",
  canEdit = true,
  onEdit,
  canDelete = false,
  onDelete,
  enableActionsColumn = true,
  onConditionDelete = () => canDelete,
  onConditionEdit = () => canEdit,
  enableSorting = true,
  sortingState,
  onSortingChange,
  showOneCustomButton = false,
  onConditionCustomButton = () => showOneCustomButton,
  oneCustomButton,
  enableManualFiltering = false,
  onColumnFiltersChange,
  columnFilters = [],
  renderTopToolbarCustomActions,
  tableWidth = "90%",
  maxHeight,
  minHeight = 200,
  enableVerticalScroll = true,
  enableVirtualization = false,
  getItemLayout,
  enableExport = false,
  onExport,
  onRefresh,
}: CustomTableProps<T>) {
  const flatListRef = useRef<FlatList>(null);
  const styles = CustomTableStyle();

  const {
    processedData,
    localGlobalFilter,
    setLocalGlobalFilter,
    localColumnFilters,
    setLocalColumnFilters,
    localSorting,
    setLocalSorting,
  } = useTableLogic(data, columns, {
    enableGlobalFilter,
    globalFilterValue,
    enableManualFiltering,
    columnFilters,
    sortingState,
  });

  const screenWidth = Dimensions.get("window").width;
  const tableWidthValue =
    typeof tableWidth === "string"
      ? screenWidth * (Number.parseFloat(tableWidth) / 100)
      : tableWidth;

  const totalColumnsWidth = useMemo(() => {
    const selectionWidth = enableRowSelection ? 50 : 0;
    const columnsWidth = columns.reduce(
      (total, column) => total + (column.size || 120),
      0
    );
    const actionsWidth = enableActionsColumn ? actionsColumnSize : 0;
    return selectionWidth + columnsWidth + actionsWidth;
  }, [columns, enableActionsColumn, actionsColumnSize, enableRowSelection]);

  const needsHorizontalScroll = totalColumnsWidth > tableWidthValue;

  const handleSort = useCallback(
    (key: string) => {
      if (!enableSorting) return;
      const newSorting = localSorting.find((s) => s.id === key)
        ? localSorting.map((s) => (s.id === key ? { ...s, desc: !s.desc } : s))
        : [{ id: key, desc: false }];
      setLocalSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    [enableSorting, localSorting, setLocalSorting, onSortingChange]
  );

  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setLocalGlobalFilter(value);
      onGlobalFilterChange?.(value);
    },
    [setLocalGlobalFilter, onGlobalFilterChange]
  );

  const handleColumnFilterChange = useCallback(
    (key: string, value: string) => {
      const newFilters = { ...localColumnFilters, [key]: value };
      setLocalColumnFilters(newFilters);
      if (enableManualFiltering && onColumnFiltersChange) {
        const filterArray = Object.entries(newFilters)
          .filter(([, val]) => val)
          .map(([id, value]) => ({ id, value }));
        onColumnFiltersChange(filterArray);
      }
    },
    [
      localColumnFilters,
      setLocalColumnFilters,
      enableManualFiltering,
      onColumnFiltersChange,
    ]
  );

  const handleDelete = useCallback(
    (item: T) => {
      Alert.alert("Confirmar eliminación", "¿Eliminar este elemento?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onDelete?.(item),
        },
      ]);
    },
    [onDelete]
  );

  const handleRowSelection = useCallback(
    (rowId: string) => {
      if (!enableRowSelection || !onRowSelectionChange) return;
      const newSelection = new Set(selectedRows);
      newSelection.has(rowId)
        ? newSelection.delete(rowId)
        : newSelection.add(rowId);
      onRowSelectionChange(newSelection);
    },
    [enableRowSelection, selectedRows, onRowSelectionChange]
  );

  const handleSelectAll = useCallback(() => {
    if (!enableRowSelection || !onRowSelectionChange) return;
    const allSelected = processedData.every((item, i) =>
      selectedRows.has(getRowId(item, i))
    );
    onRowSelectionChange(
      allSelected
        ? new Set()
        : new Set(processedData.map((item, i) => getRowId(item, i)))
    );
  }, [
    enableRowSelection,
    processedData,
    selectedRows,
    onRowSelectionChange,
    getRowId,
  ]);

  const handleExport = useCallback(() => {
    if (enableExport && onExport) onExport(processedData);
  }, [enableExport, onExport, processedData]);

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-outline" size={48} color="#ccc" />
      <Text style={styles.emptyText}>No hay datos disponibles</Text>
      {enableGlobalFilter && (globalFilterValue ?? localGlobalFilter) && (
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => handleGlobalFilterChange("")}
        >
          <Text style={styles.clearFiltersText}>Limpiar filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFlatList = () => (
    <FlatList
      ref={flatListRef}
      data={processedData}
      renderItem={renderRow}
      keyExtractor={(item, index) => getRowId(item, index)}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        ) : undefined
      }
      ListEmptyComponent={<EmptyComponent />}
      scrollEnabled={enableVerticalScroll}
      nestedScrollEnabled={true}
      removeClippedSubviews={enableVirtualization}
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={enableVirtualization ? 10 : undefined}
      windowSize={enableVirtualization ? 10 : undefined}
    />
  );

  const renderHeader = useCallback(
    () => (
      <RenderHeader
        enableGlobalFilter={enableGlobalFilter}
        globalFilterValue={globalFilterValue}
        localGlobalFilter={localGlobalFilter}
        handleGlobalFilterChange={handleGlobalFilterChange}
        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
        selectedRows={selectedRows}
        rowCount={rowCount}
        data={data}
        enableExport={enableExport}
        handleExport={handleExport}
        enableManualFiltering={enableManualFiltering}
        columns={columns}
        localColumnFilters={localColumnFilters}
        handleColumnFilterChange={handleColumnFilterChange}
      />
    ),
    [
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
      handleColumnFilterChange
    ]
  );

  const renderTableHeader = useCallback(
    () => (
      <RenderTableHeader
        enableRowSelection={enableRowSelection}
        handleSelectAll={handleSelectAll}
        processedData={processedData}
        selectedRows={selectedRows}
        getRowId={getRowId}
        enableActionsColumn={enableActionsColumn}
        actionsColumnPosition={actionsColumnPosition}
        actionsColumnSize={actionsColumnSize}
        columns={columns}
        sortingState={sortingState}
        localSorting={localSorting}
        handleSort={handleSort}
        enableSorting={enableSorting}
      />
    ),
    [enableRowSelection,
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
      handleSort,
      enableSorting
    ]
  );

  const renderRow = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      const rowId = getRowId(item, index);
      return (
        <RenderRow
          index={index}
          isSelected={selectedRows.has(rowId)}
          enableRowSelection={enableRowSelection}
          rowId={rowId}
          handleRowSelection={handleRowSelection}
          enableActionsColumn={enableActionsColumn}
          actionsColumnPosition={actionsColumnPosition}
          actionsColumnSize={actionsColumnSize}
          canEdit={canEdit}
          onEdit={onEdit}
          onConditionEdit={onConditionEdit}
          item={item}
          canDelete={canDelete}
          onDelete={onDelete}
          onConditionDelete={onConditionDelete}
          handleDelete={handleDelete}
          showOneCustomButton={showOneCustomButton}
          oneCustomButton={oneCustomButton}
          onConditionCustomButton={onConditionCustomButton}
          columns={columns}
        />
      );
    },
    [
      selectedRows,
      enableRowSelection,
      handleRowSelection,
      enableActionsColumn,
      actionsColumnPosition,
      actionsColumnSize,
      canEdit,
      onEdit,
      onConditionEdit,
      canDelete,
      onDelete,
      onConditionDelete,
      handleDelete,
      showOneCustomButton,
      oneCustomButton,
      onConditionCustomButton,
      columns,
      getRowId,
    ]
  );

  const renderPagination = useCallback(() => {
    if (!canPaginate || !pagination || !onPaging) return null;
    const totalPages = Math.ceil(rowCount / pagination.pageSize);
    return (
      <RenderPagination
        pagination={pagination}
        pageSizeOptions={pageSizeOptions}
        onPaging={onPaging}
        currentPage={pagination.pageIndex + 1}
        totalPages={totalPages}
        rowCount={rowCount}
      />
    );
  }, [canPaginate, pagination, onPaging, rowCount, pageSizeOptions]);

  if (error) return <CustomTableError onRefresh={onRefresh} error={error} />;
  if (isLoading)
    return (
      <View style={[styles.container, { width: "100%" }]}>
        {renderHeader()}
        <TableSkeleton />
      </View>
    );

  return (
    <View
      style={[
        styles.container,
        { width: "100%", maxHeight, minHeight },
      ]}
    >
      {renderHeader()}
      <View
        style={[
          styles.tableContainer,
          { flex: enableVerticalScroll ? 1 : 0 },
        ]}
      >
        {needsHorizontalScroll ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            style={styles.horizontalScrollContainer}
            bounces={false}
          >
            <View style={{ width: totalColumnsWidth }}>
              {renderTableHeader()}
              {renderFlatList()}
            </View>
          </ScrollView>
        ) : (
          <View style={{ width: tableWidthValue }}>
            {renderTableHeader()}
            {renderFlatList()}
          </View>
        )}
      </View>
      {renderPagination()}
    </View>
  );
}

export default CustomTable;
