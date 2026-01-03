import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { LoadingSpinnerStyles } from "./loading.styles";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "large",
  color = "#007AFF",
}) => {
  return (
    <View>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={LoadingSpinnerStyles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingSpinner