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

import { Modal, ActivityIndicator, View } from 'react-native';
import { useContext, useEffect } from "react";
import { EmpContext, useEmpContext } from "../contexts/emp";

const Stack = createNativeStackNavigator();

export const Routes = () => {

    const { loading, setLoading } = useEmpContext();

    useEffect(() => {

        console.log(loading)
        // setLoading(false);

    }, [])

    return(
        <>
            <Modal visible={loading} transparent style={{ display: 'flex' , minHeight: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ opacity: 0.5, backgroundColor: 'black', display: 'flex' , minHeight: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#d2691e' />
                </View>    
            </Modal>
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
        </>
    )
}