import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Pengaduan from '../Screens/Pengaduan';

const PengaduanPage = createStackNavigator({
  Pengaduan: {
    screen: Pengaduan,
    navigationOptions: {
      title: "Pengaduan",
    },
  }
})

export default createAppContainer(PengaduanPage)