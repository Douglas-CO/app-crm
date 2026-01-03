import { useUiConfirmModalStore } from "@/hooks";
import React from "react";
import {
    Modal,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { CustomConfirmDialogStyles } from "./custom-dialogs.styles";

const CustomConfirmDialog: React.FC = () => {
  const open = useUiConfirmModalStore((s) => s.confirmDialog.isOpen);
  const title = useUiConfirmModalStore((s) => s.confirmDialog.title);
  const subtitle = useUiConfirmModalStore((s) => s.confirmDialog.subtitle);
  const onClose = useUiConfirmModalStore((s) => s.confirmDialog.onClose);
  const onConfirm = useUiConfirmModalStore((s) => s.confirmDialog.onConfirm);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    (s) => s.setConfirmDialogIsOpen
  );
  const cancelTextBtn = useUiConfirmModalStore(
    (s) => s.confirmDialog.cancelTextBtn
  );
  const confirmTextBtn = useUiConfirmModalStore(
    (s) => s.confirmDialog.confirmTextBtn
  );
  const showCancelBtn = useUiConfirmModalStore(
    (s) => s.confirmDialog.showCancelBtn
  );
  const showCustomInputsForm = useUiConfirmModalStore(
    (s) => s.confirmDialog.showCustomInputsForm
  );
  const inputsForm = useUiConfirmModalStore((s) => s.confirmDialog.inputsForm);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setConfirmDialogIsOpen(false);
    }
  };

  const handleConfirm = async () => {
    try {
      if (onConfirm) {
        await onConfirm();
      }
      setConfirmDialogIsOpen(false);
    } catch (error) {
      console.error("Error en confirmación:", error);
    }
  };

  return (
    <View>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        <View style={CustomConfirmDialogStyles.overlay}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.5)"
            barStyle="light-content"
          />
          <View style={CustomConfirmDialogStyles.dialogContainer}>
            {title ? <Text style={CustomConfirmDialogStyles.titleText}>{title}</Text> : null}
            {subtitle ? (
              <Text style={CustomConfirmDialogStyles.subtitleText}>{subtitle}</Text>
            ) : null}
            {showCustomInputsForm && inputsForm ? (
              <View style={CustomConfirmDialogStyles.inputsContainer}>{inputsForm}</View>
            ) : null}
            <View style={CustomConfirmDialogStyles.actionsContainer}>
              {showCancelBtn && (
                <TouchableOpacity
                  style={[CustomConfirmDialogStyles.button, CustomConfirmDialogStyles.cancelButton]}
                  onPress={handleClose}
                >
                  <Text style={CustomConfirmDialogStyles.cancelButtonText}>
                    {cancelTextBtn || "Cancelar"}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[CustomConfirmDialogStyles.button, CustomConfirmDialogStyles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={CustomConfirmDialogStyles.confirmButtonText}>
                  {confirmTextBtn || "Confirmar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default CustomConfirmDialog;
