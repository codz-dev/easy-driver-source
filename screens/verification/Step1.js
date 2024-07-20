import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

//Lottie
import LottieView from 'lottie-react-native';
import  Button  from '../../components/Button';


const Step1 = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = () => {
        navigation.navigate('Step2'); // Navigate to Step2 screen
    };

    return (
        <View style={styles.container}>
            <View
            style={{
                width: '100%',
            }}
            >
            <Text style={styles.title}>
                Start Verification
            </Text>

            </View>

            <LottieView
                source={require('../../assets/images/app.json')}
                style={{ width: 200, height: 200 }}
                autoPlay
                loop
            />
                 <View
            style={{
                marginTop: 80,
                width: '100%',
            }}
            >
            <Text style={styles.instructions}>
                In this verification process, you will be asked to provide some personal information and documents.
            </Text>


            </View>

            <View
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                
            }}
            >
            <Text style={styles.instructions}>I accept the terms and conditions.


            </Text>
            <CheckBox
                value={isChecked}
                onValueChange={handleCheckboxChange}
                style={styles.checkbox}
            />

            </View>

            <Button 
            mode="contained"
            disabled={!isChecked}
            title="Start" onPress={handleButtonClick}>
            Start 
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'MB',
        marginBottom: 16,
        textAlign: 'left'
    },
    instructions: {
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'M'
    },
    checkbox: {
        
        marginBottom: 16,
    },
});

export default Step1;
