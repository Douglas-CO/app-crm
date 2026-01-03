import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonStyles } from './button.styles';

type ButtonProps = {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onPress, color = '#007bff', disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        ButtonStyles.button,
        { backgroundColor: disabled ? '#ccc' : color },
      ]}
      activeOpacity={0.7}
    >
      <Text style={ButtonStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
};


export default Button;
