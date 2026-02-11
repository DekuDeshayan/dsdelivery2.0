import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from "./Home";
import Orders from "./Orders";
import Header from "./Header";
import OrderDetails from "./OrderDetails";
import { AutoTranslateProvider } from "./utils/AutoTranslateContext";
import { Order } from "./types/type"; // Update this path to match your actual types file location

type RootStackParamList = {
  Home: undefined;
  Orders: undefined;
  OrderDetails: { order: Order };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {

    return (
        // <NavigationContainer>
        // <Stack.Navigator 
        //     screenOptions={{
        //     header: () => <Header />,    
        //     //headerShown: true, 
        //     contentStyle: {backgroundColor: '#FFF'}}}>

        //     <Stack.Screen name="Home" component={Home}/>
        //     <Stack.Screen name="Orders" component={Orders}/>
        //     <Stack.Screen name="OrderDetails" component={OrderDetails}/>

        // </Stack.Navigator>
        // </NavigationContainer>
        <AutoTranslateProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    screenOptions={{
                        header: () => <Header />,    
                        contentStyle: {backgroundColor: '#FFF'}
                    }}>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Orders" component={Orders}/>
                    <Stack.Screen name="OrderDetails" component={OrderDetails}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AutoTranslateProvider>
    )
}