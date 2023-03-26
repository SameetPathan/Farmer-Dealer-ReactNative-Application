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

import AddProductScreen from "./components/AddProduct";
import ViewScreen from "./components/ViewProductDealer";
import OrderProductsList from "./components/CheckRequestFarmer";
import viewacceptreject from "./components/OrderConfirmation";
import ViewProductScreen from "./components/ViewProductFarmer";



let user = "";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

{
  /* For Register Code Here */
}
function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [userType, setUserType] = useState("farmer");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const userTypes = [
    { label: "Farmer", value: "Farmer" },
    { label: "Dealer", value: "Dealer" },
  ];
  const handleLog = async () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
   
    try {
      const userData = {
        username,
        phoneNumber,
        aadharCard,
        userType,
        password,
        address,
      };
      if(userType==="Farmer"){
        await AsyncStorage.setItem("userDataFarmer", JSON.stringify(userData));
      }
      else{
        await AsyncStorage.setItem("userDataDealer", JSON.stringify(userData));
      }
      
      alert("Register Successful");
      navigation.navigate("Login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={require("./assets/logo.png")} />
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Username"
        right={<TextInput.Affix />}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        right={<TextInput.Affix />}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Aadhar Card Number"
        placeholder="Aadhar Card Number"
        keyboardType="number-pad"
        value={aadharCard}
        onChangeText={(text) => setAadharCard(text)}
      />
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
        >
          <Picker.Item label="Select user type" value="" />
          {userTypes.map((type) => (
            <Picker.Item
              key={type.value}
              label={type.label}
              value={type.value}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Address"
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Button mode="outlined" title="Register" onPress={handleRegister} />
      </View>
      <View>
        <TouchableOpacity onPress={handleLog}>
          <Text style={{ color: "blue", padding: 10 }}>
            {" "}
            Already Register, Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



{
  /* For Login Code Here */
}

function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("farmer");
  const [password, setPassword] = useState("");
  const userTypes = [
    { label: "Farmer", value: "Farmer" },
    { label: "Dealer", value: "Dealer" },
  ];

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      alert('Async Storage cleared successfully.');
    } catch (error) {
      alert('Error clearing Async Storage: ', error.message);
    }
  }

  const handleLogin = async () => {
    try {
      let userData=[]
      if(userType==="Farmer"){
        userData = await AsyncStorage.getItem("userDataFarmer");
      }
      else{
        userData = await AsyncStorage.getItem("userDataDealer");
      }
      
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        if (
          parsedUserData.phoneNumber === phoneNumber &&
          parsedUserData.userType === userType &&
          parsedUserData.password === password
        ) {
          user = userType;
          navigation.navigate("Home"); // navigate to home screen after successful login
        } else {
          alert("incorrect login details");
        }
      } else {
        alert("no user data found");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Image size={100} source={require("./assets/logo.png")} />
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        right={<TextInput.Affix />}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
        >
          <Picker.Item label="Select user type" value="" />
          {userTypes.map((type) => (
            <Picker.Item
              key={type.value}
              label={type.label}
              value={type.value}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="outlined" title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
});

{
  /* Home */
}

function HomeScreen({ navigation }) {
  return (

    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#1a73e8",
        inactiveTintColor: "#8f8f8f",
        labelStyle: styles.label,
        style: {
          borderTopWidth: 1,
          borderTopColor: "#cccccc",
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        },
      }}
    >
      {user === "Farmer" && (
        <Tab.Screen name="Add Product" component={AddProductScreen} />
      )}
      {user === "Farmer" && (
        <Tab.Screen name="View Products" component={ViewProductScreen} />
      )}
      {user === "Farmer" && (
        <Tab.Screen name="Check Requests" component={OrderProductsList} />
      )}

      {user === "Dealer" && (
        <Tab.Screen name="Farmers Products" component={ViewScreen} />
      )}
      {user === "Dealer" && (
        <Tab.Screen name="Check Orders" component={viewacceptreject} />
      )}
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer style={styles2.background}>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
        <Stack.Screen name="ViewProducts" component={ViewProductScreen} />
        <Stack.Screen name="ViewDealer" component={ViewScreen} />
        <Stack.Screen name="checkrequest" component={OrderProductsList} />
        <Stack.Screen name="ViewAcceptReject" component={viewacceptreject} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles2 = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
