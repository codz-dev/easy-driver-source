import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from './Theme';
import i18next from '../helpers/i18next';

// Update the border radius in the theme object

export default function TextInput({ errorText, description, icon, isPassword, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const font = i18next.language === 'ar' ? 'El-Messiri' : 'MB';
  const boldFont = i18next.language === 'ar' ? 'El-Messiri-Bold' : 'MB';


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const styles = StyleSheet.create({
    container: {
      width: '80%',
      marginVertical: 12,
  
    },
    input: {
      fontFamily: font,
      // background gray
      backgroundColor: "#f1f1f1"
    },
    description: {
      fontFamily: font,
      fontSize: 12,
      color: theme.colors.secondary,
      paddingTop: 8,
    },
    error: {
      fontFamily: font,
      fontSize: 13,
      color: theme.colors.error,
      paddingTop: 8,
    },
  });

  
  return (
    <View style={styles.container}>
      <Input
        outlineStyle={{ borderWidth: 0 }}
        mode="outlined"

        
        style={styles.input}
        selectionColor="#4294E3"
        // label color
        underlineColor="#4294E3"
        left={<Input.Icon icon={icon} />}
        secureTextEntry={
          isPassword && !showPassword ? true : false
        }
        right={
          isPassword ? (
              <Input.Icon 
                onPress={togglePasswordVisibility}
              icon={showPassword ? 'eye-off' : 'eye'} />
          ) : null
        }
        theme={{
          fonts: { 
            bodyLarge: { ...theme.fonts.bodyLarge, fontFamily: font, color: "#4294E3" } 
          },
          // Use the updated theme object
          roundness: 10,

        }}
        
        placeholderTextColor="#4294E3"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}


