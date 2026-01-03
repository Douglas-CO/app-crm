// useUiConfirmModalStore.ts
import { create } from "zustand";

interface ConfirmDialogState {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  onConfirm?: () => Promise<void> | void;
  onClose?: () => void;
  cancelTextBtn?: string;
  confirmTextBtn?: string;
  showCancelBtn?: boolean;
  showCustomInputsForm?: boolean;
  inputsForm?: React.ReactNode;
}

interface UiConfirmModalStore {
  confirmDialog: ConfirmDialogState;
  setConfirmDialog: (state: Partial<ConfirmDialogState>) => void;
  setConfirmDialogIsOpen: (open: boolean) => void;
}

export const useUiConfirmModalStore = create<UiConfirmModalStore>((set) => ({
  confirmDialog: {
    isOpen: false,
    showCancelBtn: true,
  },
  setConfirmDialog: (state) =>
    set((s) => ({ confirmDialog: { ...s.confirmDialog, ...state } })),
  setConfirmDialogIsOpen: (isOpen) =>
    set((s) => ({ confirmDialog: { ...s.confirmDialog, isOpen } })),
}));
