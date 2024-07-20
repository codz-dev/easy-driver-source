import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import  TextInput  from '../../components/TextInput';
import  Button  from '../../components/Button';
import { emailValidator } from '../../helpers/emailValidator';
// passwordvalidator, phoneValidator
import { phoneValidator } from '../../helpers/phoneValidator';
import passwordValidator from '../../helpers/passwordValidator';
const Step1 = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        fname: '',
        phone: '',
        email: '',
        address: ''
    });
    const navigation = useNavigation();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleButtonClick = () => {
        // not empty
        if (!formData.name || !formData.fname || !formData.phone || !formData.email || !formData.address) {
            alert('Please fill in all fields');
            return;
        }

        // email validation
        if (!emailValidator(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!phoneValidator(formData.phone)) {
            alert('Please enter a valid phone number');
            return;
        }

    


        navigation.navigate('Liveness'); // Navigate to Step2 screen
    };

    return (
        <View style={styles.container}>
       <View 
                   style={{
                    width: '100%',
                }}
                >
                <Text style={styles.title}>
                    Personal Informations
                </Text>
    
                </View>

            <TextInput
                label="First Name"
                value={formData.name}
                icon="account-circle"
                onChangeText={(value) => handleInputChange('name', value)}
            />
            <TextInput
                label="Family Name"
                value={formData.fname}
                icon="account-circle"
                onChangeText={(value) => handleInputChange('fname', value)}
            />
            <TextInput
                label="Phone"
                value={formData.phone}
                icon="phone"
                onChangeText={(value) => handleInputChange('phone', value)}
            />
            <TextInput
                label="Email"
                value={formData.email}
                icon="email"
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <TextInput
                label="Address"
                value={formData.address}
                icon="home"
                onChangeText={(value) => handleInputChange('address', value)}
            />

            <Button 
            mode="contained"
            
             onPress={handleButtonClick}>
                Next
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
        marginBottom: 16,
        fontFamily: 'MB',
    },
    instructions: {
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'M'
    },
    checkbox: {
        alignSelf: 'center',
        marginBottom: 16,
    },
});

export default Step1;
