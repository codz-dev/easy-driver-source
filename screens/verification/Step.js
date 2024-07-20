import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import { Button } from 'react-native';

const Step = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleButtonClick = () => {
        // Add your logic here for what should happen when the button is clicked
    };

    return (
        <View>
            <Text>Step</Text>
            <Text>Instructions go here...</Text>
            <CheckBox value={isChecked} onValueChange={handleCheckboxChange} />
            <Button title="Start" onPress={handleButtonClick} />
        </View>
    );
};

export default Step;
