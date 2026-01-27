import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Order } from '../types/type';
import OrderCard from '../Orders/orderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../Services/api';


type RootStackParamList = {
  Orders: undefined;
};

type Props = {
  route: {
    params:{
      order: Order;
    }
  }
}

export default function OrderDetails({route}:Props) {

  const {order} = route.params;

  
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    
      const handleCancelOrder = () => {
          navigation.navigate('Orders');
      }

      const handleConfirmDelivery = () => {
          confirmDelivery(order.id).then(() => {
              Alert.alert("Success", `Delivery Number ${order.id} confirmed`);
              navigation.navigate('Orders');
          }).catch(() => {
              Alert.alert("Error", `Could not confirm delivery for order Number ${order.id}`);
          });
      }

      // const handleStartNavigation = () => {
      //     Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}&travelmode=driving`);
      // }

      const handleStartNavigation = () => {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${order.latitude},${order.longitude}`);
      }



  return (
    <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button} onPress={handleStartNavigation}>
            <Text style={styles.buttonText}>Start Navigation</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleConfirmDelivery}>
            <Text style={styles.buttonText}>Confirm Delivery</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleCancelOrder}>
            <Text style={styles.buttonText}>Cancel</Text>
        </RectButton>
    </View>
  );


}

const styles = StyleSheet.create(
{
  container: {
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold'
  }
}

);
