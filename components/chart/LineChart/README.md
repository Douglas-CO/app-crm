```


const lineChartExample = {
  banana_data: [
    { id: 1, nombre: "banana", cantidad: 25 },
    { id: 2, nombre: "banana", cantidad: 35 },
    { id: 3, nombre: "banana", cantidad: 20 },
    { id: 4, nombre: "banana", cantidad: 30 },
  ],
  manzana_data: [
    { id: 1, nombre: "manzana", cantidad: 50 },
    { id: 2, nombre: "manzana", cantidad: 80 },
    { id: 3, nombre: "manzana", cantidad: 1 },
    { id: 4, nombre: "manzana", cantidad: 10 },
  ],
  uva_data: [
    { id: 1, nombre: "uva", cantidad: 15 },
    { id: 2, nombre: "uva", cantidad: 25 },
    { id: 3, nombre: "uva", cantidad: 45 },
    { id: 4, nombre: "uva", cantidad: 35 },
  ],
}

const salesData = {
  ventas_enero: [
    { id: 1, nombre: "ventas", valor: 100 },
    { id: 2, nombre: "ventas", valor: 150 },
    { id: 3, nombre: "ventas", valor: 120 },
    { id: 4, nombre: "ventas", valor: 180 },
    { id: 5, nombre: "ventas", valor: 200 },
  ],
  ventas_febrero: [
    { id: 1, nombre: "ventas", valor: 80 },
    { id: 2, nombre: "ventas", valor: 90 },
    { id: 3, nombre: "ventas", valor: 110 },
    { id: 4, nombre: "ventas", valor: 140 },
    { id: 5, nombre: "ventas", valor: 160 },
  ],
}

<LineChart data={lineChartExample} valueField="cantidad" />

        <LineChart
          data={salesData}
          valueField="valor"
          width={380}
          height={280}
          strokeWidth={4}
        />



const stylesLineChart = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    color: "#333",
  },
  chartSection: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
  },
})
```
