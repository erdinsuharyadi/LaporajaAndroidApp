import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import Loader from "../../Components/Loader";
import { SliderBox } from "react-native-image-slider-box";
import Color from '../../Assets/Color'
const { width, height } = Dimensions.get('window');

class Board extends Component {


  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../Assets/Images/Front/front-1.jpeg'),
        require('../../Assets/Images/Front/front-2.jpeg'),
        require('../../Assets/Images/Front/front-3.jpg'),
      ]
    };
  }

	render() {
    const { handleSubmit, loginUser} = this.props;
    console.log(loginUser);
		return(
			<View style={styles.container}>
        
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={height-250}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          dotColor={Color.primary}
          inactiveDotColor="#bababa"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />

        {(loginUser && loginUser.isLoading) && <Loader />}
        <View style={{flex:1,alignItems:'center', marginTop: 30, marginHorizontal: 10, marginBottom:20,}}>
          <Text style={{fontSize:17, fontWeight:'bold', elevation:2}}>Laporaja</Text>
          <Text style={{fontSize:15, textAlign:'center'}}>Aplikasi pengaduan masyarakat</Text>
        </View>
        <View style={{flex:4}}>
          <TouchableOpacity style={styles.btnCreate} onPress={() => {this.props.navigation.navigate('Signup')}}>
            <Text style={styles.btnTextCreate}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogin} onPress={()=> {this.props.navigation.navigate('Login')}}>
            <Text style={styles.btnTextLogin}>LOGIN</Text>
          </TouchableOpacity>
				</View>
			</View>
			)
	}
}

mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default 
  connect(mapStateToProps, mapDispatchToProps)
(Board);


const styles = StyleSheet.create({
  container : {
    backgroundColor:'#ffffff',
    flex: 1,
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'#706f6f',
  	fontSize:16
  },
  signupButton: {
  	color:'#706f6f',
  	fontSize:16,
  	fontWeight: 'bold'
  },
  btnCreate: {
    width:'95%',
    backgroundColor:Color.primary,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 5,
    paddingVertical: 15,
    alignSelf:'center',
    justifyContent: 'center'
  },
  btnLogin: {
    width:'95%',
    borderWidth: 1.5,
    borderRadius: 25,
    marginTop: 15,
    marginBottom: 20,
    paddingVertical: 15,
    alignSelf:'center',
    justifyContent: 'center'
  },
  btnTextCreate: {
    fontSize:16,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign:'center'
  },
  btnTextLogin: {
    fontSize:16,
    fontWeight:'bold',
    color:'rgb(0,0,0)',
    textAlign:'center'
  },
});