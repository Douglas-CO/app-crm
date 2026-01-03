import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomTableStyle from "./custom-table.styles";


export interface CustomTableErrorProps<T extends Record<string, any>> {
  onRefresh: (() => void) | undefined;
  error: string
}

function CustomTableError<T extends Record<string, any>>({
  onRefresh,
  error
}: CustomTableErrorProps<T>) {
  const styles = CustomTableStyle();
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color="#FF3B30" />
      <Text style={styles.errorTitle}>Error al cargar los datos</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      {onRefresh && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRefresh}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(CustomTableError) as typeof CustomTableError;
