import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

export default function WelcomeScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 seconds
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animatable.Image
          animation="zoomIn"
          duration={2000}
          iterationCount={1}
          source={require('../../assets/images/marca.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animatable.Text
          animation="fadeInUp"
          duration={2000}
          style={styles.splashText}
        >
          Learn Code
        </Animatable.Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Código Civil App</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  logo: {
    width: 200,
    height: 200,
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#36454F',
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#36454F',
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});