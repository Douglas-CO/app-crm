import { StyleSheet } from "react-native";

export const CustomSwitchStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  activeSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  activeUnselected: {
    backgroundColor: "transparent",
    borderColor: "#4CAF50",
  },
  inactiveSelected: {
    backgroundColor: "#f44336",
    borderColor: "#f44336",
  },
  inactiveUnselected: {
    backgroundColor: "transparent",
    borderColor: "#f44336",
  },
  disabled: {
    opacity: 0.5,
  },
  spacer: {
    width: 8,
  },
  statusText: {
    flex: 1,
    textAlign: "left",
    fontWeight: "500",
    fontSize: 13,
    marginLeft: 8,
  },
})
