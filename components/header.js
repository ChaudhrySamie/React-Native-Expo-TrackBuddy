import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{marginLeft:10}}>
      <Text style={{fontWeight:'bold',fontSize:24,color:'white'}}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header