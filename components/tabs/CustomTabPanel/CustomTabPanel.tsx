import React from "react";
import { View } from "react-native";
import { CustomTabPanelStyles } from "./customtabpanel.style";

interface CustomTabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  style?: object;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  children,
  index,
  value,
  style,
}) => {
  if (value !== index) {
    return null;
  }

  return (
    <View
      style={[CustomTabPanelStyles.panel, style]}
      accessibilityRole="tab"
      accessibilityLabel={`Tab panel ${index}`}
    >
      {children}
    </View>
  );
};

export default CustomTabPanel;
