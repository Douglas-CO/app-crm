import { StyleSheet } from "react-native";

export const PastelChartStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  legend: {
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
})
