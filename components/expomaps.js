import React,{useEffect,useState}from 'react';
import MapView ,{Marker}from 'react-native-maps';
import { StyleSheet,Text, View,Dimensions,Button,TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
// dashboard 

import {firebase} from '../config'
import { SafeAreaView } from 'react-native-safe-area-context'
import {getFirestore, collection,query,where, getDocs} from "firebase/firestore";
import {getAuth} from "firebase/auth";


export default function ExpoMap() {
  const[mapRegion,setMapRegion]=useState({
    latitude: 37.78825,
    longitude:-122.4324,
    latitudeDelta:0.0922,
    logitudeDelta:0.0421,
  });
  const userLocation = async () =>{
    let {status}=await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission To access location was denied');

  }
    let location=await Location.getCurrentPositionAsync({enableHighAccuracy: true});
   setMapRegion({
latitude:location.coords.latitude,
longitude:location.coords.longitude,
latitudeDelta:0.0922,
longitudeDelta:0.0421,
   });
   console.log(location);
  }

  useEffect(()=>{
    userLocation();
  },[]);

  // dash 
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




  return (
  <View style={styles.container}>
    {/* currentUser Name  */}
 <SafeAreaView style={styles.dash}>
 <Text style={styles.text}>
    Hii {userData.firstName} !
   </Text>
   
 </SafeAreaView>
 {/* map code  */}
 <MapView style={styles.map} 
      region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker'/>
      </MapView>
      {/* map button  */}
      <Button style={styles.trackButton} title='Track Buddy'  onPress={userLocation}/>
      {/* logout button  */}
      <TouchableOpacity
   onPress={()=> {firebase.auth().signOut()}}
   style={styles.button}>
    <Text style={styles.logoutButton}>
    LogOut
    </Text>
   </TouchableOpacity>
    

     
    </View>
  );
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems:'center',
},

trackButton:{
position:'absolute',
marginTop:-90,
width:'100%'
},
dash:{
marginBottom:10,
marginRight:80,
},
text:{
position:'absolute',
marginTop:7,
fontSize:18,
color:'#90EE90',
fontWeight:'bold',
textAlign:'center',
},
button:{
  marginTop:20,
  height:40,
  width:"100%",
  backgroundColor:'#90EE90',
  alignItems:'center',
  justifyContent:"center",
},
logoutButton:{
  fontSize:18,
  fontWeight:'bold',
  color:'white',
  width:80,
  
  backgroundColor:'#90EE90',
  textAlign:'center',
}
,
map: {
    position:'relative',
    width: '100%',
    height: '75%',
  },
});
