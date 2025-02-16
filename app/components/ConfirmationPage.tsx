import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const ConfirmationPage = () => {
  const { deliveryAddress } = useLocalSearchParams();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const routeCoordinates = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.79825, longitude: -122.4424 },
    { latitude: 37.77825, longitude: -122.4524 },
  ];

  useEffect(() => {
    if (deliveryAddress) {
      console.log("Fetching location for:", deliveryAddress);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(deliveryAddress)}`, {
        headers: { "User-Agent": "MyReactNativeApp" }, 
      })
        .then(response => response.json())
        .then(data => {
        //   console.log("Geocoding Response:", data);

          if (data.length > 0) {
            setLocation({
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            });
            setError(null);
          } else {
            setError("Location not found");
          }
        })
        .catch(error => {
          console.error("Geocoding Error:", error);
          setError("Error fetching location");
        })
        .finally(() => setLoading(false));
    }
  }, [deliveryAddress]);

  const initialRegion = location
    ? {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }
    : null;

  return (
    <View style={styles.container}>
    
      <View style={styles.mapContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#C67C4E" />
        ) : initialRegion ? (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#C67C4E"
              strokeWidth={3}
            />
            <Marker coordinate={routeCoordinates[0]} title="Start" pinColor="#C67C4E" />
            <Marker coordinate={location} title="Delivery Location" pinColor="orange" />
          </MapView>
        ) : (
          <Text style={styles.errorText}>{error || 'Location not found'}</Text>
        )}
      </View>

     
      <View style={styles.bottomSheet}>
        <Text style={styles.minutesLeftText}>10 minutes left</Text>
        <Text style={styles.deliveryAddressText}>Delivery to {deliveryAddress}</Text>

   
        <View style={styles.deliveryConfirmation}>
          <View style={styles.iconBackground}>
            <Ionicons name="bicycle" size={24} color="#C67C4E" />
          </View>
          <View>
            <Text style={styles.deliveredText}>Delivered your order</Text>
            <Text style={styles.deliveryTimeText}>We deliver your goods to you in the shortest possible time.</Text>
          </View>
        </View>

      
        <View style={styles.courierInfo}>
          <Image
            source={require('../../assets/courier.png')}
            style={styles.courierImage}
          />
          <View style={styles.courierDetails}>
            <Text style={styles.courierName}>Johan Hawn</Text>
            <Text style={styles.courierTitle}>Personal Courier</Text>
          </View>
          <TouchableOpacity style={styles.phoneButton}>
            <Ionicons name="call-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F8',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    zIndex: 1, 
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  minutesLeftText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryAddressText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  deliveryConfirmation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: '#fff8f0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deliveredText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryTimeText: {
    fontSize: 14,
    color: 'gray',
  },
  courierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierImage: {
    width: 50,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  courierDetails: {
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courierTitle: {
    fontSize: 14,
    color: 'gray',
  },
  phoneButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 12,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ConfirmationPage;
