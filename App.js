import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantList from './src/screens/RestaurantList';
import RestaurantMenu from './src/screens/RestaurantMenu';
import GlobalInfoProvider from './src/context/GlobalInfoContext';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <GlobalInfoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={RestaurantList} />
          <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalInfoProvider>
  );
};

export default App;
