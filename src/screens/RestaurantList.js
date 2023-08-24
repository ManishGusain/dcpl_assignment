import { useContext } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalInfo } from '../context/GlobalInfoContext';

const RestaurantList = ({ orderStreak }) => {
  const navigation = useNavigation();
  const { coup } = useContext(GlobalInfo);
  const [coupon, setCoupon] = coup;

  const restaurants = [
    { id: 1, name: 'Taj Mahal Curry House', imageUri: 'https://images.unsplash.com/photo-1588110919463-73dfc27cacf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnQlMjBmcm9udHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Spice Junction', imageUri: 'https://images.unsplash.com/photo-1588110919463-73dfc27cacf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnQlMjBmcm9udHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Royal India Bistro', imageUri: 'https://images.unsplash.com/photo-1588110919463-73dfc27cacf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnQlMjBmcm9udHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Namaste Indian Cuisine', imageUri: 'https://images.unsplash.com/photo-1588110919463-73dfc27cacf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnQlMjBmcm9udHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
  ];

  const handleRestaurantClick = (restaurant) => {
    if (orderStreak < 5) {
      alert('Order streak too low! Your streak will break.');
    } else {
      navigation.navigate('RestaurantMenu', { restaurant });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant List</Text>
      <Text style={styles.subtitle}>Coupon : {coupon}</Text>
      {restaurants.map((restaurant) => (
        <Pressable
          key={restaurant.id}
          onPress={() => handleRestaurantClick(restaurant)}
          style={styles.restaurantItem}
        >
          <Image source={{ uri: restaurant.imageUri }} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RestaurantList;
