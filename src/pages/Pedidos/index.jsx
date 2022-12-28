
import { useState, useEffect, useContext } from "react";

import { SafeAreaView, ScrollView, StyleSheet, View, Text, LogBox, TouchableOpacity } from "react-native"

import { Card } from "../../components/Card"

// import orders from "../../api/json/orders.json"
// import { RadioButton } from "react-native-paper"

import { useNavigation, useIsFocused } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";
import { format } from "date-fns";

import { EmpContext, useEmpContext } from "../../contexts/emp";

import api from "../../api/api";
import { TextInput } from "react-native-gesture-handler";

import { Icon } from "react-native-elements"
import { color } from "@storybook/addon-knobs";

export const Pedidos = () => {

    LogBox.ignoreAllLogs();

    const { empr, filiais, profilePhoto, setLoading } = useEmpContext();

    const navigator = useNavigation();
    
    const [ checked, setChecked ] = useState(0)

    const [ orders, setOrder ] = useState([])
    const [ orderMap, setOrderMap ] = useState([])
    const [ ordertest, setOrderTest ] = useState([])
    const [ ordertest2, setOrderTeste2 ] = useState([])

    const [ totalTe, setTotalTe ] = useState(0)
    const [ total, setTotal ] = useState(0)
    
    const radio_props = [
        {label: 'Todos', value: 0},
        {label: 'Em Andamento', value: 1},
        {label: 'Finalizado', value: 2},
    ]

    const isFocused = useIsFocused()

    async function findOrders() {
        setLoading(true);
        try {
            await api.post('/orders/base', { id: empr, filicod: filiais }).then((res) => {
                console.log(res.data)    
                setOrder(res.data)
                setOrderMap(res.data)
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }

        console.log('there is orders by base!!')
        console.log(orders)

    }

    function sortBy( arr ) {
    
        arr.sort(function(x,y) {
            return (x === y)? 0 : x? -1 : 1;

        });
    
        console.log(a); 
        
    }

    useEffect(() => {
        findOrders()
        // setOrder(orderMap)
    }, [])

    useEffect(() => {
        findOrders()
    } , [isFocused])

    useEffect(() => {
        console.log("checkd value!!!")
        console.log(checked);
        // let orderttste = orderMap
        // let a = orderttste.sort((x,y) => (x.finished === y.finished) ? 0 : x? -1 : 1);
        // console.log("thereIs ORDERMAP!")
        // console.log(a)
        switch(checked){
            case 1:
                // setOrder([])
                // setOrderTest(orderMap.sort(function(x, y) {
                //     return (x.finished === y.finished)? 0 : x? -1 : 1; 
                // }))
                // console.log(ordertest);
                setOrder(orderMap.filter((order) => order.finished === false ));
                console.log("thereis orders filtred!!")
                console.log(orders);
                break;
            case 2:
                // setOrder([])
                // let x = orderMap.sort(function(x, y) {
                //     return (x.finished === y.finished)? 0 : x? -1 : 1; 
                // })
                // setOrderTest(x)
                // console.log("ordertest");
                // console.log(ordertest);
                setOrder(orderMap.filter((order) => order.finished === true ));
                console.log("thereis orders filtred!!")
                console.log(orders);
                break;
            default:
                findOrders();

        }
    }, [checked])

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
                                        <Card onPress={() => {navigator.navigate('Pedido', {
                                            orderId: order._id,
                                            orderObj: order
                                        })}} pad={25} tam={225}>
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
                <View >
                    <View style={styles.top}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                            <Text style={{ fontSize: 25 }}>Pedidos</Text>
                            {/* <Text style={{ color: 'green', fontSize: 20, alignSelf: "flex-end", marginBottom: 2, marginLeft: 5 }}>R${total}</Text> */}
                        </View>
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
                    <View style={{ width: '100%', height: 50, alignItems: "center", marginBottom: 10 }}>
                        <View style={{ alignItems: "center", justifyContent: 'center',display: 'flex', flexDirection: 'row' ,  width: "93%", height: "100%", backgroundColor: "#ea9247", borderRadius: 10 }}>
                            <Icon size={25} name='search' type='font-awesome' color='white'  />
                            <TextInput style={{ width: "80%", height: "100%", marginLeft: 10, color: 'white' }} placeholder="Buscar pedido..." />
                            <TouchableOpacity>
                                <Icon size={25} name='filter' type='font-awesome' color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{ maxHeight: "81%", maxWidth: 450 }}>
                        {
                            !orders || orders === [] || orders.length === 0 ? semPedidos() : pedidosPopulated()
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