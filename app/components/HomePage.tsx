import { View,Text,StyleSheet,Dimensions,Image,TextInput,TouchableOpacity,ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router'; 

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Cappuccino');

  const coffeeData = {
    Cappuccino: [
      { id: 'c1', name: 'Cappuccino', description: 'with Chocolate', price: '$ 4.53', image: require('../../assets/cappuccino2.jpeg'), rating: 4.8 },
      { id: 'c2', name: 'Cappuccino', description: 'with Vanilla', price: '$ 4.75', image: require('../../assets/cappuccino1.jpeg'), rating: 4.8 },
      { id: 'c3', name: 'Cappuccino', description: 'with Caramel', price: '$ 4.20', image: require('../../assets/cappuccino3.jpeg'), rating: 4.5 },
      { id: 'c4', name: 'Cappuccino', description: 'with Hazelnut', price: '$ 5.00', image: require('../../assets/cappuccino2.jpeg'), rating: 4.0 },
    ],
    Machiato: [
      { id: 'm1', name: 'Machiato', description: 'Classic Blend', price: '$ 3.99', image: require('../../assets/cappuccino1.jpeg'), rating: 4.6 },
      { id: 'm2', name: 'Machiato', description: 'Caramel Drizzle', price: '$ 4.25', image: require('../../assets/cappuccino3.jpeg'), rating: 4.7 },
      { id: 'm3', name: 'Machiato', description: 'Vanilla Infusion', price: '$ 4.50', image: require('../../assets/cappuccino2.jpeg'), rating: 4.3 },
      { id: 'm4', name: 'Machiato', description: 'Hazelnut Swirl', price: '$ 4.75', image: require('../../assets/cappuccino1.jpeg'), rating: 4.9 },
    ],
    Latte: [
      { id: 'l1', name: 'Latte', description: 'Classic Latte', price: '$ 4.99', image: require('../../assets/cappuccino2.jpeg'), rating: 4.2 },
      { id: 'l2', name: 'Latte', description: 'Caramel Latte', price: '$ 5.25', image: require('../../assets/cappuccino1.jpeg'), rating: 4.1 },
      { id: 'l3', name: 'Latte', description: 'Vanilla Latte', price: '$ 5.50', image: require('../../assets/cappuccino3.jpeg'), rating: 4.5 },
      { id: 'l4', name: 'Latte', description: 'Hazelnut Latte', price: '$ 5.75', image: require('../../assets/cappuccino2.jpeg'), rating: 4.4 },
    ],
    Americano: [
      { id: 'a1', name: 'Americano', description: 'Strong and Bold', price: '$ 2.99', image: require('../../assets/cappuccino3.jpeg'), rating: 4.9 },
      { id: 'a2', name: 'Americano', description: 'Rich and Aromatic', price: '$ 3.25', image: require('../../assets/cappuccino2.jpeg'), rating: 4.7 },
      { id: 'a3', name: 'Americano', description: 'Intense Flavor', price: '$ 3.50', image: require('../../assets/cappuccino1.jpeg'), rating: 4.5 },
      { id: 'a4', name: 'Americano', description: 'Perfectly Brewed', price: '$ 3.75', image: require('../../assets/cappuccino3.jpeg'), rating: 4.8 },
    ],
  };

  const renderCoffeeItems = () => {
    const items = coffeeData[selectedCategory];
    if (!items || items.length === 0) {
      return <Text>No items found for {selectedCategory}</Text>;
    }

    const coffeeRows = [];
    for (let i = 0; i < items.length; i += 2) {
      const item1 = items[i];
      const item2 = items[i + 1];

      coffeeRows.push(
        <View style={styles.coffeeRow} key={`row-${i}`}>
          <View style={styles.coffeeItem}>
            <Link
              href={{
                pathname: '/components/Detail',
                params: { item: JSON.stringify(item1) },
              }}
              asChild
            >
              <TouchableOpacity>
                <Image source={item1.image} style={styles.coffeeImage} />
              </TouchableOpacity>
            </Link>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item1.rating}</Text>
            </View>
            <Text style={styles.coffeeName}>{item1.name}</Text>
            <Text style={styles.coffeeDescription}>{item1.description}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.coffeePrice}>{item1.price}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {item2 && (
            <View style={styles.coffeeItem}>
              <Link
                href={{
                  pathname: '/components/Detail',
                  params: { item: JSON.stringify(item2) }, 
                }}
                asChild
              >
                <TouchableOpacity>
                  <Image source={item2.image} style={styles.coffeeImage} />
                </TouchableOpacity>
              </Link>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item2.rating}</Text>
              </View>
              <Text style={styles.coffeeName}>{item2.name}</Text>
              <Text style={styles.coffeeDescription}>{item2.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.coffeePrice}>{item2.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      );
    }

    return coffeeRows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          <Text style={styles.locationLabel}>Location</Text>
          <View style={styles.locationWrapper}>
            <Text style={styles.locationText}>Bilzen, Tanjungbalai</Text>
            <Ionicons name="chevron-down" size={20} color="white" />
          </View>
        </View>

        <Image source={require('../../assets/profile.png')} style={styles.profile} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search coffee" placeholderTextColor="#888" />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.promoContainer}>
        <Image source={require('../../assets/promo.png')} style={styles.promoImage} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <TouchableOpacity
          style={selectedCategory === 'Cappuccino' ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => setSelectedCategory('Cappuccino')}
        >
          <Text style={selectedCategory === 'Cappuccino' ? styles.categoryTextActive : styles.categoryText}>Cappuccino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedCategory === 'Machiato' ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => setSelectedCategory('Machiato')}
        >
          <Text style={selectedCategory === 'Machiato' ? styles.categoryTextActive : styles.categoryText}>Machiato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedCategory === 'Latte' ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => setSelectedCategory('Latte')}
        >
          <Text style={selectedCategory === 'Latte' ? styles.categoryTextActive : styles.categoryText}>Latte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedCategory === 'Americano' ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => setSelectedCategory('Americano')}
        >
          <Text style={selectedCategory === 'Americano' ? styles.categoryTextActive : styles.categoryText}>Americano</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.coffeeItemsContainer}>
        {renderCoffeeItems()}
      </ScrollView>

      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#D2691E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    backgroundColor: '#2E2E2E',
    paddingTop: 50,
    height: 270,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 0,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -140,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4d4d4d',
    borderRadius: 20,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  filterButton: {
    backgroundColor: '#D2691E',
    borderRadius: 20,
    padding: 8,
  },
  promoContainer: {
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
    marginLeft: 30,
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    position: 'absolute',
  },

  categoriesContainer: {
    marginTop: 130,
    paddingHorizontal: 20,
    marginBottom: 10,
    height: 60,
  },
  categoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#D2691E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryTextActive: {
    fontSize: 16,
    color: 'white',
  },
  coffeeItemsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  coffeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  coffeeItem: {
    width: width / 2 - 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
  },
  coffeeImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 3,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  coffeeDescription: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coffeePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D2691E',
    borderRadius: 15,
    padding: 5,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    padding: 10,
  },
});

export default HomePage;