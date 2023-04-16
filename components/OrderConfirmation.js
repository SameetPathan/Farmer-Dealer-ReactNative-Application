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
  ImageBackground
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer,useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, uploadBytes,getDownloadURL } from "firebase/storage";
import { buyproduct, pay } from "../firebaseconfig";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from "react-native-elements";

const ViewAcceptReject = ({ navigation }) => {

    const route = useRoute();
    const userphone = route.params.userphone;

    const [products, setProducts] = useState([]);

    const [buyModalVisible, setBuyModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
   
    useEffect(() => {
      const dbb = getDatabase();
  
      const productRef = ref(dbb, 'products/');
      const unsubscribe = onValue(productRef, (snapshot) => {
        const ProductsData = snapshot.val();
        const ProductsArray = ProductsData ? Object.entries(ProductsData).map(([id, product]) => ({ id, ...product }))
        .filter(product => product.dealerphone === userphone)
        : [];
        setProducts(ProductsArray);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    const handleLogout = () => {
      navigation.navigate("Login");
    };
  
  
    const handlePay = async (item) => {
      try {
      
        setBuyModalVisible(false);
        let payed=true;
        pay(item.id,payed)
      
      } catch (error) {
       // console.error(error);
        alert("Something went wrong. Please try again later.");
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
          <Text style={styles.productPrice}>Product Owner : {item.whoadded}</Text>
          <Text style={styles.productDescription}>Product Price Offered : {item.dealerprice}</Text>
          <Text style={styles.productDescription}>Product Quantity Need : {item.quantiywant}</Text>
        </View>
        {!item.paymentstatus ?
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => setBuyModalVisible(true)}
          >
            <Text style={styles.buyButtonText}>Pay</Text>
        </TouchableOpacity>:<Text style={styles.productDescription}>Payment Done</Text>
        }
       
      </TouchableOpacity>
    );
  
    return (
      <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.backgroundImage}
    >

<Header
        leftComponent={{ icon: "logout", color: "#fff", onPress: handleLogout }}
        
        backgroundColor="green"
      />

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
              <Text style={styles.modalTitle}>Payment Number : {selectedProduct.whoadded}</Text>
              <Text style={styles.modalDescription}>Per Kg Price : {selectedProduct.dealerprice}</Text>
              <Text style={styles.modalDescription}>Quantity : {selectedProduct.quantiywant}</Text>
              <Text style={styles.modalDescription}>
               Amount to Pay:  {selectedProduct.dealerprice * selectedProduct.quantiywant}
              </Text>
            
  
               <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:10 }}>
               {selectedProduct.orderstatus ==="accepted"?
                <TouchableOpacity
                        style={{ backgroundColor: 'green', padding: 10, borderRadius: 5,marginBottom:10 }}
                        onPress={() => { handlePay(selectedProduct) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Icon name="payment" size={20} color="white" />
                          <Text style={{ color: 'white', marginLeft: 5 }}>Pay with Google Pay</Text>
                        </View>
                </TouchableOpacity>
                : <Text style={styles.modalTitle}>Order Not Accepted yet</Text>
                }
                <TouchableOpacity
                    style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
                    onPress={() => setBuyModalVisible(false)}>
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </TouchableOpacity>
               </View>

            </View>
          </Modal>
        )}
      </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:30,
      padding:20
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 1,
    },
    productContainer: {
      flexDirection: "row",
      backgroundColor: "#fff",
      marginBottom:10,
      alignItems: "center",
      paddingTop:30,
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      padding:20,
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

export default ViewAcceptReject