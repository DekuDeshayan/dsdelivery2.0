import { StyleSheet, ScrollView, Pressable, Text, View, Alert, ActivityIndicator } from 'react-native';
import OrderCard from './orderCard';
import { useEffect, useState } from 'react';
import { fetchOrders } from '../Services/api';
import { Order } from '../types/type';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAutoTranslate } from '../utils/AutoTranslateContext';

type RootStackParamList = {
  OrderDetails: { order: Order };
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useAutoTranslate();
   
  useEffect(() => {
    setLoading(true);
    fetchOrders().then(response =>
      setOrders(response.data)
    ).catch(error => 
      Alert.alert(t("Erro"), t("Não foi possível buscar os pedidos"))
    ).finally(() => setLoading(false));
  }, [t]);
  
  const handleOnPress = (order: Order) => {
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
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('Carregando...')}</Text>
            <ActivityIndicator size="large" color="#DA5C5C" />
          </View>
        }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  }
});