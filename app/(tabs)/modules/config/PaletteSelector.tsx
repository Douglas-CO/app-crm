"use client"

import { palette } from "@/components"
import { usePaletteStore } from "@/store/usePaletteStore"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import React, { useEffect, useRef, useState } from "react"
import { Animated, Dimensions, FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

export const PaletteSelector = () => {
  const { selectedPaletteName, setPalette, selectedPalette } = usePaletteStore()
  const [showOptions, setShowOptions] = useState(false)
  const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const inputRef = useRef<View>(null)

  // Animaciones
  const scaleAnim = useRef(new Animated.Value(1)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(-20)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const paletteKeys = Object.keys(palette)

  useEffect(() => {
    if (showOptions) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()

      setTimeout(() => {
        inputRef.current?.measureInWindow((x, y, width, height) => {
          setInputLayout({ x, y, width, height })
        })
      }, 10)
    } else {
      // Animación de salida
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [showOptions])

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const renderPalettePreview = (paletteName: string) => {
    const paletteColors = palette[paletteName as keyof typeof palette]
    if (!paletteColors) return null

    return (
      <View style={styles.palettePreview}>
        <View style={[styles.colorDot, { backgroundColor: paletteColors.primary }]} />
        <View style={[styles.colorDot, { backgroundColor: paletteColors.secondary_first }]} />
        <View style={[styles.colorDot, { backgroundColor: paletteColors.additional_first }]} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona una paleta</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          ref={inputRef}
          style={[styles.selector, selectedPaletteName && styles.selectorSelected]}
          onPress={() => setShowOptions(true)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <View style={styles.selectorContent}>
            <View style={styles.selectorLeft}>
              {selectedPaletteName && renderPalettePreview(selectedPaletteName)}
              <Text
                style={[
                  styles.selectorText,
                  selectedPaletteName ? styles.selectorTextSelected : styles.selectorTextPlaceholder,
                ]}
              >
                {selectedPaletteName || "Selecciona una paleta"}
              </Text>
            </View>

            <Animated.View style={[styles.chevronContainer, { transform: [{ rotate: rotateInterpolate }] }]}>
              <Ionicons
                name="chevron-down"
                size={20}
                color={selectedPaletteName ? selectedPalette.primary : "#9CA3AF"}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={showOptions}
        transparent
        animationType="none"
        onRequestClose={() => setShowOptions(false)}
        statusBarTranslucent
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => setShowOptions(false)}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.optionsContainer,
              {
                transform: [{ translateY: slideAnim }, { scale: fadeAnim }],
                opacity: fadeAnim,
                top: inputLayout.y + inputLayout.height + 8,
                left: inputLayout.x,
                width: inputLayout.width || screenWidth - 40,
              },
            ]}
          >
            <View style={styles.optionsHeader}>
              <Text style={styles.optionsTitle}>Paletas disponibles</Text>
            </View>

            <FlatList
              data={paletteKeys}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedPaletteName === item && styles.optionItemSelected,
                    index === paletteKeys.length - 1 && styles.optionItemLast,
                  ]}
                  onPress={() => {
                    setPalette(item as keyof typeof palette)
                    setShowOptions(false)
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionContent}>
                    {renderPalettePreview(item)}
                    <Text style={[styles.optionText, selectedPaletteName === item && styles.optionTextSelected]}>
                      {item}
                    </Text>
                  </View>

                  {selectedPaletteName === item && (
                    <Ionicons name="checkmark-circle" size={20} color={selectedPalette.primary} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
  selector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectorSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#F8FAFC",
  },
  selectorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectorTextSelected: {
    color: "#1F2937",
  },
  selectorTextPlaceholder: {
    color: "#9CA3AF",
  },
  chevronContainer: {
    padding: 4,
  },
  palettePreview: {
    flexDirection: "row",
    marginRight: 12,
    alignItems: "center",
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalBackground: {
    flex: 1,
  },
  optionsContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    maxHeight: screenHeight * 0.4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  optionsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  optionsList: {
    maxHeight: screenHeight * 0.3,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  optionItemSelected: {
    backgroundColor: "#F0F9FF",
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  optionTextSelected: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
})
