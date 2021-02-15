
/*Example of RealM Database in React Native*/
import React from 'react';

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

//Import external files
import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';


const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'KamaiBook',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
  Register: {
    screen: RegisterUser,
    navigationOptions: {
      title: 'Add Row',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);
