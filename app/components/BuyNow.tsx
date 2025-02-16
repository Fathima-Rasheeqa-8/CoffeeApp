import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BuyNow = () => {
  const { coffeeName, coffeeImage, coffeePrice } = useLocalSearchParams();
  const [deliveryType, setDeliveryType] = useState('Deliver');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const deliveryFee = 1.0;

  const priceWithoutDollar = coffeePrice.replace('$', '');
  const parsedCoffeePrice = parseFloat(priceWithoutDollar);

  const totalPrice = parsedCoffeePrice * itemQuantity + deliveryFee;

  const discount = 4.53 - (parsedCoffeePrice);

  const handleDeliveryType = (type) => {
    setDeliveryType(type);
  };

  const incrementQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const decrementQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const router = useRouter();

  const handleOrder = () => {
    router.push({
      pathname: '/components/ConfirmationPage',
      params: {
        deliveryAddress: deliveryAddress,
      },
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          console.log("Back button pressed");
        }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.orderText}>Order</Text>
      </View>

   
      <View style={styles.deliveryToggleContainer}>
        <TouchableOpacity
          style={[
            styles.deliveryToggleButton,
            deliveryType === 'Deliver' && styles.deliveryToggleButtonActive,
          ]}
          onPress={() => handleDeliveryType('Deliver')}
        >
          <Text
            style={[
              styles.deliveryToggleButtonText,
              deliveryType === 'Deliver' && styles.deliveryToggleButtonTextActive,
            ]}
          >
            Deliver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.deliveryToggleButton,
            deliveryType === 'Pick Up' && styles.deliveryToggleButtonActive,
          ]}
          onPress={() => handleDeliveryType('Pick Up')}
        >
          <Text
            style={[
              styles.deliveryToggleButtonText,
              deliveryType === 'Pick Up' && styles.deliveryToggleButtonTextActive,
            ]}
          >
            Pick Up
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Delivery Address</Text>
        <TextInput
          style={styles.addressInput}
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
        />
        <View style={styles.addressActions}>
          <TouchableOpacity style={styles.addressActionBtn}>
            <Ionicons name="pencil-outline" size={16} color="black" />
            <Text style={styles.addressActionText}>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addressActionBtn}>
            <Ionicons name="document-text-outline" size={16} color="black" />
            <Text style={styles.addressActionText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.orderSummaryContainer}>
        <Image source={require('../../assets/cappuccino2.jpeg')} style={styles.coffeeImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.coffeeName}>{coffeeName}</Text>
          <Text style={styles.coffeeDescription}>with Chocolate</Text>
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{itemQuantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

 
      <TouchableOpacity style={styles.discountContainer}>
        <View style={styles.discountIconContainer}>
          <Ionicons name="pricetag" size={20} color="#C67C4E" />
        </View>
        <Text style={styles.discountText}>1 Discount is applied</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>


      <View style={styles.paymentSummaryContainer}>
        <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Price</Text>
          <Text style={styles.paymentValue}>$ {(parsedCoffeePrice * itemQuantity).toFixed(2)}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Delivery Fee</Text>
          <Text style={styles.paymentValue}>$ {deliveryFee.toFixed(1)}</Text>
        </View>

        <View style={styles.totalPaymentRow}>
          <Text style={styles.totalPaymentLabel}>Total Payment</Text>
          <Text style={styles.totalPaymentValue}>$ {totalPrice.toFixed(2)}</Text>
        </View>
      </View>


      <View style={styles.paymentMethodContainer}>
        <View style={styles.paymentMethodInnerContainer}>
          <View style={styles.paymentMethodIconContainer}>
            <Ionicons name="card" size={24} color="#C67C4E" />
          </View>
          <Text style={styles.paymentMethodText}>Cash $ {totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.paymentMoreOptions}>
          <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  orderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 140,
  },
  deliveryToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  deliveryToggleButton: {
    width: 185,
    height: 45,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  deliveryToggleButtonActive: {
    backgroundColor: '#C67C4E',
  },
  deliveryToggleButtonText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#333',
  },
  deliveryToggleButtonTextActive: {
    color: '#fff',
  },
  addressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  addressDetail: {
    fontSize: 14,
    color: 'gray',
  },
  addressActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addressActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  addressActionText: {
    marginLeft: 5,
    fontSize: 14,
  },
  orderSummaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  coffeeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  orderInfo: {
    flex: 1,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coffeeDescription: {
    fontSize: 14,
    color: 'gray',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
  },
  itemQuantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  discountIconContainer: {
    backgroundColor: '#fff8f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  discountText: {
    flex: 1,
    fontSize: 16,
  },
  paymentSummaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  paymentSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentLabel: {
    fontSize: 16,
    color: 'gray',
  },
  paymentValue: {
    fontSize: 16,
  },
  totalPaymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalPaymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPaymentValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  paymentMethodIconContainer: {
    backgroundColor: '#fff8f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  paymentMethodInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  paymentMethodText: {
    fontSize: 16,
  },
  paymentMoreOptions: {
    padding: 8,
  },
  orderButton: {
    backgroundColor: '#C67C4E',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuyNow;