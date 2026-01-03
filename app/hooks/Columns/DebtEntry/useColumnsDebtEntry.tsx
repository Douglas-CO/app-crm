import { updateDebtEntry } from "@/app/actions";
import { DebtEntry } from "@/app/interfaces";
import { Column } from "@/components/column";
import { useUiConfirmModalStore } from "@/hooks";
import { CustomSwitch } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import Toast from "react-native-toast-message";

export const useColumnsDebtEntry = () => {
  const setConfirmDialog = useUiConfirmModalStore((s) => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    (s) => s.setConfirmDialogIsOpen
  );

  const queryClient = useQueryClient();

  const { mutate: changeState } = useMutation({
    mutationFn: (payload: { id: number; data: { state: boolean } }) =>
      updateDebtEntry<{ state: boolean }>(payload),
    onSuccess: (res) => {
      if (res.success) {
        Toast.show({ type: "success", text1: "Estado actualizado" });
        queryClient.invalidateQueries({ queryKey: ["debt_entries"] });
      } else {
        Toast.show({ type: "error", text1: "Error al actualizar" });
      }
    },
    onError: () => {
      Toast.show({ type: "error", text1: "No se pudo cambiar el estado" });
    },
  });

  const DebtEntryColumn = useMemo<Column<DebtEntry>[]>(() => [
    {
      accessorKey: "name",
      header: "NOMBRE",
      size: 150,
    },
    {
      accessorKey: "code",
      header: "CÓDIGO",
      size: 150,
    },
    {
      accessorKey: "value",
      header: "VALOR",
      size: 200,
    },
    {
      accessorKey: "state",
      header: "ESTADO",
      size: 150,
      filterVariant: "select",
      filterSelectOptions: [
        { label: "Activo", value: true },
        { label: "Inactivo", value: false },
      ],
      Cell: ({ row }) => (
        <CustomSwitch
          title="Estado"
          checked={row.original?.state}
          onChangeChecked={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Cambiar Estado",
              subtitle:
                "¿Está seguro que desea cambiar el estado de este registro?",
              onConfirm: () => {
                setConfirmDialogIsOpen(false);
                changeState({
                  id: Number(row.original.id),
                  data: { state: !row.original.state },
                });
              },
            });
          }}
        />
      ),
    },
  ], [setConfirmDialog, setConfirmDialogIsOpen, changeState]);

  return {
    DebtEntryColumn,
  };
};
