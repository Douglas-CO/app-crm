"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { usePaletteStore } from "@/store/usePaletteStore";
import { Ionicons } from "@expo/vector-icons";
import { Controller, type Control, type FieldError } from "react-hook-form";
import { CustomAutoCompleteArrStringStyles } from "./custom-autocomplete.styles";

const { width: screenWidth } = Dimensions.get("window");

export type GridSizeType = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

export type CustomAutocompleteArrStringProps = {
  name: string;
  loadingText?: string;
  label: string;
  disabled?: boolean;
  options: string[];
  optionLabelForEdit?: string;
  isLoadingData: boolean;
  onChangeValue?: (value: any) => void;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  required?: boolean;
  textFieldKey?: string;
  defaultValue?: string | number;
  control: Control<any, any>;
  size?: GridSizeType;
  disableClearable?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholder?: string;
};

const CustomAutocompleteArrString: React.FC<
  CustomAutocompleteArrStringProps
> = ({
  name,
  options,
  isLoadingData,
  error,
  textFieldKey,
  defaultValue,
  control,
  loadingText = "Cargando...",
  helperText,
  required = true,
  label,
  onChangeValue,
  disabled = false,
  disableClearable = false,
  containerStyle,
  inputStyle,
  placeholder,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<View>(null);
  const [inputLayout, setInputLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const { selectedPalette } = usePaletteStore();
  const styles = CustomAutoCompleteArrStringStyles();

  // Actualizar opciones cuando cambien
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Medir posición del input cuando se muestre el dropdown
  const measureInputPosition = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setInputLayout({ x, y, width, height });
      });
    }
  };

  useEffect(() => {
    if (showOptions) {
      setTimeout(measureInputPosition, 10); // pequeña pausa para asegurar layout
    }
  }, [showOptions]);

  // ** NUEVO: sincronizar inputValue con defaultValue convertido a string **
  useEffect(() => {
    setInputValue(
      defaultValue !== undefined && defaultValue !== null
        ? String(defaultValue)
        : ""
    );
  }, [defaultValue]);

  const CustomFormLabel: React.FC<{
    children: React.ReactNode;
    required?: boolean;
    style?: TextStyle;
  }> = ({ children, required, style }) => (
    <Text style={[styles.label, style]}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Controller
        name={name}
        control={control}
        key={textFieldKey || defaultValue?.toString()}
        defaultValue={defaultValue || ""}
        render={({ field }) => {
          const handleClear = () => {
            setInputValue("");
            field.onChange("");
            onChangeValue?.("");
            setShowOptions(false);
          };

          return (
            <>
              <CustomFormLabel required={required}>{label}</CustomFormLabel>

              <View style={styles.inputContainer}>
                <TouchableOpacity
                  ref={inputRef}
                  style={[
                    styles.textInput,
                    error && styles.textInputError,
                    disabled && styles.textInputDisabled,
                    //inputStyle,
                    { justifyContent: "center" },
                  ]}
                  onPress={() => !disabled && setShowOptions(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      color: inputValue
                        ? selectedPalette.additional_third
                        : selectedPalette.additional_first,
                      fontSize: 16,
                    }}
                  >
                    {inputValue ||
                      placeholder ||
                      `Seleccionar ${label.toLowerCase()}`}
                  </Text>
                </TouchableOpacity>

                <View style={styles.inputActions}>
                  {isLoadingData && (
                    <ActivityIndicator
                      size="small"
                      color="#2196F3"
                      style={styles.loadingIcon}
                    />
                  )}

                  {!disableClearable && inputValue && !disabled && (
                    <TouchableOpacity
                      onPress={handleClear}
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => !disabled && setShowOptions(!showOptions)}
                    style={styles.dropdownButton}
                  >
                    <Ionicons
                      name={showOptions ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={disabled ? "#ccc" : "#666"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {error && <Text style={styles.errorText}>{error.message}</Text>}

              {helperText && (
                <Text style={styles.helperText}>{helperText}</Text>
              )}

              <Modal
                visible={showOptions && !disabled}
                transparent
                animationType="fade"
                onRequestClose={() => setShowOptions(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowOptions(false)}
                >
                  <View
                    style={[
                      styles.optionsContainer,
                      {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: [
                          {
                            translateX:
                              -(inputLayout.width || screenWidth - 40) / 2,
                          },
                          { translateY: -50 }, // Ajusta según la altura real del contenedor
                        ],
                        width: inputLayout.width || screenWidth - 40,
                      },
                    ]}
                  >
                    {isLoadingData ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={selectedPalette.additional_third} />
                        <Text style={styles.loadingText}>{loadingText}</Text>
                      </View>
                    ) : filteredOptions.length > 0 ? (
                      <FlatList
                        data={filteredOptions}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => {
                              setInputValue(item);
                              field.onChange(item);
                              onChangeValue?.(item);
                              setShowOptions(false);
                            }}
                          >
                            <Text style={styles.optionText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        style={styles.optionsList}
                        showsVerticalScrollIndicator={false}
                      />
                    ) : (
                      <View style={styles.noOptionsContainer}>
                        <Text style={styles.noOptionsText}>
                          No hay opciones disponibles
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          );
        }}
      />
    </View>
  );
};

export default CustomAutocompleteArrString;
