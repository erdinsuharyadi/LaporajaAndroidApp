import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Profile from '../Screens/Profile';

const ProfilePage = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile",
    },
  }
})

export default createAppContainer(ProfilePage)