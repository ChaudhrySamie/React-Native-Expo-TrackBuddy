import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../config';
import { useState } from 'react';

const Login = () => {
  const navigation=useNavigation()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  
  loginUser = async (email,password)=>{
    try{
        await firebase.auth().signInWithEmailAndPassword(email,password)
        alert('User login successfully')
    } catch(error){
        alert(error.message)
    }
  }
    return (
     <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:25,color:'#90EE90'}}>
         
        " Login Page " 
        </Text>
        <View style={{marginTop:40}}>
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
         onPress={()=> loginUser(email,password)}
         style={StyleSheet.button}
         >
            <Text style={{fontWeight:'bold',borderWidth:1,width:100,height:25,fontSize:17,textAlign:'center',marginTop:30,backgroundColor:'#90EE90',color:'white' , borderColor:'white',borderRadius:6}}>Login </Text>
            
         </TouchableOpacity>
         <TouchableOpacity
         onPress={()=> navigation.navigate('Register')}
         style={{marginTop:20}}
         >
            <Text style={{fontWeight:'bold',}}>Dont Have Register Account</Text>
            
         </TouchableOpacity>
     </View>
  )
}

export default Login

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:100,
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