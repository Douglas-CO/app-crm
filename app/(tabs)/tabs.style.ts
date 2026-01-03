// LayoutStyles.ts
import { usePaletteStore } from "@/store/usePaletteStore";
import { StyleSheet } from "react-native";

export const useLayoutStyles = () => {
  const { selectedPalette } = usePaletteStore();

  return StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: selectedPalette.primary,
    },
    drawerHeader: {
      backgroundColor: selectedPalette.primary,
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    drawerTitle: {
      color: selectedPalette.additional_third,
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: selectedPalette.primary,
      borderBottomWidth: 1,
      borderBottomColor: selectedPalette.secondary_first,
    },
    modulesList: {
      flex: 1,
      backgroundColor: selectedPalette.primary,
    },
    moduleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: selectedPalette.secondary_third,
    },
    activeModuleItem: {
      backgroundColor: selectedPalette.secondary_first,
      borderRightWidth: 3,
      borderRightColor: selectedPalette.primary,
    },
    moduleText: {
      marginLeft: 15,
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    activeModuleText: {
      color: selectedPalette.additional_second,
      fontWeight: '600',
    },
    activeModuleText2: {
      color: selectedPalette.additional_first,
      fontWeight: '600',
    },
    noResultsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    noResultsText: {
      fontSize: 16,
      color: selectedPalette.additional_third,
      textAlign: 'center',
      marginTop: 16,
      paddingHorizontal: 20,
    },
    drawerFooter: {
      borderTopWidth: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderColor: selectedPalette.secondary_first,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: selectedPalette.additional_third,
    },
  });
};
