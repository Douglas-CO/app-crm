import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { TabStyle } from "./tab.style"

interface TabProps {
  label: string
  value: number
  isActive?: boolean
  onPress?: () => void
  activeColor?: string
  inactiveColor?: string
}

const Tab: React.FC<TabProps> = ({
  label,
  value,
  isActive = false,
  onPress,
  activeColor = "#007AFF",
  inactiveColor = "#8E8E93",
}) => {
  return (
    <TouchableOpacity
      style={[TabStyle.tab, isActive && TabStyle.activeTab]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`${label} tab`}
    >
      <Text
        style={[
          TabStyle.tabText,
          {
            color: isActive ? activeColor : inactiveColor,
            fontWeight: isActive ? "600" : "400",
          },
        ]}
      >
        {label}
      </Text>
      {isActive && (
        <View style={[TabStyle.activeIndicator, { backgroundColor: activeColor }]} />
      )}
    </TouchableOpacity>
  )
}

export default Tab
