import { usePaletteStore } from "@/store/usePaletteStore";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

interface CustomScrollViewProps {
  children: React.ReactNode;
}

const CustomScrollView: React.FC<CustomScrollViewProps> = ({ children }) => {
  const { selectedPalette, selectedPaletteName } = usePaletteStore();

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      gap: 20,
      alignItems: "center",
      backgroundColor: selectedPaletteName == 'black_pallete' ? selectedPalette.primary : selectedPalette.additional_third,
      height: "100%",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
