import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { Text, TouchableOpacity, View } from "react-native";
import CustomTableStyle from "./custom-table.styles";

export interface RenderPaginationProps<T extends Record<string, any>> {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  pageSizeOptions: number[];
  onPaging: (pagination: { pageIndex: number; pageSize: number }) => void;
  currentPage: number;
  totalPages: number;
  rowCount: number;
}

function RenderPagination<T extends Record<string, any>>({
  pagination,
  onPaging,
  totalPages,
  rowCount,
}: RenderPaginationProps<T>) {
  //const [showPageSizeSelector, setShowPageSizeSelector] = useState(false);
  const styles = CustomTableStyle();
  
  return (
    <View style={styles.paginationContainer}>
      {/**
      <View style={styles.paginationLeft}>
        <TouchableOpacity
          style={styles.pageSizeButton}
          onPress={() => setShowPageSizeSelector(!showPageSizeSelector)}
        >
          <Text style={styles.pageSizeText}>
            {pagination.pageSize} por página
          </Text>
          <Ionicons name="chevron-down" size={16} color="#007AFF" />
        </TouchableOpacity>
        {showPageSizeSelector && (
          <View style={styles.pageSizeDropdown}>
            {pageSizeOptions.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.pageSizeOption,
                  size === pagination.pageSize &&
                    styles.selectedPageSize,
                ]}
                onPress={() => {
                  onPaging({ pageIndex: 0, pageSize: size });
                  setShowPageSizeSelector(false);
                }}
              >
                <Text style={styles.pageSizeOptionText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
        */}

      <View style={styles.paginationCenter}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            pagination.pageIndex === 0 && styles.disabledButton,
          ]}
          onPress={() => onPaging({ ...pagination, pageIndex: 0 })}
          disabled={pagination.pageIndex === 0}
          accessibilityLabel="Primera página"
        >
          <Ionicons
            name="play-back"
            size={13}
            color={pagination.pageIndex === 0 ? "#ccc" : "#007AFF"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paginationButton,
            pagination.pageIndex === 0 && styles.disabledButton,
          ]}
          onPress={() =>
            onPaging({ ...pagination, pageIndex: pagination.pageIndex - 1 })
          }
          disabled={pagination.pageIndex === 0}
          accessibilityLabel="Página anterior"
        >
          <Ionicons
            name="chevron-back"
            size={13}
            color={pagination.pageIndex === 0 ? "#ccc" : "#007AFF"}
          />
        </TouchableOpacity>

        {/**
 
        <Text style={styles.paginationText}>
          Página {currentPage} de {totalPages}
        </Text>
          */}

        <TouchableOpacity
          style={[
            styles.paginationButton,
            pagination.pageIndex >= totalPages - 1 &&
              styles.disabledButton,
          ]}
          onPress={() =>
            onPaging({ ...pagination, pageIndex: pagination.pageIndex + 1 })
          }
          disabled={pagination.pageIndex >= totalPages - 1}
          accessibilityLabel="Página siguiente"
        >
          <Ionicons
            name="chevron-forward"
            size={13}
            color={pagination.pageIndex >= totalPages - 1 ? "#ccc" : "#007AFF"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paginationButton,
            pagination.pageIndex >= totalPages - 1 &&
              styles.disabledButton,
          ]}
          onPress={() => onPaging({ ...pagination, pageIndex: totalPages - 1 })}
          disabled={pagination.pageIndex >= totalPages - 1}
          accessibilityLabel="Última página"
        >
          <Ionicons
            name="play-forward"
            size={13}
            color={pagination.pageIndex >= totalPages - 1 ? "#ccc" : "#007AFF"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.paginationRight}>
        <Text style={styles.totalText}>
          {Math.min(pagination.pageIndex * pagination.pageSize + 1, rowCount)}-
          {Math.min((pagination.pageIndex + 1) * pagination.pageSize, rowCount)}{" "}
          de {rowCount}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(RenderPagination) as typeof RenderPagination;
