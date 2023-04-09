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
import { NavigationContainer,useRoute  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getStorage, uploadBytes,getDownloadURL } from "firebase/storage";
import { AcceptReject, buyproduct } from "../firebaseconfig";

const OrderProductsList = ({ navigation }) => {

      const route = useRoute();
      const userphone = route.params.userphone;
    const [products, setProducts] = useState([]);

    const [buyModalVisible, setBuyModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderInfo, setOrderInfo] = useState({
      phoneNumber: "",
      address: "",
      price: "",
      quantity:"",
    });
  
    useEffect(() => {
      const dbb = getDatabase();
  
      const productRef = ref(dbb, 'products/');
      const unsubscribe = onValue(productRef, (snapshot) => {
        const ProductsData = snapshot.val();
        const ProductsArray = ProductsData ? Object.entries(ProductsData)
        .map(([id, product]) => ({ id, ...product }))
        .filter(product => product.orderplace === true)
        .filter(product => product.whoadded === userphone)
        : [];
      
        setProducts(ProductsArray);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
    const handleAccept = async(item)=>{
      let fprice=item.productQuantity - item.quantiywant;
      AcceptReject(item.id, fprice,'accepted');
    }
    const handleReject= async(item)=>{
      AcceptReject(item.id,item.productQuantity,'rejected');
    }
  
    
  
    const renderProduct = ({ item }) => (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => setSelectedProduct(item)}
      >
        <Image source={{ uri: item.imageurl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>Product Name : {item.productName}</Text>
          <Text style={styles.productPrice}>Product Orginal Price Rs. {item.productPrice}</Text>
          <Text style={styles.productDescription}>Product Orginal Quantity : {item.productQuantity}</Text>

          <Text style={styles.productDescription}>Dealer Phone : {item.dealerphone}</Text>
          <Text style={styles.productDescription}>Dealer Address : {item.dealeraddress}</Text>
          <Text style={styles.productDescription}>Dealer Price : {item.dealerprice}</Text>
          <Text style={styles.productDescription}>Quantiy Want : {item.quantiywant}</Text>
          
        { item.orderstatus ==="process"?
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
              onPress={() => handleAccept(item)}
            >
              <Text style={{ color: "white" }}>Accept Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
              onPress={() => handleReject(item)}
            >
              <Text style={{ color: "white" }}>Reject Order</Text>
            </TouchableOpacity>
          </View>:<Text style={styles.productDescription}>Order Already  : {item.orderstatus}</Text>}
        </View>
        
  
      </TouchableOpacity>
    );
  
    return (
      <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
  
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

export default OrderProductsList