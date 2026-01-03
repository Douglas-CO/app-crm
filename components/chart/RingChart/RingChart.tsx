import { usePaletteStore } from "@/store/usePaletteStore";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";
import { RingChartStyle } from "./ringchart.style";

interface DataItem {
  id: number;
  nombre: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface RingChartProps {
  data: DataItem[];
  valueField: string;
  size?: number;
  innerRadius?: number; // porcentaje (0-1)
  showLabels?: boolean;
  showLegend?: boolean;
  showCenterText?: boolean;
  centerText?: string;
  centerSubtext?: string;
}

const RingChart: React.FC<RingChartProps> = ({
  data,
  valueField,
  size = 200,
  innerRadius = 0.5,
  showLabels = true,
  showLegend = true,
  showCenterText = true,
  centerText,
  centerSubtext,
}) => {
  const total = data.reduce(
    (sum, item) => sum + (Number(item[valueField]) || 0),
    0
  );
  const { selectedPalette, selectedPaletteName } = usePaletteStore();
  const createRingArcPath = (
    centerX: number,
    centerY: number,
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const polarToCartesian = (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number
    ) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const outerStart = polarToCartesian(
      centerX,
      centerY,
      outerRadius,
      endAngle
    );
    const outerEnd = polarToCartesian(
      centerX,
      centerY,
      outerRadius,
      startAngle
    );
    const innerStart = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      endAngle
    );
    const innerEnd = polarToCartesian(
      centerX,
      centerY,
      innerRadius,
      startAngle
    );

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      outerStart.x,
      outerStart.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      outerEnd.x,
      outerEnd.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ");
  };

  const outerRadius = size / 2 - 10;
  const innerRadiusValue = outerRadius * innerRadius;
  const centerX = size / 2;
  const centerY = size / 2;

  const defaultCenterText = centerText || `${total}`;
  const defaultCenterSubtext = centerSubtext || "Total";

  // 🔒 Protección contra datos vacíos o total 0
  if (!data.length || total === 0) {
    return (
      <View style={RingChartStyle.container}>
        <Text style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
          Sin datos disponibles
        </Text>
      </View>
    );
  }

  let currentAngle = 0;

  return (
    <View style={RingChartStyle.container}>
      <View style={RingChartStyle.chartContainer}>
        <Svg width={size} height={size}>
          {/* Círculo de fondo */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={outerRadius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="1"
          />

          {data.map((item) => {
            const value = Number(item[valueField] || 0);
            const angle = (value / total) * 360;
            const path = createRingArcPath(
              centerX,
              centerY,
              outerRadius,
              innerRadiusValue,
              currentAngle,
              currentAngle + angle
            );

            const labelAngle = currentAngle + angle / 2;
            const labelRadius = (outerRadius + innerRadiusValue) / 2;
            const angleInRadians = ((labelAngle - 90) * Math.PI) / 180.0;
            const labelX = centerX + labelRadius * Math.cos(angleInRadians);
            const labelY = centerY + labelRadius * Math.sin(angleInRadians);

            currentAngle += angle;

            return (
              <React.Fragment key={item.id}>
                <Path
                  d={path}
                  fill={item.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {showLabels && angle > 30 && (
                  <SvgText
                    x={labelX}
                    y={labelY}
                    fontSize="11"
                    fill="#333"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontWeight="600"
                  >
                    {`${((value / total) * 100).toFixed(1)}%`}
                  </SvgText>
                )}
              </React.Fragment>
            );
          })}

          {showCenterText && (
            <>
              <SvgText
                x={centerX}
                y={centerY - 8}
                fontSize="20"
                fill="#333"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontWeight="bold"
              >
                {defaultCenterText}
              </SvgText>
              <SvgText
                x={centerX}
                y={centerY + 12}
                fontSize="12"
                fill="#666"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {defaultCenterSubtext}
              </SvgText>
            </>
          )}
        </Svg>
      </View>

      {showLegend && (
        <View style={RingChartStyle.legend}>
          {data.map((item) => (
            <View key={item.id} style={RingChartStyle.legendItem}>
              <View
                style={[
                  RingChartStyle.legendColor,
                  { backgroundColor: item.color || "#ccc" },
                ]}
              />
              <Text
                style={[
                  RingChartStyle.legendText,
                  {
                    color:
                      selectedPaletteName === "black_pallete" ?
                       selectedPalette.additional_third
                        : selectedPalette.primary, 
                  },
                ]}
              >
                {item.nombre}: {item.value} (
                {((item[valueField] / total) * 100).toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default RingChart;
