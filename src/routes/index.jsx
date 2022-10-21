import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

import { Home } from "../pages/Home";
import { Select } from "../pages/Select";
import { CriarPedidos } from "../pages/CriarPedidos";

const Stack = createNativeStackNavigator();

export const Routes = () => {
    return(
     <Stack.Navigator>
        <Stack.Screen name="Select" component={Select} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="CriarPedido" component={CriarPedidos} options={{headerShown: false}} />
     </Stack.Navigator>   
    )
}