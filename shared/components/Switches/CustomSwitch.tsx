import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity, View, type ViewStyle } from "react-native"
import { CustomSwitchStyles } from "./custom-switch.styles"

export type CustomSwitchProps = {
  title?: string
  checked: boolean
  disabled?: boolean
  onChangeChecked: (value: boolean) => void
  containerStyle?: ViewStyle
  isSimpleBoolean?: boolean
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  disabled = false,
  onChangeChecked,
  containerStyle,
  isSimpleBoolean = false,
}) => {
  const handleActivePress = () => {
    if (disabled || checked) return
    onChangeChecked(true)
  }

  const handleInactivePress = () => {
    if (disabled || !checked) return
    onChangeChecked(false)
  }

  return (
    <View style={[CustomSwitchStyles.container, containerStyle]}>
      <View style={CustomSwitchStyles.switchContainer}>
        {/* Botón Activo */}
        <TouchableOpacity
          style={[
            CustomSwitchStyles.toggleButton,
            checked ? CustomSwitchStyles.activeSelected : CustomSwitchStyles.activeUnselected,
            disabled && CustomSwitchStyles.disabled,
          ]}
          onPress={handleActivePress}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark" size={20} color={checked ? "#fff" : "#4CAF50"} />
        </TouchableOpacity>

        <View style={CustomSwitchStyles.spacer} />

        {/* Botón Inactivo */}
        <TouchableOpacity
          style={[
            CustomSwitchStyles.toggleButton,
            !checked ? CustomSwitchStyles.inactiveSelected : CustomSwitchStyles.inactiveUnselected,
            disabled && CustomSwitchStyles.disabled,
          ]}
          onPress={handleInactivePress}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={20} color={!checked ? "#fff" : "#f44336"} />
        </TouchableOpacity>

        <View style={CustomSwitchStyles.spacer} />
      </View>
    </View>
  )
}


export default CustomSwitch
