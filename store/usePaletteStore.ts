import { palette } from '@/components'; // asegúrate de que esto es válido
import { create } from 'zustand';

type PaletteName = keyof typeof palette;

interface PaletteStore {
  selectedPaletteName: PaletteName;
  selectedPalette: typeof palette[PaletteName];
  setPalette: (name: PaletteName) => void;
}

export const usePaletteStore = create<PaletteStore>((set) => {
  const defaultPaletteName: PaletteName = 'blue_palette';

  return {
    selectedPaletteName: defaultPaletteName,
    selectedPalette: palette?.[defaultPaletteName] ?? {
        "primary": "#007BFF",
        "secondary_first": "#0056b3",
        "secondary_second": "#3399FF",
        "secondary_third": "#66B2FF",
        "tertiary_first": "#003f7f",
        "tertiary_second": "#80ccff",
        "tertiary_third": "#cce6ff",
        "additional_first": "#E6F0FA",
        "additional_second": "#D0E7FF",
        "additional_third": "#B3D7FF",
    },
    setPalette: (name: PaletteName) =>
      set(() => ({
        selectedPaletteName: name,
        selectedPalette: palette?.[name] ?? palette['blue_palette'],
      })),
  };
});
