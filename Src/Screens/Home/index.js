import React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import Color from '../../Assets/Color'
import Icon from 'react-native-vector-icons/FontAwesome5'
const { width, height } = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../Assets/Images/Info/image-1.jpg'),
        require('../../Assets/Images/Info/image-2.jpeg'),
        require('../../Assets/Images/Info/image-3.png'),
      ]
    };
  }
  
  render() {

    return (
     <View style={styles.container}>
       <SliderBox
          images={this.state.images}
          sliderBoxHeight={height-450}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor={Color.primary}
          inactiveDotColor="#bababa"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
        <View style={{alignSelf:'center', marginVertical:20}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Aplikasi Pengaduan Masyarakat</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center' , height:100}}>
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Pengaduan')}}>
            <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20, width:100, height:100, padding:5, backgroundColor:'#f7f5f5', borderRadius:10}}>
              <Icon name='eye' size={25} style={{marginBottom:5}} />
              <Text style={{textAlign:'center'}}>View Pengaduan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('AddPengaduan')}}>
            <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20, width:100, height:100, padding:5, backgroundColor:'#f7f5f5', borderRadius:10}}>
              <Icon name='plus' size={25} style={{marginBottom:5}} />
              <Text style={{textAlign:'center'}}>Tambah Pengaduan</Text>
            </View>
          </TouchableOpacity>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
  },
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