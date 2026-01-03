import React from "react"
import { ScrollView, Text, View } from "react-native"
import Svg, { Circle, Line, Path, Text as SvgText } from "react-native-svg"
import { LineChartStyle } from "./linechart.style"

interface DataItem {
  id: number
  nombre: string
  [key: string]: any
}

interface LineChartData {
  [key: string]: DataItem[]
}

interface LineChartProps {
  data: LineChartData
  valueField: string
  width?: number
  height?: number
  showPoints?: boolean
  showGrid?: boolean
  showLegend?: boolean
  strokeWidth?: number
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  valueField,
  width = 350,
  height = 250,
  showPoints = true,
  showGrid = true,
  showLegend = true,
  strokeWidth = 3,
}) => {
  // Colores pasteles para las líneas
  const pastelColors = [
    "#FF6B9D", // Rosa
    "#4ECDC4", // Turquesa
    "#45B7D1", // Azul
    "#96CEB4", // Verde
    "#FFEAA7", // Amarillo
    "#DDA0DD", // Púrpura
    "#98D8C8", // Verde menta
    "#F7DC6F", // Amarillo claro
    "#BB8FCE", // Lavanda
    "#85C1E9", // Azul claro
  ]

  // Procesar datos y obtener estadísticas
  const processedSeries = Object.keys(data).map((seriesKey, index) => {
    const seriesData = data[seriesKey]
    const values = seriesData.map((item) => item[valueField] || 0)
    const seriesName = seriesKey.replace("_data", "").replace("_", " ")

    return {
      key: seriesKey,
      name: seriesName,
      data: seriesData,
      values,
      color: pastelColors[index % pastelColors.length],
    }
  })

  // Encontrar valores mínimos y máximos globales
  const allValues = processedSeries.flatMap((series) => series.values)
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)
  const maxDataPoints = Math.max(...processedSeries.map((series) => series.data.length))

  // Configuración del gráfico
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Función para convertir valores a coordenadas
  const getX = (index: number) => padding + (index * chartWidth) / (maxDataPoints - 1)
  const getY = (value: number) => {
    const normalizedValue = (value - minValue) / (maxValue - minValue)
    return height - padding - normalizedValue * chartHeight
  }

  // Crear líneas de grid
  const gridLines = []
  if (showGrid) {
    // Líneas horizontales
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5
      gridLines.push(
        <Line key={`h-grid-${i}`} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#E0E0E0" strokeWidth="1" />,
      )
    }

    // Líneas verticales
    for (let i = 0; i < maxDataPoints; i++) {
      const x = getX(i)
      gridLines.push(
        <Line key={`v-grid-${i}`} x1={x} y1={padding} x2={x} y2={height - padding} stroke="#E0E0E0" strokeWidth="1" />,
      )
    }
  }

  // Crear etiquetas del eje Y
  const yLabels = []
  for (let i = 0; i <= 5; i++) {
    const value = minValue + (i * (maxValue - minValue)) / 5
    const y = height - padding - (i * chartHeight) / 5
    yLabels.push(
      <SvgText key={`y-label-${i}`} x={padding - 10} y={y + 4} fontSize="10" fill="#666" textAnchor="end">
        {value.toFixed(0)}
      </SvgText>,
    )
  }

  // Crear etiquetas del eje X
  const xLabels = []
  for (let i = 0; i < maxDataPoints; i++) {
    const x = getX(i)
    xLabels.push(
      <SvgText key={`x-label-${i}`} x={x} y={height - padding + 20} fontSize="10" fill="#666" textAnchor="middle">
        {i + 1}
      </SvgText>,
    )
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={LineChartStyle.container}>
        <View style={LineChartStyle.chartContainer}>
          <Svg width={width} height={height}>
            {/* Grid */}
            {gridLines}

            {/* Etiquetas */}
            {yLabels}
            {xLabels}

            {/* Líneas de datos */}
            {processedSeries.map((series) => {
              // Crear path para la línea
              const pathData = series.data
                .map((item, index) => {
                  const x = getX(index)
                  const y = getY(item[valueField] || 0)
                  return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                })
                .join(" ")

              return (
                <React.Fragment key={series.key}>
                  {/* Línea */}
                  <Path
                    d={pathData}
                    stroke={series.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Puntos */}
                  {showPoints &&
                    series.data.map((item, index) => {
                      const x = getX(index)
                      const y = getY(item[valueField] || 0)
                      return (
                        <Circle
                          key={`${series.key}-point-${index}`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={series.color}
                          stroke="white"
                          strokeWidth="2"
                        />
                      )
                    })}
                </React.Fragment>
              )
            })}
          </Svg>
        </View>

        {showLegend && (
          <View style={LineChartStyle.legend}>
            {processedSeries.map((series) => (
              <View key={series.key} style={LineChartStyle.legendItem}>
                <View style={[LineChartStyle.legendColor, { backgroundColor: series.color }]} />
                <Text style={LineChartStyle.legendText} numberOfLines={1}>
                  {series.name.charAt(0).toUpperCase() + series.name.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}


export default LineChart
