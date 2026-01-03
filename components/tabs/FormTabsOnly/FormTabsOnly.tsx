import { usePaletteStore } from "@/store/usePaletteStore";
import React from "react";
import { ScrollView, View } from "react-native";

interface TabChildProps {
  value: number;
  onPress?: () => void;
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

interface FormTabsOnlyProps {
  value: number;
  onChange: (value: number) => void;
  children: React.ReactElement<TabChildProps>[];
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

export const FormTabsOnly: React.FC<FormTabsOnlyProps> = ({
  value,
  onChange,
  children,
  activeColor,
  inactiveColor,
  backgroundColor,
}) => {
  const { selectedPalette } = usePaletteStore();
  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: selectedPalette.secondary_second,
        },
        { backgroundColor: backgroundColor ?? selectedPalette.primary },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: selectedPalette.secondary_second,
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabChildProps>(child)) {
            return React.cloneElement(child, {
              isActive: child.props.value === value,
              onPress: () => onChange(child.props.value),
              activeColor: activeColor ?? selectedPalette.additional_third,
              inactiveColor: inactiveColor ?? selectedPalette.additional_first,
            });
          }
          return child;
        })}
      </ScrollView>
    </View>
  );
};
