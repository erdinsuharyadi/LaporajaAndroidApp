import React, { Component } from "react";
import { Image, View, StyleSheet, Text, Alert, Platform,TouchableOpacity, PermissionsAndroid, ToastAndroid } from 'react-native'
import { Container, Form, Item, Input, Label , Content, Card, CardItem,  Footer, Button,} from "native-base";
import {connect} from "react-redux";
import Color from '../../Assets/Color'
import { axiosPost } from '../../Utils/axios'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
  
class AddPengaduan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jenis_ajuan: '',
      deskripsi: '',
      lokasi: '',
      photo: null,
      avatarSource: null,
    };
  
  }



  requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
        console.log(err);
        return false
    }
  }

  changeAvatar = async type => {
    

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    let cameraPermission =
    (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) &&
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ) &&
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (!cameraPermission) {
      cameraPermission = await this.requestCameraPermission();
    } else {
      ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };


          this.setState({
            photo: response,
            avatarSource: source,
          });
        }
      })
    }
  }



  addPengaduan = async () => {
    const { deskripsi, jenis_ajuan, lokasi } = this.state

    if (deskripsi != '' && jenis_ajuan != '' && lokasi != '') {
      try {
        const response = await axiosPost("/pengaduan/", 
          createFormData(this.state.photo, {
            jenis_ajuan: this.state.jenis_ajuan,
            deskripsi: this.state.deskripsi,
            lokasi: this.state.lokasi,
          }), this.props.getToken);
        console.log("Returned data:", response);
        if (response) {
          Alert.alert(
            'Submit Success!',
            "Submit customer info successful",
            [
              {
                text: 'Ok',
                onPress: () => this.props.navigation.goback(),
                style: 'default',
              },
            ]
          );
          
        } else {
          Alert.alert(
            'Submit Failed!',
            "Submit customer info failed",
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]
          );
        }
        
      } catch (error) {
        Alert.alert(
          'Submit Error!',
          "Submit customer info error",
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
        console.log(error)
      }
    } else {
      ToastAndroid.show('Text box harus diisi!', ToastAndroid.SHORT);
    }
    
  }

  render() {
    const { userDetails } = this.props.getUser
    console.log('Token: ', this.props.getToken );
    
    return (
      <Container style={{backgroundColor : '#EEEEEE'}}>
        <Content padder>
          
          <CardItem style={{marginTop: 10}}>
            <Form style={{marginTop : -20, marginLeft : -5, width:'100%'}}>
              <View style={{marginTop:20,marginLeft:20}}>
                <Text style={{fontSize:17}}>Photo</Text>
              </View>
              <View style={{alignItems:'center', marginBottom:10}}>
                <Image source={this.state.avatarSource ? this.state.avatarSource : {uri: 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1576119042/hiringapp/assets/images.png'}} style={{width: 200, height:200, marginTop:10}} />
                <TouchableOpacity
                  style={styles.btnCamera}
                  onPress={this.changeAvatar}>
                  <Icon
                    name="add-a-photo"
                    size={30}
                    color={Color.textDark}
                  />
                </TouchableOpacity>
              </View>
              <Item stackedLabel>
                <Input 
                  style={styles.input}
                  placeholder="Jenis Ajuan"
                  onChangeText={value => this.setState({jenis_ajuan: value})}
                />
              </Item>
              <Item stackedLabel>
                <Input 
                  style={styles.input}
                  placeholder="Deskripsi"
                  onChangeText={value => this.setState({deskripsi: value})}
                />
              </Item>
              <Item stackedLabel style={{marginBottom:20}}>
                <Input 
                  style={styles.input}
                  placeholder="Lokasi"
                  onChangeText={value => this.setState({lokasi: value})}
                />
              </Item>
              
            </Form>
          </CardItem>
          
          
        </Content>
        <TouchableOpacity onPress={() => this.addPengaduan()}>
          <Footer style={{backgroundColor : Color.primary}}>
            <Text style={{marginTop : 15, color : 'white', fontSize : 15}}>
            Submit Pengaduan
            </Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

mapStateToProps = (state) => ({
  getToken: state.authReducer.authData.token,
  getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPengaduan);

const styles = StyleSheet.create({
    email: {
      width: 300,
    },
    password: {
      width: 300,
      marginTop: 15,
    },
    btnCamera: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: 'rgba(21, 22, 48, 0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
     borderBottomColor : 'grey',
      borderBottomWidth: 2,
      width: '100%',
      paddingBottom : 10
      
    },
    inputd: {
        borderBottomColor : 'grey',
         borderBottomWidth: 2,
         width : 220,
         right : 80,
         marginTop : 20
         
       },
    inputs: {
        borderBottomColor : 'grey',
         borderBottomWidth: 2,
         width : 40,
         marginTop : 20
         
       }
  });