import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from './Theme'
import { View } from 'react-native'
import i18next from '../helpers/i18next';

export default function Button({ mode, style, ...props }) {
  const font = i18next.language === 'ar' ? 'El-Messiri' : 'MB';
  const boldFont = i18next.language === 'ar' ? 'El-Messiri-Bold' : 'MB';

  
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      marginVertical: 12,
    },
    button: {
      width: '100%',
      marginVertical: 10,
      paddingVertical: 2,
    },
    text: {
      fontFamily: font ? font : 'MB',
      fontSize: 15,
      lineHeight: 26,
      color: 'white', // Add this line to set the font color to white
    },
  })

  return (
    <View style={styles.container}>
      <PaperButton
        style={[
          styles.button,
          // border radius
          mode === 'contained' && { backgroundColor: "#000" },
          mode === 'contained2' && { backgroundColor: "#a4ff43" },
          mode === 'outlined' && { backgroundColor: "transparent", borderColor: "#000" },
          style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
      />
    </View>
  )
}
