import React from "react";
import { Animated, View } from "react-native";
import CustomTableStyle from "./custom-table.styles";

const TableSkeleton = React.memo(() => {
  const styles = CustomTableStyle();
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: 5 }).map((_, index) => (
        <View key={index} style={styles.skeletonRow}>
          {Array.from({ length: 4 }).map((_, cellIndex) => (
            <View key={cellIndex} style={styles.skeletonCell}>
              <Animated.View style={styles.skeletonShimmer} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
});

export default TableSkeleton;
