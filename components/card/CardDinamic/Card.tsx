import { Button } from "@/components/button";
import { usePaletteStore } from "@/store/usePaletteStore";
import React from "react";
import {
  Image,
  Text,
  View,
  type ImageSourcePropType,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { CardStyle } from "./card.style";

interface ButtonConfig {
  title: string;
  style: "success" | "secondary" | "danger" | "primary";
  onPress: () => void;
  disabled?: boolean;
}

interface CardProps {
  title?: string;
  description?: string;
  imageSource?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  body?: React.ReactNode; // Nueva prop para el contenido del body
  bodyStyle?: ViewStyle; // Estilo personalizable para el body
  buttons?: ButtonConfig[];
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  showShadow?: boolean;
  borderRadius?: number;
  children?: React.ReactNode; // Mantener children para retrocompatibilidad
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSource,
  imageStyle,
  body,
  bodyStyle,
  buttons = [],
  titleStyle,
  descriptionStyle,
  showShadow = true,
  borderRadius = 12,
  children,
}) => {
  const stylecard = CardStyle();
  const { selectedPalette, selectedPaletteName } = usePaletteStore();
  // Función para mapear los estilos a colores
  const getButtonColor = (style: ButtonConfig["style"]): string => {
    switch (style) {
      case "primary":
        return "#007bff";
      case "success":
        return "#28a745";
      case "danger":
        return "#dc3545";
      case "secondary":
        return "#6c757d";
      default:
        return "#007bff";
    }
  };

  return (
    <View
      style={[
        stylecard.card,
        showShadow && stylecard.shadow,
        {
          borderRadius,
          backgroundColor:
            selectedPaletteName == "black_pallete"
              ? selectedPalette.secondary_first
              : "white",
        },
      ]}
    >
      {/* Header con imagen opcional */}
      {imageSource && (
        <Image
          source={imageSource}
          style={[stylecard.image, imageStyle]}
          borderTopLeftRadius={borderRadius}
          borderTopRightRadius={borderRadius}
        />
      )}

      <View style={stylecard.content}>
        {/* Título */}
        {title && (
          <Text
            style={[
              stylecard.title,
              titleStyle,
              {
                color:
                  selectedPaletteName === "black_pallete"
                    ? selectedPalette.additional_third
                    : selectedPalette.primary,
              },
            ]}
          >
            {title}
          </Text>
        )}

        {/* Descripción (solo si no hay body ni children) */}
        {description && !body && !children && (
          <Text
            style={[stylecard.description, descriptionStyle]}
            numberOfLines={4}
          >
            {description}
          </Text>
        )}

        {/* Body - Contenido flexible en el medio */}
        {body && <View style={[stylecard.body, bodyStyle]}>{body}</View>}

        {/* Children - Para retrocompatibilidad */}
        {children && !body && (
          <View style={stylecard.childrenContainer}>{children}</View>
        )}

        {/* Botones en la parte inferior */}
        {buttons.length > 0 && (
          <View style={stylecard.buttonsContainer}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                label={button.title}
                onPress={button.onPress}
                color={getButtonColor(button.style)}
                disabled={button.disabled}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Card;
