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

const ViewScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [buyModalVisible, setBuyModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderInfo, setOrderInfo] = useState({
      phoneNumber: "",
      address: "",
      price: "",
    });
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = JSON.parse(await AsyncStorage.getItem("products"));
          setProducts(products);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProducts();
    }, []);
  
    const handleBuy = async () => {
      try {
        // get phone number, address and price from user input
        const { phoneNumber, address, price } = orderInfo;
  
        // create a new order product object with relevant information
        const orderProduct = {
          productId: selectedProduct.id,
          productName: selectedProduct.productName,
          productDescription: selectedProduct.productDescription,
          productPrice: selectedProduct.productPrice,
          productbuyStatus: "Pending",
          whoadded: selectedProduct.whoadded,
          imageurl: selectedProduct.imageurl,
          buyerPhoneNumber: phoneNumber,
          buyerAddress: address,
          buyerPrice: price,
        };
  
        // get existing order products from AsyncStorage or initialize an empty array
        let orderProducts = await AsyncStorage.getItem("orderproductslist");
        orderProducts = orderProducts ? JSON.parse(orderProducts) : [];
  
        // add new order product to the list
        orderProducts.push(orderProduct);
  
        // save the updated order products list to AsyncStorage
        await AsyncStorage.setItem(
          "orderproductslist",
          JSON.stringify(orderProducts)
        );
  
        // update the buy status of the product to "Pending"
        const updatedProducts = products.map((p) => {
          if (p.id === selectedProduct.id) {
            p.productbuyStatus = "Pending";
          }
          return p;
        });
        await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
  
        // reset orderInfo state
        setOrderInfo({
          phoneNumber: "",
          address: "",
          price: "",
        });
  
        // hide the buy product modal
        setBuyModalVisible(false);
  
        // show success message
        alert("Success", "Your order has been placed successfully.");
      } catch (error) {
        console.error(error);
        alert("Error", "Something went wrong. Please try again later.");
      }
    };
  
    const renderProduct = ({ item }) => (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => setSelectedProduct(item)}
      >
        <Image source={{ uri: item.imageurl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>Product Name : {item.productName}</Text>
          <Text style={styles.productPrice}>Price Rs. {item.productPrice}</Text>
          <Text style={styles.productDescription}>Product Description : {item.productDescription}</Text>
        </View>
        {item.productbuyStatus === "Not Bought" ? (
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => setBuyModalVisible(true)}
          >
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.boughtButton}>
            <Text style={styles.boughtButtonText}>Bought</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
        {selectedProduct && (
          <Modal visible={buyModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedProduct.imageurl }} style={styles.productImage} />
              <Text style={styles.modalTitle}>Product Name : {selectedProduct.productName}</Text>
              <Text style={styles.modalPrice}>
                Rs. {selectedProduct.productPrice}
              </Text>
              <Text style={styles.modalDescription}>
               Product Description:  {selectedProduct.productDescription}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                onChangeText={(text) =>
                  setOrderInfo({ ...orderInfo, phoneNumber: text })
                }

                mode="outlined"
              label="Enter your phone number"
              right={<TextInput.Affix />}
              keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                onChangeText={(text) =>
                  setOrderInfo({ ...orderInfo, address: text })
                }
                mode="outlined"
              label="Enter your address"
              right={<TextInput.Affix />}
              
              />
              <TextInput
                style={styles.input}
                placeholder="Enter the price you want to buy for"
                onChangeText={(text) =>
                  setOrderInfo({ ...orderInfo, price: text })
                }

                mode="outlined"
              label="Enter the price you want to buy for"
              right={<TextInput.Affix />}
              keyboardType="phone-pad"
              />
               <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:10 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
                    onPress={handleBuy}
                  >
                    <Text style={{ color: "white" }}>Place Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
                    onPress={() => setBuyModalVisible(false)}
                  >
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </TouchableOpacity>
               </View>


            </View>
          </Modal>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    productContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    productDetails: {
      flex: 1,
      paddingHorizontal: 10,
    },
    productName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    productPrice: {
      fontSize: 14,
      color: "#777",
      marginVertical: 5,
    },
    productDescription: {
      fontSize: 14,
      color: "#555",
    },
    buyButton: {
      backgroundColor: "#3f8ae0",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    buyButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    boughtButton: {
      backgroundColor: "#ccc",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    boughtButtonText: {
      color: "#555",
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalPrice: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#3f8ae0",
      marginBottom: 10,
    },
    input: {
      width: "100%",
      marginBottom: 20,
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    modalButton: {
      backgroundColor: "#3f8ae0",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginLeft: 10,
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });

export default ViewScreen