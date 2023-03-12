import { View, Text,StyleSheet,TouchableOpacity  } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react'
import {firebase} from '../../config'
import { SafeAreaView } from 'react-native-safe-area-context'
import {getFirestore, collection,query,where, getDocs} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// import ExpoMap from '../expomaps'
//maps 




const Dashboard = () => {
  
  const auth = getAuth();
  const db = getFirestore();

  const [userData, setUserData] = useState({})
  
  async function getCurrentUserData() {
    console.log("getCurrentUserData")
    const uid = getAuth().currentUser.uid
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot)

    let copyArray = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        copyArray.push(doc.data())
    });
    console.log("copyArray==>", copyArray)

    return copyArray[0]
}

  const callApi = async () => {
      const result = await getCurrentUserData()
      console.log("Result====>", result)
      setUserData(result)
      console.log(userData)
  }

  // callApi()
  useEffect(() => {
      callApi()
  }, [])


  return(
    <SafeAreaView style={styles.container}>
 <Text style={styles.text}>
    Hii {userData.firstName} !
   </Text>
  <TouchableOpacity
   onPress={()=> {firebase.auth().signOut()}}
   style={styles.button}
   >
    <Text style={{fontSize:17,fontWeight:'bold',color:'white',}}>
    LogOut
    </Text>
   </TouchableOpacity>
   </SafeAreaView>
  )
}

export default Dashboard


const styles= StyleSheet.create({
  container:{

      flex:1,
      alignItems:'center',
      marginTop:0,
  },
  text:{
  position:'absolute',
  marginTop:10,
  fontSize:18,
  color:'#90EE90',
  fontWeight:'bold'
  
  },
  map:{
    width:300,
    marginTop:200

  },
button:{
      marginTop:20,
      height:30,
      width:100,
      backgroundColor:'#90EE90',
      alignItems:'center',
      justifyContent:"center",
      borderRadius:50,

  }
} )