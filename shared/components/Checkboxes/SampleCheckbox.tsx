import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import {
    Text,
    TouchableOpacity,
    View,
    type ViewStyle
} from "react-native";

import { SampleCheckBoxStyles } from "./sample-checkbox.styles";

export interface SampleCheckboxProps {
  label: string;
  isState?: boolean;
  onChangeValue?: (value?: boolean) => void;
  style?: ViewStyle;
  control: Control<any, any>;
  name: string;
  defaultValue: boolean;
  textFieldKey?: string;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  disabled?: boolean;
  onClickDisabled?: () => void;
  flexDirection?: "row" | "column";
  customHelperText?: string;
  checkboxSize?: number;
  primaryColor?: string;
  disabledColor?: string;
}

const SampleCheckbox: React.FC<SampleCheckboxProps> = ({
  label,
  name,
  onChangeValue,
  control,
  defaultValue,
  style,
  textFieldKey,
  justifyContent = "flex-start",
  alignItems = "center",
  isState = false,
  disabled = false,
  onClickDisabled,
  flexDirection = "row",
  customHelperText,
  checkboxSize = 24,
  primaryColor = "#2196F3",
  disabledColor = "#CCCCCC",
}) => {
  return (
    <View
      style={[
        SampleCheckBoxStyles.container,
        {
          justifyContent,
          alignItems,
          flexDirection,
        },
        style,
      ]}
    >
      <Controller
        name={name}
        control={control}
        key={textFieldKey || defaultValue.toString()}
        render={({ field }) => {
          const handlePress = () => {
            if (disabled) {
              onClickDisabled && onClickDisabled();
              return;
            }
            const newValue = !field.value;
            onChangeValue && onChangeValue(newValue);
            field.onChange(newValue);
          };

          const isChecked = field.value || false;
          const displayLabel = isState
            ? isChecked
              ? "Activo"
              : "Inactivo"
            : label;

          return (
            <>
              <TouchableOpacity
                style={[
                  SampleCheckBoxStyles.checkboxContainer,
                  flexDirection === "column" && SampleCheckBoxStyles.columnContainer,
                ]}
                onPress={handlePress}
                disabled={disabled}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    SampleCheckBoxStyles.checkbox,
                    {
                      width: checkboxSize,
                      height: checkboxSize,
                      borderColor:
                        disabled && !isChecked ? disabledColor : primaryColor,
                      backgroundColor: isChecked ? primaryColor : "transparent",
                    },
                    disabled && SampleCheckBoxStyles.disabledCheckbox,
                  ]}
                >
                  {isChecked && (
                    <Ionicons
                      name="checkmark"
                      size={checkboxSize * 0.7}
                      color="white"
                    />
                  )}
                </View>
                <Text
                  style={[
                    SampleCheckBoxStyles.label,
                    disabled && SampleCheckBoxStyles.disabledLabel,
                    flexDirection === "column" && SampleCheckBoxStyles.columnLabel,
                  ]}
                >
                  {displayLabel}
                </Text>
              </TouchableOpacity>
              {customHelperText && (
                <Text style={SampleCheckBoxStyles.helperText}>{customHelperText}</Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};


export default SampleCheckbox;
