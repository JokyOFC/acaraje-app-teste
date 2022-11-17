import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

import { Home } from "../pages/Home";
import { Select } from "../pages/Select";
import { CriarBase } from "../pages/CreateBase";

import { Finish } from "../pages/Finish";

import { Pedidos } from "../pages/Pedidos";
import { Pedido } from "../pages/Pedido";
import { CriarPedidos } from "../pages/CriarPedidos";

import { Produtos } from "../pages/Produtos";
import { Produto } from "../pages/Produto";

import { Pagamentos } from "../pages/Pagamentos";
import { Pagamento } from "../pages/Pagamento";

const Stack = createNativeStackNavigator();

export const Routes = () => {
    return(
     <Stack.Navigator>
        <Stack.Screen name="Select" component={Select} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="CriarBase" component={CriarBase} options={{headerShown: false}}/>

        <Stack.Screen name="CriarPedido" component={CriarPedidos} options={{headerShown: false}} />
        <Stack.Screen name="Pedidos" component={Pedidos} options={{headerShown: false}} />
        <Stack.Screen name="Pedido" component={Pedido} options={{headerShown: false}} />
        
        <Stack.Screen name="Produtos" component={Produtos} options={{headerShown: false}} />
        <Stack.Screen name="Produto" component={Produto} options={{headerShown: false}} />

        <Stack.Screen name="Pagamentos" component={Pagamentos} options={{headerShown: false}} />
        <Stack.Screen name="Pagamento" component={Pagamento} options={{headerShown: false}} />

        <Stack.Screen name="Finish" component={Finish} options={{headerShown: false, headerBackVisible:false }} />
     </Stack.Navigator>   
    )
}