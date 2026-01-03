import { usePaletteStore } from "@/store/usePaletteStore";
import { Dimensions, StyleSheet } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;

export const singleFormBoxSceneStyle = () => {
  const { selectedPalette } = usePaletteStore();
  return StyleSheet.create({
  card: {
    alignSelf: "center",
    backgroundColor: selectedPalette.primary,
    borderRadius: 12,
    padding: 16,
    width: Math.min(SCREEN_WIDTH * 0.78, 600),
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: selectedPalette.additional_third
  },
  formContent: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  button: {
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    textAlign: "center",
    overflow: "hidden",
  },
 });
};
