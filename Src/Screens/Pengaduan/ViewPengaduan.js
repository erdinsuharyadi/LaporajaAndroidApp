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
import {connect} from "react-redux";
import { axiosGet } from '../../Utils/axios'
import moment from 'moment'

class ViewPengaduan extends React.Component {
  state = {
    dataPengaduan: {},
  };

  getDetailPengaduan() {
    axiosGet('/pengaduan/id/'+this.props.navigation.state.params.idpengaduan).then(res => {
      let result = res.data.result[0];      
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


  componentDidMount = async () => {
    this.getDetailPengaduan()
  }


  render() {
    const {getUser: {userDetails}} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:10, marginBottom:5, alignItems:'center', justifyContent:'center', paddingVertical:20}}>
            <Image
              source={{
                uri: this.state.dataPengaduan.photo ? this.state.dataPengaduan.photo : 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577315841/hiringapp/assets/ava1.png'
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
            <Text>Tanggal</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{moment(this.state.dataPengaduan.createdAt).format('llll')}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Pengaduan</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dataPengaduan.jenis_ajuan || 'Pengaduan'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Deskripsi</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dataPengaduan.deskripsi || 'Deskripsi'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:5, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Lokasi</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dataPengaduan.lokasi || 'Lokasi'}</Text>
          </View>
          <View style={{Height: 900, backgroundColor:'white', marginHorizontal:10, marginTop:5, marginBottom:20, paddingVertical:10, paddingHorizontal:10}}>
            <Text>Status</Text>
            <Text style={{fontSize:20, color:Color.textDark, fontWeight:'500'}}>{this.state.dataPengaduan.status == '1' ? 'Pending' : (this.state.dataPengaduan.status == '2' ? 'Proses' : 'Closed')}</Text>
          </View>
          
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPengaduan);

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
