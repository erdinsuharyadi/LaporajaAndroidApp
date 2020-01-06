import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import BottomTabNav from './BottomTabNav';
import AddPengaduan from '../Screens/Pengaduan/AddPengaduan';
import ViewPengaduan from '../Screens/Pengaduan/ViewPengaduan';

const HomeNavigation = createStackNavigator({
  Main: { 
    screen: BottomTabNav,
    navigationOptions: {
      headerShown: false
    }, 
  },
  AddPengaduan: { 
    screen: AddPengaduan,
    navigationOptions: {
      title: "Tambah Pengaduan"
    }
  },
  ViewPengaduan: { 
    screen: ViewPengaduan,
    navigationOptions: {
      title: "Detail Pengaduan"
    }
  },
},{
  
  })

export default createAppContainer(HomeNavigation)