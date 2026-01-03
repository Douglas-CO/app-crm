import { StyleSheet } from "react-native";

export const TabStyle = StyleSheet.create({
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: "relative",
    minWidth: 80,
    alignItems: "center",
  },
  activeTab: {
    // Estilos adicionales para tab activo si es necesario
  },
  tabText: {
    fontSize: 16,
    textAlign: "center",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 1.5,
  },
})
