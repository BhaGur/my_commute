import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommuteInfo() {
return (
    <View style={styles.container}>
        <Text>Please register your journey here</Text>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});