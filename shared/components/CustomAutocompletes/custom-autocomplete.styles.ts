import { usePaletteStore } from "@/store/usePaletteStore";
import { StyleSheet } from "react-native";

export const CustomAutoCompleteArrStringStyles = () => {
  const { selectedPalette } = usePaletteStore();
  return StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: selectedPalette.additional_third,
      marginBottom: 8,
    },
    required: {
      color: selectedPalette.additional_third,
    },
    inputContainer: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: selectedPalette.secondary_first,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: selectedPalette.secondary_first,
      paddingRight: 80, // Space for icons
    },
    textInputError: {
      borderColor: "#f44336",
    },
    textInputDisabled: {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "rgba(0, 0, 0, 0.6)",
    },
    inputActions: {
      position: "absolute",
      right: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    loadingIcon: {
      marginRight: 8,
    },
    clearButton: {
      padding: 4,
      marginRight: 4,
    },
    dropdownButton: {
      padding: 4,
    },
    errorText: {
      color: "#f44336",
      fontSize: 12,
      marginTop: 4,
    },
    helperText: {
      color: selectedPalette.additional_third,
      fontSize: 12,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    optionsContainer: {
      position: "absolute",
      backgroundColor: selectedPalette.secondary_first,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      maxHeight: 200,
      elevation: 5,
      shadowColor: selectedPalette.additional_third,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    optionsList: {
      maxHeight: 200,
    },
    optionItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: selectedPalette.additional_third,
    },
    optionText: {
      fontSize: 16,
      color: selectedPalette.additional_third,
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    loadingText: {
      marginLeft: 8,
      color: selectedPalette.additional_third,
    },
    noOptionsContainer: {
      padding: 16,
      alignItems: "center",
    },
    noOptionsText: {
      color: selectedPalette.additional_third,
      fontStyle: "italic",
    },
  });
};
