import { Button } from "@/components/button";
import { CustomScrollView } from "@/components/scrollview";
import React from "react";
import { Text, View } from "react-native";
import { singleFormBoxSceneStyle } from "./singleformboxscene.style";

type SingleFormBoxSceneProps = {
  children: React.ReactNode;
  titlePage?: string;
  onCancel?: () => void;
  onSave?: (e?: any) => Promise<void>;
  disableSubmitBtn?: boolean;
  titleNode?: React.ReactNode;
  onReject?: () => void;
  cancelTextBtn?: string;
  saveTextBtn?: string;
  rejectTextBtn?: string;
  cancelColorBtn?: string;
  rejectColotBtn?: string;
};

const SingleFormBoxScene: React.FC<SingleFormBoxSceneProps> = ({
  children,
  titlePage,
  onCancel,
  onSave,
  disableSubmitBtn = false,
  titleNode = null,
  onReject,
  cancelTextBtn = "Cancelar",
  saveTextBtn = "Guardar",
  rejectTextBtn = "Rechazar",
  cancelColorBtn = "gray",
  rejectColotBtn = "red",
}) => {
  const styles = singleFormBoxSceneStyle();
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleSave = async () => {
    if (onSave) await onSave();
  };

  const handleReject = () => {
    if (onReject) onReject();
  };

  const renderTitle = () => {
    if (React.isValidElement(titleNode)) return titleNode;
    if (typeof titleNode === "string") {
      return <Text style={styles.title}>{titleNode}</Text>;
    }
    if (titlePage) {
      return <Text style={styles.title}>{titlePage}</Text>;
    }
    return null;
  };

  return (
    <CustomScrollView>
      <View style={styles.card}>
        {renderTitle()}
        <View style={styles.formContent}>{children}</View>
        <View style={styles.buttonRow}>
          {onCancel && (
            <Button
              label={cancelTextBtn}
              color={cancelColorBtn}
              onPress={handleCancel}
            />
          )}
          {onReject && (
            <Button
              label={rejectTextBtn}
              color={rejectColotBtn}
              onPress={handleReject}
            />
          )}
          {onSave && (
            <Button
              label={saveTextBtn}
              color="green"
              onPress={handleSave}
              disabled={disableSubmitBtn}
            />
          )}
        </View>
      </View>
    </CustomScrollView>
  );
};

export default SingleFormBoxScene;
