import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { TextInput as Input } from "react-native-paper";
import { Header } from "react-native-elements";

const ChatApp = ({ navigation }) => {
 const route = useRoute();
 const userphone = route.params.userphone;

  //const userphone = "9975777709";
  
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

  const handleLogout = () => {
    navigation.navigate("Login");
    };
  
  const handleSubmit = () => {
    let name = userphone;
    const db = getDatabase();
    const messageRef = push(ref(db, "messages"));
    set(messageRef, { name, message });
    setMessage("");
  };
  
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.messageContainer}>
            {messages.map((msg, index) => (
              <View
                key={msg.id}
                style={{
                  flexDirection: "row",
                  justifyContent:
                    index % 2 === 0 ? "flex-start" : "flex-end",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    maxWidth: "80%",
                  }}
                >
                  <Text style={{ color: "white" }}>{msg.message}</Text>
                  <Text style={{ color: "yellow", fontSize: 10 }}>
                    {msg.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter Message"
            value={message}
            style={styles.input}
            onChangeText={setMessage}
            right={<Input.Affix />}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "white" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 20,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
  },
  button: {
    backgroundColor: "grey",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
};

export default ChatApp;
