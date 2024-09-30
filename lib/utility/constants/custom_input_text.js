import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const CustomTextField = ({
  label,
  placeholder,
  value,
  onChangeText,
  maxLength,
  secureTextEntry = false,
  editable = true,
  keyboardType = 'default',
  maxLines = 1,
  prefix,
  suffix,
  inputStyle,
  labelStyle,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {prefix && <View style={styles.prefix}>{prefix}</View>}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
          multiline={maxLines > 1}
          numberOfLines={maxLines}
          {...rest}
        />
        {suffix && <View style={styles.suffix}>{suffix}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  prefix: {
    marginRight: 10,
  },
  suffix: {
    marginLeft: 10,
  },
});

export default CustomTextField;
