import { StyleSheet, ScrollView, Text, View } from 'react-native';
import OrderCard from './orderCard';
export default function Orders() {


  return (
    <>
    <ScrollView style={styles.container}>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
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