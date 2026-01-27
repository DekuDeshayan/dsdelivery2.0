import { StyleSheet, ScrollView, Pressable, Text, View, Alert, ActivityIndicator } from 'react-native';
import OrderCard from './orderCard';
import { use, useEffect, useState } from 'react';
import { fetchOrders } from '../Services/api';
import { Order } from '../types/type';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  OrderDetails: { order: Order };
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
   

  useEffect(() => {
    setLoading(true);
    fetchOrders().then(response =>
      setOrders(response.data)
      ).catch(error => Alert.alert("Error", "Could not fetch orders")
    ).finally(() => setLoading(false));
  }, []);

  
    const handleOnPress = (order:Order) => {
        navigation.navigate('OrderDetails', {
          order
        });
    }

  return (
    <>
    <ScrollView style={styles.container}>
        { 
        !loading ? orders.map(order => (
          <Pressable key={order.id} onPress={() => handleOnPress(order)}>
              <OrderCard order={order} />
          </Pressable>
          )) :
          <>
            <Text>Loading…</Text>
            <ActivityIndicator size="large" />
          </>
        }
    </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  }




});