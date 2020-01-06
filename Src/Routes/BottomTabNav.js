import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../Screens/Home';
import ProfilePage from './ProfilePage';
import PengaduanPage from './PengaduanPage';
import Color from '../Assets/Color'

const BottomTabNav = createBottomTabNavigator({
  Home: Home,
  Pengaduan: {
    screen: PengaduanPage,
  },
  Profile: {
    screen: ProfilePage,
  },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Pengaduan') {
        iconName = 'clipboard-list';
      } else if (routeName === 'Profile') {
        iconName = 'user-tie';
      }
      return <Icon name={iconName} size={26} color={focused ? Color.primary : '#bababa'} />;
    },
  }), 
  tabBarOptions: {
    activeTintColor: Color.primary,
    inactiveTintColor: '#bababa',
    style:{
      height:60, 
      paddingBottom: 8, 
      paddingTop: 8,
      borderTopWidth:0, 
      borderTopColor:'white',
    },
  }
}
);

export default BottomTabNav;
