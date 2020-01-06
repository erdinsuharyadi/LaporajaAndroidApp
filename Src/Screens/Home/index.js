import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native'


class Home extends Component {

  
  
  render() {

    return (
     <View>
       <Text>ini HOME</Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  
  gridView: {
    marginTop: 0,
    flex: 1,
    marginBottom: 25,
    paddingBottom:20,
  },
  name: {
      position: 'absolute',
      color: '#fff',
      paddingLeft: 5,
      paddingBottom: 10
  },

  itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 100,
      height: 200,
      position: 'relative'
  },
  itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
  },
  itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
  },
});

export default Home;