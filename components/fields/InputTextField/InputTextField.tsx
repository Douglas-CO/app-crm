"use client";

import { usePaletteStore } from "@/store/usePaletteStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { inputTextFieldStyles } from "./inputtextfield.style";

interface InputTextFieldProps extends TextInputProps {
  label?: string;
  name: string;
  control: Control<any>;
  error?: string;
  helperText?: string;
  onNumber?: boolean;
  onSearch?: boolean;
  onClear?: () => void;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  label,
  name,
  control,
  error,
  helperText,
  style,
  onNumber,
  onSearch,
  onClear,
  ...rest
}) => {
  const helperTextToShow = helperText ?? error ?? "";
  const { selectedPalette } = usePaletteStore();
  const styles = inputTextFieldStyles();

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={(styles.label, { color: selectedPalette.additional_third })}
        >
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {onSearch && (
          <Ionicons
            name="search-outline"
            size={20}
            color={selectedPalette.additional_third}
            style={styles.searchIcon}
          />
        )}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                onSearch && styles.inputWithIcon,
                {
                  backgroundColor: selectedPalette.secondary_first,
                  borderColor: selectedPalette.secondary_first,
                  color: selectedPalette.additional_third,
                },
                style,
                error && styles.inputError,
              ]}
              placeholderTextColor={selectedPalette.additional_third}
              onChangeText={(text) => {
                if (onNumber) {
                  // Solo para campos numéricos
                  const numericValue = text.replace(/[^0-9.]/g, "");
                  const parts = numericValue.split(".");
                  if (parts.length > 2) return;
                  onChange(numericValue);
                } else {
                  // Para campos de texto normal
                  onChange(text);
                }
              }}
              onBlur={onBlur}
              // Aquí está el cambio principal:
              value={
                value !== undefined && value !== null ? value.toString() : ""
              }
              keyboardType={onNumber ? "decimal-pad" : rest.keyboardType}
              {...rest}
            />
          )}
        />

        {onSearch && onClear && (
          <Controller
            control={control}
            name={name}
            render={({ field: { value } }) =>
              value &&
              value.length > 0 && (
                <TouchableOpacity onPress={onClear} style={styles.clearButton}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={selectedPalette.tertiary_third}
                  />
                </TouchableOpacity>
              )
            }
          />
        )}
      </View>

      {!!helperTextToShow && (
        <Text style={[error ? styles.errorText : styles.helperText]}>
          {helperTextToShow}
        </Text>
      )}
    </View>
  );
};

export default InputTextField;
