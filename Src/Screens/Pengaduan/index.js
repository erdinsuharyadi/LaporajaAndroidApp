import React, {Component} from 'react';
import axios from 'axios'
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { axiosGet } from '../../Utils/axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import Color from '../../Assets/Color'

function Item({ item }) {
  
}

class Pengaduan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.getToken || null,
      dataPengaduan: [],
    };
  }


  getData() {
    axiosGet('/pengaduan/user/' + this.props.getUser.id_user ).then(res => {
      console.log('res getData:', res.data.result);
      let result = res.data.result;
      this.setState({
        dataPengaduan: result
      })
    }).catch(err => {
      if (err.response) {
          return console.log(err.response.data.result[0])
      }
      if (err.request) {
          return console.log('error from request', err.request);
      }
      else {
          console.log(err)
      }
  })

    
  }
  
  componentDidMount() {
    this.getData()
    
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        // this.setState({isLoading: false})
        this.getData()
      })
    ]    
  }

  render() {
    
    return (
    
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.dataPengaduan}
          renderItem={({ item, index }) => 
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ViewPengaduan',{
              idpengaduan: item.id_pengaduan,
            })}}>      
            <View style={styles.listItem}>
              {item.status === '2' ? 
                ( <Icon name="check-circle" size={50} color="#98fb79" style={{alignSelf: 'center'}} solid  /> ) : 
                (item.status === '1' ? ( <Icon name="clock" size={50} color="#81dafc" style={{alignSelf: 'center'}} solid  /> ) : 
                (item.status === '0' ? (<Icon name="times-circle" size={50} color="#fa3663" style={{alignSelf: 'center'}} solid />) : 
                (<Icon name="minus-circle" size={50} color='black' style={{alignSelf: 'center'}} solid />)) )
              }
             
              <View style={{flex:1, marginLeft:10}}>
                <Text style={{fontWeight:"bold", fontSize:18, color:'#706f6f'}}>{item.jenis_ajuan}</Text>
                <View style={styles.divider} />
                <Text style={{color:'#706f6f'}}>{moment(item.createdAt).format("llll")}</Text>
              </View>
            </View>
            </TouchableOpacity>
            
          }
          keyExtractor={item => item.createdAt}
        />
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() =>{this.props.navigation.navigate('AddPengaduan')}}
        >
          <Icon name="plus"  size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
   
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:0,
    paddingTop:15
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#fafafafa",
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:10,     
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'gray',
    shadowOpacity: 1,
    elevation: 3, 
  },
  divider: {
    marginVertical: 5,
    width: "99%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  floatBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 20,
    backgroundColor:Color.primary,
    borderRadius:100,
  },
});

mapStateToProps = (state) => ({
  getToken: state.authReducer.authData.token,
  getUser: state.userReducer.getUser.userDetails
});

export default connect(mapStateToProps)(Pengaduan);