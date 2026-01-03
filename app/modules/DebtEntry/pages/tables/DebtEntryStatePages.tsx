"use client";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";

import { useColumnsDebtEntry, useDebtEntries } from "@/app/hooks";
import { DebtEntry } from "@/app/interfaces";
import { ROUTER_PATHS } from "@/app/routes";
import { CustomTable, TABLE_CONSTANTS } from "@/components";
import {
  useTableFilter,
  useTableServerSideFiltering,
  useUiConfirmModalStore,
} from "@/hooks";

export type DebtEntryStatePagesProps = {
  state: string;
};

const returnUrlDebtEntryStatePages = ROUTER_PATHS.debt_entry.debtentryEditar;

const DebtEntryStatePages: React.FC<DebtEntryStatePagesProps> = ({ state }) => {
  const router = useRouter();

  const setConfirmDialog = useUiConfirmModalStore((s) => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    (s) => s.setConfirmDialogIsOpen
  );

  // Filtros de tabla
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();
  const { pagination, setPagination } = useTableFilter();

  // Extraer filtros para consulta
  const filtersObject = Object.fromEntries(
    columnFilters.map(({ id, value }) => [id, value])
  );

  // Llamada a React Query
  const {
    data = [],
    isLoading,
    isFetching,
  } = useDebtEntries({
    ...filtersObject,
    code: state,
  });

  // Columnas
  const { DebtEntryColumn } = useColumnsDebtEntry();

  // Acción editar
  const handleEdit = useCallback(
    (entry: DebtEntry) => {
      setConfirmDialog({
        isOpen: true,
        title: `Editar ${entry.name}`,
        subtitle: "¿Estás seguro que deseas editar este dato?",
        confirmTextBtn: "Continuar",
        cancelTextBtn: "No",
        showCancelBtn: true,
        onConfirm: async () => {
          setConfirmDialogIsOpen(false);
          if (entry.id == null) return;
          router.push({
            pathname: returnUrlDebtEntryStatePages as any,
            params: { id: entry.id },
          });
        },
      });
    },
    [router, setConfirmDialog, setConfirmDialogIsOpen]
  );

  return (
    <View>
      <CustomTable<DebtEntry>
        columns={DebtEntryColumn}
        data={data}
        isLoading={isLoading}
        isRefetching={isFetching}
        // Filtros
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // Paginación (a futuro si agregas lógica en getDebtEntrys)
        pagination={pagination}
        onPaging={setPagination}
        rowCount={data.length}
        // Acciones
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        actionsColumnPosition="start"
        enableActionsColumn={true}
        canEdit={true}
        canDelete={false}
        onEdit={handleEdit}
      />
    </View>
  );
};

export default DebtEntryStatePages;
