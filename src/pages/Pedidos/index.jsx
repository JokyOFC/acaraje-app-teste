
import { useState } from "react";

import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"

import { Card } from "../../components/Card"

import orders from "../../api/json/orders.json"
// import { RadioButton } from "react-native-paper"

import { useNavigation } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";
import { format } from "date-fns";

export const Pedidos = () => {

    const navigator = useNavigation();
    
    const [ checked, setChecked ] = useState(0)
    
    const radio_props = [
        {label: 'Todos', value: checked},
        {label: 'Ordenar Por X', value: checked},
        {label: 'Ordenar Por Y', value: checked},
    ]

    return (
        <SafeAreaView style={{ flex: 1, height: 500 }}>
            <View>
                <View style={styles.top}>
                    <Text style={{ fontSize: 25 }}>Pedidos</Text>
                    <View style={{ padding: 10, paddingBottom: 2 }}>
                        <RadioForm formHorizontal={true} 
                            radio_props={radio_props}
                            initial={0}
                            buttonColor={'#BBBBBB'}
                            selectedButtonColor={'#BBBBBB'}
                            animation={true}
                            buttonSize={12}
                            labelStyle={{ paddingRight: "3%" }}
                            onPress={(value) => setChecked(value)}
                        />
                    </View>
                </View>
                <ScrollView style={{ maxHeight: "87%", maxWidth: 450 }}>
                    <View style={{ alignItems: "center" }}>
                        {
                            orders.map((order) => {
                                // const [ page, setPage ] = useState()
                                // setPage()
                                const datavenda = new Date(order.createdAt);
                                let data = format(datavenda, "dd/MM/yyyy")
                                // let data = datavenda.toLocaleDateString()
                                // let ye = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(datavenda);
                                // let mo = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(datavenda);
                                // let da = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(datavenda);
                                return(
                                <Card key={order._id} onPress={() => {navigator.navigate('Pedido', {
                                    orderId: order._id
                                })}}>
                                    <View>
                                        <View>
                                            <Text style={{fontSize: 20}}>
                                                {order.id} - {order.cliente}
                                            </Text>
                                        </View>
                                        <View style={{paddingLeft: "3%", paddingTop: "1%"}}>
                                            <Text style={{ color: "#AAAAAA"}}>
                                                Qntd. de Produtos: {order.products.length}
                                            </Text>
                                            <Text style={{ color: "#AAAAAA"}}>
                                                Pagamento: {order.paymentMethod.name}
                                            </Text>
                                            <Text style={{ color: "#AAAAAA"}}>
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
                                            <Text style={{fontSize: 12, color: "#AAAAAA"}}>{data}</Text>
                                        </View>
                                </Card>
                            )})
                        }
                    </View>
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