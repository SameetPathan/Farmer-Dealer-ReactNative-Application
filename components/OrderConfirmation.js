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

const viewacceptreject = () => {
    const [orderProducts, setOrderProducts] = useState([]);
  
    useEffect(() => {
      const fetchOrderProducts = async () => {
        try {
          const orderProducts = JSON.parse(await AsyncStorage.getItem("orderproductslist"));
          setOrderProducts(orderProducts);
        } catch (error) {
          console.error(error);
        }
      };
      fetchOrderProducts();
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={styles.productContainer}>
      <Image source={{ uri: item.imageurl }} style={styles.productImage} />
        <Text style={{ fontWeight: "bold" }}>Product Name : {item.productName}</Text>
        <Text>Orignal Price : {item.productPrice}</Text>
        <Text>Description : {item.productDescription}</Text>
        <Text>Status : {item.productbuyStatus}</Text>
        <Text>AcceptedPrice: {item.buyerPrice}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        </View>
      </View>
    );
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={orderProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId.toString()}
        />
      </ScrollView>
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
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
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

export default viewacceptreject