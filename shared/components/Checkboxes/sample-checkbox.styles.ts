import { StyleSheet } from "react-native";

export const SampleCheckBoxStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
  },
  columnLabel: {
    marginLeft: 0,
    marginTop: 4,
  },
  disabledLabel: {
    color: "#CCCCCC",
  },
  helperText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    marginLeft: 32,
  },
});
