import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useState,useEffect } from "react";
import {firebase} from './config';


import Login from "./components/src/login";
import Dashboard from "./components/src/dashboard";
import Register from "./components/src/register";
import Header from "./components/header";
import ExpoMap from "./components/expomaps";


const Stack = createNativeStackNavigator();
function App(){

const [initializing,setInitializing]=useState(true);
const [user,setUser]=useState();

// haldle the user state change

function onAuthStateChanged(user){
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(()=>{
  const subuser=firebase.auth().onAuthStateChanged(onAuthStateChanged);
  return subuser;
},[]);

if (initializing) return null;

if (!user){
  return(
    <Stack.Navigator>
      <Stack.Screen
       name="Login"
       component={Login}
       options={{
        headerTitle:()=> <Header name="Chaudhry Tracker"/>,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:'#90EE90',
      }
       }}
      />
      <Stack.Screen
       name="Register"
       component={Register}
       options={{
        headerTitle:()=> <Header name="Register Your Account"/>,
        headerStyle:{
          height:150,
          borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:'#90EE90',
        // shadowColor:'#000',
        // elevations:25  
        }
       }}
      />
      
    </Stack.Navigator>
  );
}
return(
  <Stack.Navigator>
  <Stack.Screen
   name="Dashboard"
   component={ExpoMap}
   options={{
    headerTitle:()=> <Header name={'Track-Buddy'}/>,
    headerStyle:{
      height:150,
      borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    backgroundColor:'#90EE90',
    // shadowColor:'#000',
    // elevations:25  
    }
   }}
  />
    </Stack.Navigator>
);
}
export default ()=>{
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
