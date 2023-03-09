import * as React from 'react';
import { useState, useEffect  } from 'react';
import { View, Text, TextInput,TouchableOpacity,StyleSheet,Button,Image,FlatList,Alert,KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

{/* For Register Code Here */}
function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    try {
      const userData = { username, phoneNumber, aadharCard, userType,password,address };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log("setItem called");
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        style={styles.input}
        keyboardType='phone-pad'
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Aadhar Card"
        value={aadharCard}
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(text) => setAadharCard(text)}
      />

      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item label="Farmer" value="farmer" />
        <Picker.Item label="Dealer" value="dealer" />
      </Picker>

      <TextInput
        placeholder="Password"
        value={password}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />


      <TextInput
        placeholder="Address"
        value={address}
        style={styles.input}
        onChangeText={(text) => setAddress(text)}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.buttonContainer}>
        <Text style={styles.buttonText} >Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonContainer}>
        <Text style={styles.buttonText} >Go to Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  header: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  picker: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
    }
});


{/* For Login Code Here */}

function LoginScreen({ navigation }) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        if (
          parsedUserData.phoneNumber === phoneNumber &&
          parsedUserData.userType === userType &&
          parsedUserData.password === password
        ) {
          alert("Login Success")
          //navigation.navigate('Home'); // navigate to home screen after successful login
        } else {
          console.log("show error message or handle incorrect login details")
          alert("Login Failed")
        }
      } else {
        console.log("show error message or handle no user data found")
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles_2.container}>
      <Text style={styles_2.header}>Login</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        style={styles_2.input}
        onChangeText={(text) => setPhoneNumber(text)}
      />
        <TextInput
        placeholder="Password"
        value={password}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <View style={styles_2.pickerContainer}>
        <Text style={styles_2.pickerLabel}>User Type:</Text>
        <Picker
          selectedValue={userType}
          style={styles_2.picker}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >
          <Picker.Item label="Farmer" value="farmer" />
          <Picker.Item label="Dealer" value="dealer" />
        </Picker>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles_2.buttonContainer}>
        <Text style={styles_2.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles_2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 16
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  pickerLabel: {
    fontSize: 18,
    marginRight: 8
  },
  picker: {
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 12,
    marginTop: 32
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}


