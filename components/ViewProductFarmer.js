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
  ViewPropTypes ,
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
import { deleteProduct } from "../firebaseconfig";
import Carousel from 'react-native-snap-carousel';

const ViewProductScreen = () => {

     const route = useRoute();
    const userphone = route.params.userphone;
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
  
    useEffect(() => {
      const dbb = getDatabase();
      
      const productRef = ref(dbb, 'products/');
      const unsubscribe = onValue(productRef, (snapshot) => {
        const ProductsData = snapshot.val();
        const productRef = ref(dbb, 'products/');
      const unsubscribe = onValue(productRef, (snapshot) => {
        const ProductsData = snapshot.val();
        const ProductsArray = ProductsData ? Object.entries(ProductsData)
        .map(([id, product]) => ({ id, ...product }))
        .filter(product => product.whoadded === userphone)
        : [];
      
        setProducts(ProductsArray);
      });
      });

      

  
      return () => {
        unsubscribe();
      };
    }, []);

    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchText.toLowerCase()));

    const deleteprod = async(item)=>{
      deleteProduct(item.id);
    }
  
    const renderProduct = ({ item }) => (
      <View
        style={styles.productContainer}
      >
        <Image source={{ uri: item.imageurl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>Product Name: {item.productName}</Text>
          <Text style={styles.productPrice}>Price Rs. {item.productPrice}</Text>
          <Text style={styles.productDescription}>Product Quantity: {item.productQuantity}</Text>
          <Text style={styles.productDescription}>Product Description: {item.productDescription}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:10 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: "red", padding: 10, borderRadius: 5 }}
                    onPress={()=>{deleteprod(item)}}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </TouchableOpacity>
               </View>
      </View>
    );
  
    return (
      <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.backgroundImage}
    >

<View style={styles.container}>
  <TextInput
    placeholder="Search products by name"
    style={styles.inputt}
    mode="outlined"
    label="Search products by name"
    right={<TextInput.Affix />}
    onChangeText={text => setSearchText(text)}
    value={searchText}
  />

  {products.length ? (
    <Carousel
      data={filteredProducts}
      renderItem={renderProduct}
      sliderWidth={300} // Change this to match your desired width
      itemWidth={200} // Change this to match your desired width
      layout={'default'}
      layoutCardOffset={18}
      loop={true}
      autoplay={true}
      autoplayDelay={500}
      autoplayInterval={3000}
    />
  ) : (
    <Text>No products found!</Text>
  )}
</View>
      <View style={styles.container}>

          <TextInput
          placeholder="Search products by name"
          style={styles.inputt}
          mode="outlined"
          label="Search products by name"
          right={<TextInput.Affix />}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          />

        {products.length ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
          />
        ) : (
          <Text>No products found!</Text>
        )}
      </View>
      
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      padding:20,
      marginTop:50,
    },
    inputt:{
      marginBottom:5,
      borderRadius:40,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.8,
    },
    productContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    productImage: {
      width: 80,
      height: 80,
      marginRight: 10,
      borderRadius: 5,
    },
    productDetails: {
      flex: 1,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1a73e8',
      marginBottom: 5,
    },
    productDescription: {
      fontSize: 16,
      marginBottom: 5,
    },
    whoAdded: {
      fontSize: 16,
      fontStyle: 'italic',
    },
  });
  
  

export  default ViewProductScreen