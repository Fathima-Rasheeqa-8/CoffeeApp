import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Detail = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item as string);
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const descriptionText = `A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...`;

  const fullDescriptionText = `A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk. The foam or microfoam and the milk may be flavored with sugar, chocolate powder, cinnamon, and other spices. `;

  const handleBuyNow = () => {
   
    router.push({
      pathname: '/components/BuyNow', 
      params: { coffeeName: parsedItem.name,
        coffeeImage: parsedItem.image.uri || parsedItem.image, 
        coffeePrice: parsedItem.price, },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detail</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : '#333'}
            />
          </TouchableOpacity>
        </View>

 
        <Image source={parsedItem.image} style={styles.image} />


        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{parsedItem.name}</Text>
          <Text style={styles.description}>with {parsedItem.description}</Text>

        
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{parsedItem.rating} </Text>
            <Text style={styles.ratingCount}>(230)</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.iconWrapper}>
                <Ionicons name="cafe-outline" size={24} color="#C67C4E" />
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {isDescriptionExpanded ? fullDescriptionText : descriptionText}
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.readMore}>
                  {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeTitle}>Size</Text>
            <View style={styles.sizeButtons}>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === 'S' && styles.sizeButtonActive,
                ]}
                onPress={() => handleSizeSelect('S')}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === 'S' && styles.sizeButtonTextActive,
                  ]}
                >
                  S
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === 'M' && styles.sizeButtonActive,
                ]}
                onPress={() => handleSizeSelect('M')}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === 'M' && styles.sizeButtonTextActive,
                  ]}
                >
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sizeButton,
                  selectedSize === 'L' && styles.sizeButtonActive,
                ]}
                onPress={() => handleSizeSelect('L')}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === 'L' && styles.sizeButtonTextActive,
                  ]}
                >
                  L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.priceText}>Price</Text>
         
          <View style={styles.buyContainer}>
            <Text style={styles.price}>{parsedItem.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: 250,
    marginLeft: 39,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginLeft: 24,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  readMore: {
    color: '#C67C4E',

  },
  sizeContainer: {
    marginBottom: 25,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sizeButtons: {
    flexDirection: 'row',
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  sizeButtonActive: {
    borderColor: '#C67C4E',
    backgroundColor: '#fff8f0',
  },
  sizeButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  sizeButtonTextActive: {
    color: '#C67C4E',
  },
  buyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C67C4E',
  },
  buyButton: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  priceText: {
    marginBottom: 0,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 8,
    marginRight: 10,
  },
});

export default Detail;