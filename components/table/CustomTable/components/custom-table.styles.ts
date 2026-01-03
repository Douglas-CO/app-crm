import { usePaletteStore } from "@/store/usePaletteStore";
import { Platform, StyleSheet } from "react-native";

const CustomTableStyle = () => {
  const { selectedPalette } = usePaletteStore();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignSelf: "center",
    },
    headerContainer: {
      backgroundColor: selectedPalette.primary,
      borderBottomWidth: 1,
      borderBottomColor: selectedPalette.primary,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      margin: 16,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      paddingHorizontal: 12,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    clearButton: {
      padding: 4,
    },
    topToolbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    toolbarLeft: {
      flex: 1,
    },
    toolbarRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    toolbarButton: {
      padding: 8,
      marginLeft: 8,
      borderRadius: 6,
    },
    activeButton: {
      backgroundColor: selectedPalette.secondary_second,
    },
    totalText: {
      fontSize: 14,
      fontWeight: "600",
      color: selectedPalette.additional_third,
    },
    filtersContainer: {
      paddingVertical: 10,
      backgroundColor: selectedPalette.primary,
    },
    filtersRow: {
      flexDirection: "row",
      paddingVertical: 8,
    },
    columnFilter: {
      marginRight: 16,
      minWidth: 120,
      marginLeft: 16,
    },
    filterLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: selectedPalette.additional_third,
      marginBottom: 4,
    },
    filterInput: {
      height: 45,
      backgroundColor: selectedPalette.secondary_first,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: selectedPalette.secondary_first,
      paddingHorizontal: 12,
      fontSize: 14,
    },
    tableContainer: {
      alignSelf: "center",
      maxWidth: "100%",
      // Removido flex: 1 de aquí ya que se maneja dinámicamente
    },
    horizontalScrollContainer: {
      flex: 1,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: selectedPalette.secondary_second,
      borderBottomWidth: 2,
      borderBottomColor: selectedPalette.secondary_first,
    },
    stickyHeader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    selectionHeaderCell: {
      width: 50,
      minWidth: 50,
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRightWidth: 1,
      borderRightColor: selectedPalette.primary,
    },
    headerCell: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      minHeight: 48,
      borderRightWidth: 1,
      borderRightColor: selectedPalette.primary,
    },
    headerText: {
      fontSize: 14,
      fontWeight: "600",
      color: selectedPalette.additional_third,
      textTransform: "capitalize",
      flex: 1,
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: selectedPalette.primary,
      minHeight: 48,
    },
    evenRow: {
      backgroundColor: selectedPalette.secondary_third,
    },
    oddRow: {
      backgroundColor: selectedPalette.secondary_second,
    },
    selectedRow: {
      backgroundColor: "#661d0bff",
    },
    selectionCell: {
      width: 50,
      minWidth: 50,
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRightWidth: 1,
      borderRightColor: selectedPalette.primary,
    },
    cell: {
      padding: 12,
      justifyContent: "center",
      borderRightWidth: 1,
      borderRightColor: selectedPalette.primary,
    },
    cellText: {
      fontSize: 14,
      color: selectedPalette.additional_third,
    },
    actionsCell: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      borderRightWidth: 1,
      borderRightColor: selectedPalette.primary,
    },
    actionButton: {
      padding: 8,
      marginHorizontal: 4,
      borderRadius: 4,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: selectedPalette.secondary_second,
      borderTopWidth: 1,
      borderTopColor: selectedPalette.primary,
    },
    paginationLeft: {
      flex: 1,
      position: "relative",
    },
    paginationCenter: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    paginationRight: {
      flex: 1,
      alignItems: "flex-end",
    },
    pageSizeButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      backgroundColor: "#fff",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    pageSizeText: {
      fontSize: 14,
      color: selectedPalette.additional_third,
      marginRight: 4,
    },
    pageSizeDropdown: {
      position: "absolute",
      top: 40,
      left: 0,
      backgroundColor: "#fff",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#ddd",
      zIndex: 1000,
      minWidth: 120,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    pageSizeOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    selectedPageSize: {
      backgroundColor: "#e3f2fd",
    },
    pageSizeOptionText: {
      fontSize: 14,
      color: "#495057",
    },
    paginationButton: {
      padding: 8,
      marginHorizontal: 4,
      borderRadius: 4,
    },
    disabledButton: {
      opacity: 0.5,
    },
    paginationText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#495057",
      marginHorizontal: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: "#666",
    },
    emptyContainer: {
      padding: 32,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginTop: 16,
    },
    clearFiltersButton: {
      marginTop: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#007AFF",
      borderRadius: 6,
    },
    clearFiltersText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#FF3B30",
      marginTop: 16,
      textAlign: "center",
    },
    errorMessage: {
      fontSize: 14,
      color: "#666",
      marginTop: 8,
      textAlign: "center",
    },
    retryButton: {
      marginTop: 16,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#007AFF",
      borderRadius: 6,
    },
    retryButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    },
    // Skeleton styles
    skeletonContainer: {
      flex: 1,
      padding: 16,
    },
    skeletonRow: {
      flexDirection: "row",
      marginBottom: 12,
    },
    skeletonCell: {
      flex: 1,
      height: 20,
      backgroundColor: "#f0f0f0",
      marginRight: 12,
      borderRadius: 4,
      overflow: "hidden",
    },
    skeletonShimmer: {
      flex: 1,
      backgroundColor: "#e0e0e0",
    },
  });
};

export default CustomTableStyle;
