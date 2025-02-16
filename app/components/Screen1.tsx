import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window'); 

const Screen1 = () => {
  return (
    <View style={styles.container}>
   


      <Image source={require('../../assets/homepage.png')} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>𝙲𝚘𝚏𝚏𝚎𝚎 𝚜𝚘 𝚐𝚘𝚘𝚍,</Text>
        <Text style={styles.title}>𝚢𝚘𝚞𝚛 𝚝𝚊𝚜𝚝𝚎 𝚋𝚞𝚍𝚜</Text>
        <Text style={styles.title}>𝚠𝚒𝚕𝚕 𝚕𝚘𝚟𝚎 𝚒𝚝.</Text>

        <Text style={styles.subtitle}>𝚃𝚑𝚎 𝚋𝚎𝚜𝚝 𝚐𝚛𝚊𝚒𝚗, 𝚝𝚑𝚎 𝚏𝚒𝚗𝚎𝚜𝚝 𝚛𝚘𝚊𝚜𝚝,                                    𝚝𝚑𝚎 𝚙𝚘𝚠𝚎𝚛𝚏𝚞𝚕 𝚏𝚕𝚊𝚟𝚘𝚛</Text>

       
        <TouchableOpacity style={styles.button}>
          <Image source={require('../../assets/google.png')} style={styles.googleIcon} />
          <Link href="/components/HomePage" asChild>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: width,
    height: height * 0.6,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'sans-serif', 
  },
  subtitle: {
    marginBottom:0,
    fontSize: 16,
    color: '#bfbfbf',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10, 
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3d3d3c',
  },
});

export default Screen1;
