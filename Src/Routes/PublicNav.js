import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Board from '../Screens/Board';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';

const PublicNav = createStackNavigator({
  Board,
  Login,
  Signup,

}, {
  headerMode: 'none',
  initialRouteName: 'Board'
})

export default createAppContainer(PublicNav)