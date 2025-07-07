const React = require('react');
const { useState } = require('react');
const { Alert, Text, TextInput, TouchableOpacity, View } = require('react-native');
const firestore = require('@react-native-firebase/firestore');
const AsyncStorage = require('@react-native-async-storage/async-storage');

const usersCollection = firestore().collection('Users');

function Login({ navigation }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  async function authentication() {
    const userKey = `${name}-${email}`;
    const user = await usersCollection.doc(userKey).get();
    console.log();

    if (user.data() !== undefined) {
      // Users already exists.
      console.log(user.data());
      await AsyncStorage.setItem('userEmail', user.data().email);
      await AsyncStorage.setItem('userName', user.data().name);
      navigation.navigate('Home');
    } else {
      firestore()
        .collection('Users')
        .doc(userKey)
        .set({
          name: name,
          email: email
        })
        .then(() => {
          console.log("User added");
        })
        .catch((ex) => {
          console.log("Err", ex);
        });
      alert('User New');
    }
  }

  return (
    <View style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <TextInput onChangeText={(text) => setName(text)} placeholder='Name' />
      <TextInput onChangeText={(text) => setEmail(text)} placeholder='Email' />
      <TouchableOpacity onPress={authentication}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

module.exports = Login;
