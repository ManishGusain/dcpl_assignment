import { useContext, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { GlobalInfo } from '../context/GlobalInfoContext';
import CustomHeader from '../components/CustomHeader';

const RestaurantMenu = ({ route }) => {
  const { restaurant } = route.params;
  const res_name = restaurant.name;
  const { userStreak, coup } = useContext(GlobalInfo);
  const [streak, setStreak] = userStreak;
  const [coupon, setCoupon] = coup;
  const [itemCounts, setItemCounts] = useState({});

  const menuItems = [
    {
      id: 1,
      name: 'Biryani',
      price: 300,
      imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
    },
    {
      id: 2,
      name: 'Butter Chicken',
      price: 500,
      imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
    },
    {
      id: 3,
      name: 'Paneer Tikka',
      price: 250,
      imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
    },
  ];


  const handleIncrement = (itemId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    if (itemCounts[itemId] > 0) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: prevCounts[itemId] - 1,
      }));
    }
  };

  const handleOrder = () => {
    if (streak.length === 0) {
      setStreak([res_name, 1])
      alert('Order Placed Successfully.')
    }
    else if (streak?.length !== 0 && streak[0] !== res_name) {
      Alert.alert('Streak Break', 'Your streak will break if you place this order.', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            setStreak([res_name, 1]);
            setCoupon(0);
            alert('Order Placed Successfully.')
          },
        },
      ]);
    }
    else {
      setStreak(prev => [res_name, prev[1] + 1]);
      alert('Order Placed Successfully.')
    }

    setItemCounts({});
  }

  return (
    <>
      <CustomHeader title={res_name} />
      <View style={styles.container}>

        <ScrollView>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
              </View>
              <View style={styles.itemInfoContainer}>
                <Text style={styles.itemName}>{item.name} {'\n'} ₹{item.price}</Text>
              </View>
              <View style={styles.counterContainer}>
                <Pressable
                  onPress={() => handleDecrement(item.id)}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </Pressable>
                <Text style={styles.counterText}>{itemCounts[item.id] || 0}</Text>
                <Pressable
                  onPress={() => handleIncrement(item.id)}
                  style={styles.counterButton}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <Pressable onPress={handleOrder} style={[styles.orderButton, { display: Object.values(itemCounts).some(count => count > 0) ? 'flex' : 'none' }]}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </Pressable>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemImageContainer: {
    marginRight: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RestaurantMenu;
