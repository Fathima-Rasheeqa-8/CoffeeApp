import React from 'react';
import { View, Text, StyleSheet ,Button,TouchableOpacity} from 'react-native';
import Screen1 from '../components/Screen1';
import HomePage from '../components/HomePage';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
    
        <Screen1/>
        {/* <HomePage/> */}
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  button: {
    backgroundColor: 'white', 
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'black', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
