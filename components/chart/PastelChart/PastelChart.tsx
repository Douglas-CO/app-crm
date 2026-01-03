import React from "react";
import { Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { PastelChartStyle } from "./pastelchart.style";

interface DataItem {
  id: number
  nombre: string
  [key: string]: any
}

interface PastelChartProps {
  data: DataItem[]
  valueField: string 
  size?: number
  showLabels?: boolean
  showLegend?: boolean
}

const PastelChart: React.FC<PastelChartProps> = ({
  data,
  valueField,
  size = 200,
  showLabels = true,
  showLegend = true,
}) => {
  const pastelColors = [
    "#FFB3BA", // Rosa pastel
    "#BAFFC9", // Verde pastel
    "#BAE1FF", // Azul pastel
    "#FFFFBA", // Amarillo pastel
    "#FFDFBA", // Naranja pastel
    "#E0BBE4", // Púrpura pastel
    "#C7CEEA", // Lavanda pastel
    "#FFDAC1", // Durazno pastel
  ]

  // Calcular el total
  const total = data.reduce((sum, item) => sum + (item[valueField] || 0), 0)

  // Calcular porcentajes y crear datos procesados
  const processedData = data.map((item, index) => {
    const value = item[valueField] || 0
    const percentage = total > 0 ? (value / total) * 100 : 0
    return {
      ...item,
      value,
      percentage,
      color: pastelColors[index % pastelColors.length],
    }
  })

  // Función para crear el path del arco
  const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle)
    const end = polarToCartesian(centerX, centerY, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    return [
      "M",
      centerX,
      centerY,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  const radius = size / 2 - 10
  const centerX = size / 2
  const centerY = size / 2

  let currentAngle = 0

  return (
    <View style={PastelChartStyle.container}>
      <View style={PastelChartStyle.chartContainer}>
        <Svg width={size} height={size}>
          {processedData.map((item, index) => {
            const angle = (item.percentage / 100) * 360
            const path = createArcPath(centerX, centerY, radius, currentAngle, currentAngle + angle)

            const labelAngle = currentAngle + angle / 2
            const labelRadius = radius * 0.7
            const labelPosition = polarToCartesian(centerX, centerY, labelRadius, labelAngle)

            currentAngle += angle

            return (
              <React.Fragment key={item.id}>
                <Path d={path} fill={item.color} stroke="#fff" strokeWidth="2" />
                {showLabels && item.percentage > 5 && (
                  <SvgText
                    x={labelPosition.x}
                    y={labelPosition.y}
                    fontSize="12"
                    fill="#333"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {`${item.percentage.toFixed(1)}%`}
                  </SvgText>
                )}
              </React.Fragment>
            )
          })}
        </Svg>
      </View>

      {showLegend && (
        <View style={PastelChartStyle.legend}>
          {processedData.map((item) => (
            <View key={item.id} style={PastelChartStyle.legendItem}>
              <View style={[PastelChartStyle.legendColor, { backgroundColor: item.color }]} />
              <Text style={PastelChartStyle.legendText}>
                {item.nombre}: {item.value} ({item.percentage.toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}


export default PastelChart
