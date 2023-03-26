import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,

} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const OrderProductsList = () => {
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
        <Text>Price : {item.productPrice}</Text>
        <Text>Description : {item.productDescription}</Text>
        <Text>Status : {item.productbuyStatus}</Text>
        <Text>Dealer Phone Number : {item.buyerPhoneNumber}</Text>
        <Text>Dealer Address : {item.buyerAddress}</Text>
        <Text>Dealer Offered Price: {item.buyerPrice}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
            onPress={() => handleAccept(item)}
          >
            <Text style={{ color: "white" }}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
            onPress={() => handleReject(item)}
          >
            <Text style={{ color: "white" }}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
    const handleAccept = async (item) => {
      try {
        // update the buy status of the product to "Accepted"
        const updatedOrderProducts = orderProducts.map((p) => {
          if (p.productId === item.productId) {
            p.productbuyStatus = "Accepted";
          }
          return p;
        });
  
        // save the updated order products list to AsyncStorage
        await AsyncStorage.setItem(
          "orderproductslist",
          JSON.stringify(updatedOrderProducts)
        );
  
        // update the state to re-render the component
        setOrderProducts(updatedOrderProducts);
  
        // show success message
        alert("Success", "Product has been accepted.");
      } catch (error) {
        console.error(error);
        alert("Error", "Something went wrong. Please try again later.");
      }
    };
  
    const handleReject = async (item) => {
      try {
        // update the buy status of the product to "Rejected"
        const updatedOrderProducts = orderProducts.map((p) => {
          if (p.productId === item.productId) {
            p.productbuyStatus = "Rejected";
          }
          return p;
        });
  
        // save the updated order products list to AsyncStorage
        await AsyncStorage.setItem(
          "orderproductslist",
          JSON.stringify(updatedOrderProducts)
        );
  
        // update the state to re-render the component
        setOrderProducts(updatedOrderProducts);
  
        // show success message
        alert("Success", "Product has been rejected.");
      } catch (error) {
        console.error(error);
        alert("Error", "Something went wrong. Please try again later.");
      }
    };
  
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
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export default OrderProductsList