import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Orders from "./Orders";
import Header from "./Header";
import OrderDetails from "./OrderDetails";


const Stack = createNativeStackNavigator();

export default function Routes() {

    return (
        <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
            header: () => <Header />,    
            //headerShown: true, 
            contentStyle: {backgroundColor: '#FFF'}}}>

            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Orders" component={Orders}/>
            <Stack.Screen name="OrderDetails" component={OrderDetails}/>

        </Stack.Navigator>
        </NavigationContainer>
    )
}