import { usePaletteStore } from "@/store/usePaletteStore";
import { StyleSheet } from "react-native";

export const SingleTableBoxSceneStyles = () => {
  const { selectedPalette } = usePaletteStore();
  return StyleSheet.create({
    scrollContainer: {
      backgroundColor: "white",
      overflow: "hidden",
      width: "100%",
      borderRadius: 5,
    },
    container: {
      flexGrow: 1,
      backgroundColor: selectedPalette.primary,
    },
    header: {
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      flex: 1,
      margin: 12,
      color: selectedPalette.additional_third,
    },
    button: {
      backgroundColor: selectedPalette.secondary_second,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      margin: 12,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
    card: {
      backgroundColor: selectedPalette.primary,
      padding: 12,
      borderRadius: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
    },
    extraBtns: {
      marginBottom: 12,
    },
  });
};
