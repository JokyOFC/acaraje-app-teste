
import { useState, useEffect, useContext } from "react";

import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"

import { Card } from "../../components/Card"

// import orders from "../../api/json/orders.json"
// import { RadioButton } from "react-native-paper"

import { useNavigation } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";
import { format } from "date-fns";

import { EmpContext } from "../../contexts/emp";

import api from "../../api/api";

export const Pedidos = () => {

    const { empr, filiais, profilePhoto } = useContext(EmpContext)

    const navigator = useNavigation();
    
    const [ checked, setChecked ] = useState(0)

    const [ orders, setOrder ] = useState([])
    
    const radio_props = [
        {label: 'Todos', value: checked},
        {label: 'Ordenar Por X', value: checked},
        {label: 'Ordenar Por Y', value: checked},
    ]

    useEffect(() => {
        async function findOrders() {
            const response = await api.post('/orders/base', { id: empr })

            setOrder(...response.data)

            console.log('there is orders by base!!')
            console.log(orders)

        }

        findOrders()
    }, [])

    const semPedidos = () => {
        console.log("Não tenho pedidos!!")
        return(
            <View style={{ alignItems: "center", justifyContent: "center"}}>
                <Text style={{ color: '#ea9247', fontSize: 25, marginTop: "75%"}} > Sem Pedidos! :( </Text>
                <Text style={{ color: '#ea9247', fontSize: 15, marginTop: "2%"}}>Crie novos pedidos para popular esta tela!</Text>
            </View>
        )
    }

    const pedidosPopulated = () => {
        console.log("Tenho pedidos!!")
        return(
            <View style={{ alignItems: "center" }}>
                                {
                                    orders.map((order) => {
                                        // const [ page, setPage ] = useState()
                                        // setPage()

                                        console.log(order._id)

                                        const datavenda = new Date(order.createdAt);
                                        let data = format(datavenda, "dd/MM/yyyy")
                                        // let data = datavenda.toLocaleDateString()
                                        // let ye = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(datavenda);
                                        // let mo = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(datavenda);
                                        // let da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(datavenda);
                                        return(
                                        <Card key={order._id} onPress={() => {navigator.navigate('Pedido', {
                                            orderId: order._id,
                                            orderObj: order
                                        })}} pad={25}>
                                            <View>
                                                <View>
                                                    <Text style={{fontSize: 20, color: "white"}}>
                                                        {order.cliente}
                                                    </Text>
                                                </View>
                                                <View style={{paddingLeft: "3%", paddingTop: "1%"}}>
                                                    <Text style={{ color: "#ebebeb"}}>
                                                        Qntd. de Produtos: {order.products.length}
                                                    </Text>
                                                    <Text style={{ color: "#ebebeb"}}>
                                                        Pagamento: {order.paymentMethod.name}
                                                    </Text>
                                                    <Text style={{ color: "#ebebeb"}}>
                                                        Status: {order.finished === true ? <Text style={{ color: "green"}}>Finalizado</Text> : <Text style={{ color: "red"}}>Em Andamento</Text>}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems: "center", justifyContent: "center", padding: 14}}>
                                                <Text style={{ color: "green", fontWeight: "bold" }}>
                                                    Total
                                                </Text>
                                                <Text style={{ color: "green" }}>R${order.total}.00</Text>
                                            </View>
                                                <View style={{alignItems: "flex-end", justifyContent: "flex-end"}}>
                                                    <Text style={{fontSize: 12, color: "#ebebeb"}}>{data}</Text>
                                                </View>
                                        </Card>
                                    )})
                                }
                            </View>
            )
    }

    return (
        <SafeAreaView style={{ flex: 1, height: 500 }}>
                <View>
                    <View style={styles.top}>
                        <Text style={{ fontSize: 25 }}>Pedidos</Text>
                        <View style={{ padding: 10, paddingBottom: 2 }}>
                            <RadioForm formHorizontal={true} 
                                radio_props={radio_props}
                                initial={0}
                                buttonColor={'#ea9247'}
                                selectedButtonColor={'#ea9247'}
                                animation={true}
                                buttonSize={12}
                                labelStyle={{ paddingRight: "3%" }}
                                onPress={(value) => setChecked(value)}
                            />
                        </View>
                    </View>
                    <ScrollView style={{ maxHeight: "87%", maxWidth: 450 }}>
                        {
                            (orders && pedidosPopulated()) || semPedidos()
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    top: {
        padding: 35,
        paddingLeft: 15,
        paddingBottom: 0
    }
})