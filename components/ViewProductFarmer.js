import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const ViewProductScreen = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const loadProducts = async () => {
        try {
          const products = await AsyncStorage.getItem('products');
          const parsedProducts = products ? JSON.parse(products) : [];
          setProducts(parsedProducts);
        } catch (error) {
          console.log('Error loading products: ', error);
        }
      };
      loadProducts();
    }, []);
  
    const renderProduct = ({ item }) => (
      <View style={styles.productContainer}>
        <Image source={{ uri: item.imageurl }} style={styles.image} />
        <Text style={styles.productName}>Product Name: {item.productName}</Text>
        <Text style={styles.productDescription}>Info: {item.productDescription}</Text>
        <Text style={styles.productPrice}>Price: ${item.productPrice}</Text>
        <Text style={styles.productBuyStatus}>Status: {item.productbuyStatus}</Text>
        <Text style={styles.productWhoAdded}>Added by: {item.whoadded}</Text>
        
      </View>
    );
  
    return (
      <View style={styles.container}>
        {products.length ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text>No products found!</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    list: {
      padding: 20,
    },
    productContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    productDescription: {
      marginBottom: 5,
    },
    productPrice: {
      marginBottom: 5,
    },
    productBuyStatus: {
      marginBottom: 5,
    },
    productWhoAdded: {
      marginBottom: 5,
    },
    productImageUrl: {
      marginBottom: 5,
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export  default ViewProductScreen