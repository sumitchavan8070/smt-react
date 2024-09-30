import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from './app_colors';

// Define the common button component
const CustonElevatedButton = ({
  title,
  onPress,
  backgroundColor = AppColors.toryBlue, 
  textColor = AppColors.white, // Default text color

  height = 50, // Default height
  borderRadius = 24, // Default border radius
  elevation = 2, // Default shadow elevation
}) => {
  return (
    <TouchableOpacity
      style={[
        CustonElevatedButtonStyles.button,
        {
          backgroundColor,
     
          height,
          borderRadius,
          elevation,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[CustonElevatedButtonStyles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Define styles for the button
const CustonElevatedButtonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
});






const OutlinedButton = ({
  title = "Button", // Default title
  onPress,
  borderColor = '#0047AB', // Default border color
  textColor = '#0047AB', // Default text color
  width = 110, // Default width
  height = 40, // Default height
  borderRadius = 25, // Default border radius
  style, // Additional styles
}) => {
  return (
    <TouchableOpacity
      style={[OutlinedButtonStyles.button, { borderColor, width, height, borderRadius }, style]}
      onPress={onPress}
    >
      <Text style={[OutlinedButtonStyles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const OutlinedButtonStyles = StyleSheet.create({
  button: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16, // You can customize the font size as needed
  },
});


export  {CustonElevatedButton , OutlinedButton};
