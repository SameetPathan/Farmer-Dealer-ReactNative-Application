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
import { NavigationContainer ,useRoute} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, Avatar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AddProductScreen from "./components/AddProduct";
import ViewScreen from "./components/ViewProductDealer";
import OrderProductsList from "./components/CheckRequestFarmer";
import ViewAcceptReject from "./components/OrderConfirmation";
import ViewProductScreen from "./components/ViewProductFarmer";
import { register } from "./firebaseconfig";
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, set,get,onValue } from "firebase/database";

let user = "";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let userphone=""



const GetStarted = ({ navigation }) => {

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={stylesget.container}>
      <Image source={require("./assets/bg.jpg")} style={stylesget.image} />
      <TouchableOpacity style={stylesget.button} onPress={handleGetStarted}>
        <Text style={stylesget.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={stylesget.text}>Welcome to our Systems ,
      We make farmer and Dealer Communication Easy</Text>
    </View>
  
  );
};

const GetStartedFarmer = ({ navigation }) => { 
  const handleGetStarted = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={stylesget.container}>
      <Image source={require("./assets/bg.jpg")} style={stylesget.image} />
      <TouchableOpacity style={stylesget.button} onPress={handleGetStarted}>
        <Text style={stylesget.buttonText}>Lets Start</Text>
      </TouchableOpacity>
      <Text style={stylesget.text}>Welcome , {userphone}</Text>
      
      <Text style={stylesget.info}>Our app connects farmers and dealers to make buying and selling agricultural products easier and more efficient.
        Through our platform, farmers can post their products and negotiate prices with interested dealers, while dealers
        can search for available products and place orders directly with the farmers. Our goal is to empower farmers and
        improve access to fresh, locally grown produce for everyone.</Text>

    </View>
  
  );
};



const stylesget = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#90EE90',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    position: 'absolute',
    top: '25%',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1D8348',
    textAlign:'center',
   
  },
 
  info: {
    color: '#FFA500',
    fontSize: 18,
    position: 'absolute',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontStyle:'bold',
    margin:10,
    backgroundColor:'#FFFFE0',
    borderRadius: 20,
  },
});


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

    // Validation for username
    const [usernameError, setUsernameError] = useState('');
    const handleUsernameChange = (text) => {
      setUsername(text);
      if (text.trim().length < 5) {
        setUsernameError('Username must be at least 5 characters long');
      } else {
        setUsernameError('');
      }
    };
  
    // Validation for phone number
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const handlePhoneNumberChange = (text) => {
      setPhoneNumber(text);
      const phoneRegex = /^[1-9]\d{9}$/;
      if (!phoneRegex.test(text)) {
        setPhoneNumberError('Invalid phone number format');
      } else {
        setPhoneNumberError('');
      }
    };
  
    // Validation for Aadhar Card number
    const [aadharCardError, setAadharCardError] = useState('');
    const handleAadharCardChange = (text) => {
      setAadharCard(text);
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(text)) {
        setAadharCardError('Invalid Aadhar Card format');
      } else {
        setAadharCardError('');
      }
    };
  
    // Validation for user type
    const [userTypeError, setUserTypeError] = useState('');
    const handleUserTypeChange = (value) => {
      setUserType(value);
      if (!value) {
        setUserTypeError('Please select a user type');
      } else {
        setUserTypeError('');
      }
    };
  
    // Validation for password
    const [passwordError, setPasswordError] = useState('');
    const handlePasswordChange = (text) => {
      setPassword(text);
      if (text.trim().length < 8) {
        setPasswordError('Password must be at least 8 characters long');
      } else {
        setPasswordError('');
      }
    };
  
    // Validation for address (optional)
    const [addressError, setAddressError] = useState('');
    const handleAddressChange = (text) => {
      setAddress(text);
      // Add any custom validation for the address field
    };
  

  const userTypes = [
    { label: "Farmer", value: "Farmer" },
    { label: "Dealer", value: "Dealer" },
  ];
  const handleLog = async () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
   
    try {
      if(username && phoneNumber &&  aadharCard &&  userType &&  password &&  address){

          register(username,phoneNumber,aadharCard,userType,password,address);
          navigation.navigate("Login");
        }else{
          alert("Please Enter All Fields as per condtions");
        }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ImageBackground
    source={require("./assets/bg.jpg")}
    style={styles.backgroundImage}
  >
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
        onChangeText={handleUsernameChange}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Phone Number"
        right={<TextInput.Affix />}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
      {phoneNumberError ? (
        <Text style={styles.error}>{phoneNumberError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Aadhar Card Number"
        placeholder="Aadhar Card Number"
        keyboardType="number-pad"
        value={aadharCard}
        onChangeText={handleAadharCardChange}
  />
  {aadharCardError ? (
    <Text style={styles.error}>{aadharCardError}</Text>
  ) : null}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={handleUserTypeChange}
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
      {userTypeError ? <Text style={styles.error}>{userTypeError}</Text> : null}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
  />
  {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Address"
        placeholder="Address"
        value={address}
        onChangeText={handleAddressChange}
  />
  {addressError ? <Text style={styles.error}>{addressError}</Text> : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
       
      </View>
      <View>
        <TouchableOpacity onPress={handleLog}>
          <Text style={{ color: "#FFD700", padding: 10,fontWeight:'bold' }}>
            {" "}
            Already Register, Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}



{
  /* For Login Code Here */
}

function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

  // Validation for phone number
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(text)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
  };

   // Validation for password
   const [passwordError, setPasswordError] = useState('');
   const handlePasswordChange = (text) => {
     setPassword(text);
     if (text.trim().length < 8) {
       setPasswordError('Password must be at least 8 characters long');
     } else {
       setPasswordError('');
     }
   };

    // Validation for user type
    const [userTypeError, setUserTypeError] = useState('');
    const handleUserTypeChange = (value) => {
      setUserType(value);
      if (!value) {
        setUserTypeError('Please select a user type');
      } else {
        setUserTypeError('');
      }
    };

 
    const handleReg = async () => {
      navigation.navigate("Register");
    };


  const userTypes = [
    { label: "Farmer", value: "Farmer" },
    { label: "Dealer", value: "Dealer" },
  ];


  const loginhandle= async()=>{

        const db = getDatabase();
        const userRef = ref(db, 'users/' + phoneNumber);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        //console.log(phoneNumber)
        //console.log(password)
        //console.log(userType)
        if (!userData) {
          alert("Login Failed")
        }
        else{
          if(userData.password===password && userData.usertype===userType ){
            user = userType;
            userphone=phoneNumber;
            navigation.navigate("LoginHome"); 
          }
          else{
            alert("Login Failed")
          }
          
        }  
    }

  return (
    <ImageBackground
    source={require("./assets/bg.jpg")}
    style={styles.backgroundImage}
  >
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
        onChangeText={handlePhoneNumberChange}
      />
      {phoneNumberError ? (
        <Text style={styles.error}>{phoneNumberError}</Text>
      ) : null}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={handleUserTypeChange}
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
      {userTypeError ? <Text style={styles.error}>{userTypeError}</Text> : null}
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
  />
  {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={loginhandle}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      
    </View>

    <View>
        <TouchableOpacity onPress={handleReg}>
          <Text style={{ color: "#FFD700", padding: 10,fontWeight:'bold' }}>
            {" "}
            Not a User, Register 
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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

{
  /* Home */
}

function HomeScreen({ navigation }) {
  return (

    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Add') {
        iconName = focused ? 'add-circle' : 'add-circle-outline';
      } else if (route.name === 'View') {
        iconName = focused ? 'eye' : 'eye-outline';
      } else if (route.name === 'Requests') {
        iconName = focused ? 'ios-list' : 'ios-list-outline';
      } else if (route.name === 'Products') {
        iconName = focused ? 'ios-cart' : 'ios-cart-outline';
      } else if (route.name === 'Orders') {
        iconName = focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
      }
      else if(route.name === 'Chats'){
        iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
      }
     
      

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#1a73e8',
    inactiveTintColor: '#8f8f8f',
    labelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      borderTopColor: '#cccccc'
    },
    style: [{
      display: 'flex'
    }, null]
  }}
>
      {user === "Farmer" && (
        <Tab.Screen name="Add" component={AddProductScreen} initialParams={{ userphone: userphone }} options={{ headerShown: false }}  />
      )}
      {user === "Farmer" && (
        <Tab.Screen name="View" component={ViewProductScreen} initialParams={{ userphone: userphone }} options={{ headerShown: false }} />
      )}
      {user === "Farmer" && (
        <Tab.Screen name="Requests" component={OrderProductsList}  initialParams={{ userphone: userphone }} options={{ headerShown: false }} />
      )}

      {user === "Dealer" && (
        <Tab.Screen name="Products" component={ViewScreen}  options={{ headerShown: false }} />
      )}
      {user === "Dealer" && (
        <Tab.Screen name="Orders" component={ViewAcceptReject} initialParams={{ userphone: userphone }} options={{ headerShown: false }} />
      )}
      <Tab.Screen name="Chats" component={Chat} initialParams={{ userphone: userphone,usertype:user }} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}


const Chat = () => {

  const route = useRoute();
  const userphone = route.params.userphone;
  const usertype = route.params.usertype;

 const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");

    useEffect(() => {
      const db = getDatabase();
      const messageRef = ref(db, "messages");
      onValue(messageRef, (snapshot) => {
        const messages = snapshot.val();
        const messageList = [];
        for (let id in messages) {
          messageList.push({ id, ...messages[id] });
        }
        setMessages(messageList);
      });
    }, []);

    const handleSubmit = () => {
      let name =userphone
      const db = getDatabase();
      const messageRef = push(ref(db, "messages"));
      set(messageRef, { name,usertype,message  });
      setMessage("");
    };
    
  return (
    <ImageBackground
    source={require("./assets/bg.jpg")}
    style={styleschats.backgroundImage}>
   <View style={{flex: '1 1 60%', padding: 30}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <View
            key={msg.id}
            style={{
              flexDirection: "row",
              justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
              marginVertical: 10,
            }}
          >
             <View
                style={{
                  backgroundColor: msg.userType === "Dealer" ? "grey" : "white",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  maxWidth: "80%",
                }}
              >
                <Text style={{ color: msg.userType === "Farmer" ? "white" : "black" }}>
                  {msg.message}
                </Text>
                <Text style={{ color: "grey", fontSize: 12 }}>{msg.name}</Text>
              </View>

          </View>
        ))}
      </View>
      </ScrollView>
      </View>

  
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10,padding:20 }}>
          <TextInput
            placeholder="Enter Message"
            value={message}
            style={styleschats.input}
            onChangeText={setMessage}
            mode="outlined"
            label="Enter Message"
            right={<TextInput.Affix />}
          />
          <TouchableOpacity
            style={{ backgroundColor: "grey", borderRadius: 5 ,padding:10}}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "white" }}>Send</Text>
          </TouchableOpacity>
        </View>
    </View>

    </ImageBackground>
  );
};

const styleschats = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 10,
    marginTop:50,
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










export default function App() {
  return (
    <NavigationContainer style={styles2.background}>
      <Stack.Navigator initialRouteName="Get Started">
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewProducts" component={ViewProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewDealer" component={ViewScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="checkrequest" component={OrderProductsList} options={{ headerShown: false }} />
        <Stack.Screen name="ViewAcceptReject" component={ViewAcceptReject} options={{ headerShown: false }} />
        <Stack.Screen name="Chats" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginHome" component={GetStartedFarmer} options={{ headerShown: false }} />
        
        <Stack.Screen name="Get Started" component={GetStarted} options={{ headerShown: false }} />
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
