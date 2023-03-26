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

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [whoadded, setWhoAdded] = useState('');
  const [imageurl, setImageUrl] = useState('');

  const handleAddProduct = async () => {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const product = {
      id,
      productName,
      productDescription,
      productPrice,
      productbuyStatus: 'Not Bought',
      whoadded,
      imageurl
    };
    try {
      const products = await AsyncStorage.getItem('products');
      const parsedProducts = products ? JSON.parse(products) : [];
      parsedProducts.push(product);
      await AsyncStorage.setItem('products', JSON.stringify(parsedProducts));
      alert('Product saved successfully!');
    } catch (error) {
      alert('Error saving product: ');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Enter product name"
        value={productName}
        style={styles.input}
        onChangeText={setProductName}

        mode="outlined"
        label="Enter product name"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Enter product description"
        value={productDescription}
        style={styles.input}
        onChangeText={setProductDescription}

        mode="outlined"
        label="Enter product description"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Enter product price"
        value={productPrice}
        style={styles.input}
        onChangeText={setProductPrice}

        mode="outlined"
        label="Enter product price"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Enter who added the product"
        value={whoadded}
        style={styles.input}
        onChangeText={setWhoAdded}

        mode="outlined"
        label="Enter who added the product"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Enter image URL"
        value={imageurl}
        style={styles.input}
        onChangeText={setImageUrl}
       
        mode="outlined"
        label="Enter image URL"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
        
      />
      <Button title="Add product" onPress={handleAddProduct} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
});


export default AddProductScreen
