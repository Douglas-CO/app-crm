import { StyleSheet } from "react-native";

export const inputTextFieldStyles = () => {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
    },
    input: {
      borderWidth: 1,
      borderColor: "#e0e0e0",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: "#f9f9f9",
      flex: 1,
    },
    inputWithIcon: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    inputError: {
      borderColor: "#ff4444",
      backgroundColor: "#fff5f5",
    },
    searchIcon: {
      position: "absolute",
      left: 12,
      zIndex: 1,
    },
    clearButton: {
      position: "absolute",
      right: 12,
      zIndex: 1,
      padding: 4,
    },
    helperText: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    errorText: {
      fontSize: 14,
      color: "#ff4444",
      marginTop: 4,
    },
  });
};
