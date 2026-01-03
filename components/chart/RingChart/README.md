```
const sampleData1 = [
  { id: 1, nombre: "manzana", cantidad: 90 },
  { id: 2, nombre: "pera", cantidad: 10 },
  { id: 3, nombre: "uva", cantidad: 40 },
  { id: 4, nombre: "banana", cantidad: 55 },
]

const sampleData2 = [
  { id: 1, nombre: "Ventas", valor: 150 },
  { id: 2, nombre: "Marketing", valor: 80 },
  { id: 3, nombre: "Desarrollo", valor: 120 },
  { id: 4, nombre: "Soporte", valor: 50 },
]

const sampleData3 = [
  { id: 1, nombre: "Juan", persona: 25 },
  { id: 2, nombre: "María", persona: 35 },
  { id: 3, nombre: "Carlos", persona: 20 },
  { id: 4, nombre: "Ana", persona: 30 },
]

<View style={stylesRing.chartSection}>
        <Text style={stylesRing.sectionTitle}>Gráfico de Anillo - Departamentos</Text>
        <RingChart
          data={sampleData2}
          valueField="valor"
          size={280}
          innerRadius={0.6}
          centerText="400"
          centerSubtext="Total Valor"
        />
      </View>

      <View style={stylesRing.chartSection}>
        <Text style={stylesRing.sectionTitle}>Gráfico de Anillo - Edades</Text>
        <RingChart
          data={sampleData3}
          valueField="persona"
          size={280}
          innerRadius={0.4}
          showLabels={false}
          centerText="110"
          centerSubtext="Años Total"
        />
      </View>


const stylesRing = StyleSheet.create({
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