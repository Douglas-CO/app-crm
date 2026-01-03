import React from "react";
import { View } from "react-native";
import { NestedTabsSceneStyle } from "./nestedtabsscene.style";

interface NestedTabsSceneProps {
  tabs: React.ReactNode;
  children: React.ReactNode;
  sxContainer?: object;
}

const NestedTabsScene: React.FC<NestedTabsSceneProps> = ({
  tabs,
  children,
  sxContainer,
}) => {
  return (
    <View style={[NestedTabsSceneStyle.container, sxContainer]}>
      {tabs}
      <View style={NestedTabsSceneStyle.content}>{children}</View>
    </View>
  );
};

export default NestedTabsScene;
