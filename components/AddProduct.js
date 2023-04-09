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
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { addproducts } from "../firebaseconfig";

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productQuantity, setproductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [whoadded, setWhoAdded] = useState('');

  const route = useRoute();
      const userphone = route.params.userphone;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const pickImage = async () => {
   
    if(productName && productDescription && productPrice && productPrice){
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImageToFirebase(result.uri)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
        });
    }
  }
    else{
      alert("Enter All Fields")
    }
  };


  async function uploadImageToFirebase(uri) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storage = getStorage();
      let id = getRandomInt(1, 500);
      const filename = id + '.jpg';
      const storageRef = ref(storage, 'images/' + filename);
      const metadata = {
        contentType: 'image/jpeg',
      };
      const snapshot = await uploadBytes(storageRef, blob, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      alert("Image Uploaded Successfully");  
      const result = await addproducts(id, productName,productQuantity,productDescription, productPrice, userphone, downloadURL);    
      return downloadURL;
      setProductName("");setproductQuantity("");setProductDescription("");setProductPrice("");
    } catch (error) {
      alert('Error uploading file:', error);
    
    }
  }

  return (
    <ImageBackground
    source={require("../assets/bg.jpg")}
    style={styles.backgroundImage}
  >
    <ScrollView contentContainerStyle={styles.container}>

  <Avatar.Image size={100} source={require("../assets/add.png")} />

      <TextInput
        placeholder="Enter product name"
        value={productName}
        style={styles.input}
        onChangeText={setProductName}

        mode="outlined"
        label="Enter product name"
        right={<TextInput.Affix />}
        
      />
       <TextInput
        placeholder="Enter product name"
        value={productQuantity}
        style={styles.input}
        onChangeText={setproductQuantity}

        mode="outlined"
        label="Enter product Quantity"
        right={<TextInput.Affix />}
        
      />
      <TextInput
        placeholder="Enter product description"
        value={productDescription}
        style={styles.input}
        onChangeText={setProductDescription}

        mode="outlined"
        label="Enter product description"
        right={<TextInput.Affix />}
       
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
        value={userphone}
        style={styles.input}
        mode="outlined"
        label="Enter who added the product"
        right={<TextInput.Affix />}
        keyboardType="phone-pad"
      />
      <Button title="Pick an image and Add Product" onPress={pickImage} />
     

      </ScrollView>
      </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: "green",
    fontWeight: 'bold',
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  pickerLabel: {
    flex: 1,
  },
  picker: {
    flex: 2,
    height: 50,
    marginLeft: 10,
  },
  tabBar: {
    backgroundColor: "#f7f7f7",
    borderTopWidth: 0.5,
    borderTopColor: "#d6d6d6",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    borderTopColor: "#cccccc",
  },
  button: {
    bottom: 20,
    backgroundColor: 'white',
    padding: 10,
    marginTop:10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default AddProductScreen
