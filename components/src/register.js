import { View, Text ,TextInput,TouchableOpacity,style,StyleSheet} from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import {firebase} from '../../config'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { getFirestore,addDoc, collection,getDocs } from "firebase/firestore";



const Register = () => {
 const [email,setEmail] = useState('')
 const [password,setPassword]=useState('')
 const [firstName, setFirstName] = useState([])
 const [lastName, setLastName] = useState('')
 const auth = getAuth();
const db = getFirestore();

async function singup(email,password,firstName,lastName) {
  try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // console.log(res.user.uid)
      const uid = res.user.uid
      const docRef = await addDoc(collection(db, "users"), {
          email: email,
          password: password,
          uid: uid,
          firstName: firstName,
          lastName: lastName
      });
      alert("User created successfully !!")
      console.log("Document written with ID: ", docRef.id);
      return { error: false, message: "user created" }
  }
  catch (error) {
      console.log(error.message)
      alert(error.message)
      return { error: true, message: "user not created" }
  }
}

return(
  <View style={styles.container}>
    <Text  style={{fontWeight:'bold',fontSize:25,color:'#90EE90'}}>
      "SignUp Page"
    </Text>
    <View style={{marginTop:20}}>
    <TextInput 
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={(firstName)=> setFirstName(firstName)}
          autoCorrect={false}
          />
    <TextInput 
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={(lastName)=> setLastName(lastName)}
          autoCorrect={false}
          />
          <TextInput 
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email)=> setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          />
          <TextInput 
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password)=> setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          />
    </View>
    <TouchableOpacity
    onPress={()=> singup(email,password,firstName,lastName)}
    style={StyleSheet.button}
    >
    <Text style={{fontWeight:'bold',borderWidth:1,width:100,height:25,fontSize:16,textAlign:'center',marginTop:30,backgroundColor:'#90EE90',color:'white' , borderColor:'white',borderRadius:6}}>SignUp </Text>
    </TouchableOpacity>
  </View>
 )
}

export default Register


const styles= StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      marginTop:60,
  },
  textInput:{
      paddingTop:20,
      paddingBottom:10,
      width:400,
      // fontSize:20,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      marginBottom:10,
      textAlign:'center',
  },
  button:{
      marginTop:50,
      height:70,
      width:250,
      backgroundColor:'#90EE90',
      alignItems:'center',
      justifyContent:"center",
      borderRadius:50,

  }
} )