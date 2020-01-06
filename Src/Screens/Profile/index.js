import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Color from '../../Assets/Color';
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import { logoutUser } from '../../Redux/Actions/auth.actions';

class Profile extends React.Component {

  signOutUser = async () => {
    this.props.dispatch(logoutUser());
  };

  alertLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Logout Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.signOutUser()},
      ],
      {cancelable: false},
    );
  }

  render() {
    const {getUser: {userDetails}} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:10, marginBottom:5, alignItems:'center', justifyContent:'center', paddingVertical:20}}>
            <Image
              source={{
                uri: userDetails.photo ? userDetails.photo : 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577315841/hiringapp/assets/ava1.png'
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                overflow: "hidden",
                borderWidth: 3,
                borderColor: "gray"
              }}
            />
            
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Full Name</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{userDetails.full_name || 'Your name'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>No HP</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{userDetails.no_hp || 'No HP'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>No KTP</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{userDetails.no_ktp || 'No KTP'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Alamat</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{userDetails.alamat || 'Address'}</Text>
          </View>
          <TouchableOpacity onPress={this.alertLogout}>
            <View style={{Height: 900, flexDirection:'row', backgroundColor:'white', marginHorizontal:10, marginTop:20, marginBottom:20, paddingVertical:10, paddingHorizontal:10, alignItems:'center', justifyContent:'center', borderRadius:10, }}>
              <Icon name="md-log-out" size={30} color={Color.redIndicator} />
              <Text style={{fontSize:20, color: Color.redIndicator, fontWeight:'bold', marginLeft:10}}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>       
      </View>
    );
  }
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  btnCamera: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEdit: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 14,
    marginBottom: 12,
  },
});
