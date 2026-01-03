// app/modules/config/palette.tsx
import { usePaletteStore } from '@/store/usePaletteStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaletteSelector } from './PaletteSelector';

export default function PalettePage() {
    const {  selectedPalette } = usePaletteStore();
    console.log(selectedPalette)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Paleta</Text>
      <PaletteSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});
