
import { StyleSheet, View, Text, Pressable , ScrollView, Modal } from "react-native"

// import orders from "../../api/json/orders.json"

import { format } from "date-fns";
import { TextInput } from "react-native-paper";

import RadioForm from "react-native-simple-radio-button";
import { BtDef } from "../../components/BtDef";

import CheckBox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { useEffect, useContext, useState } from "react";

import { EmpContext, useEmpContext } from "../../contexts/emp";

import api from "../../api/api";

export const Pedido = ({ route, navigation }) => {
    
    const { orderId, orderObj } = route.params;

    console.log([orderObj])

    const navigator = useNavigation();

    const { empr, filiais, profilePhoto, setLoading } = useEmpContext();
    
    // const [ orders, setOrder ] = useState([])
    
    // setOrder([orderObj])

    let orders = [orderObj]

    // useEffect(() => {
    //     async function pedido() {
    //         const response = await api.post('/orders/base', { id:empr } )
    
    //         setOrder(response.data)
    //         console.log(response.data)
    //     }

    //     pedido()

    // }, []) 

    const [ finished, setFinished ] = useState(orders[0].finished)
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={ styles.container }>
            {
                orders.map((data) => {
                    const [ checked, setChecked ] = useState(0)
                    const radio_props = [{ label: data.paymentMethod.name, value: 0 }]
                    console.log(radio_props)
                    return(
                        <View>
                            <View style={{ paddingBottom: 8 }}>
                                <Text style={{fontSize: 25, fontWeight: "bold"}}>Cliente: {data.cliente}</Text>
                                <Text style={{fontSize: 16}}>{format(new Date(data.createdAt), "dd/MM/yyyy")}</Text>
                            </View>

                            <View style={{ paddingLeft: "3%" }}>
                                <Text style={{fontSize: 20, fontWeight: "bold"}}>Produtos</Text>
                                <ScrollView style={{ height: "35%" }}>
                                    <View style={{ padding: "2%" }}>
                                        {data.products.map((prod) => {
                                            console.log("there is prod!")
                                            console.log(prod)
                                            return(
                                                    <View key={prod.item._id} style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "10%", paddingBottom: "10%" }}>
                                                        <View style={{ display:"flex", width: "59%" }}>
                                                            <Text>{prod.item.name}</Text>
                                                        </View>
                                                        <View style={{ display: "flex", width: "50%", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                                                            <Text style={{ color: "green" }}>R${prod.item.price.price}.00</Text>
                                                            <Text style={{ paddingLeft: "2%", paddingRight: "2%" }}>X</Text>
                                                            <TextInput value={prod.amount.toString()} disabled={true} style={{maxHeight: 50, minWidth: 25, borderRadius: 5, marginRight: "15%", textAlign: "center", justifyContent: "center", backgroundColor: "#ea9247", color: "white", fontSize: 12}}/>
                                                        </View>
                                                    </View>
                                            )
                                        })}
                                    </View>
                                </ScrollView>

                                <Text style={{fontSize: 20, fontWeight: "bold"}}>Forma de pagamento</Text>
                                <View style={{ padding: "2%" }}>
                                    <ScrollView style={{ maxHeight: "100%" }}>
                                        <RadioForm 
                                            formHorizontal={true} 
                                            radio_props={radio_props}
                                            initial={0}
                                            buttonColor={'#ea9247'}
                                            selectedButtonColor={'#ea9247'}
                                            animation={true}
                                            buttonSize={12}
                                            labelStyle={{ paddingRight: "3%" }} 
                                            onPress={(value) => setChecked(value)}
                                        />
                                    </ScrollView>
                                </View>

                                <View style={styles.total}>
                                    <Text style={{ color: "green", fontWeight: "bold", fontSize: 20 }}>Total</Text>
                                    <Text style={{ color: "green", fontSize: 16 }}>R${data.total}.00</Text>
                                </View>
                                <View style={{display:"flex",flexDirection:"row", padding: "2%"}}>
                                    <CheckBox 
                                        value={finished}
                                        color="#ea9247"
                                        onValueChange={() => {
                                            {
                                                setFinished(!finished);
                                                setModalVisible(true);
                                            }   
                                        }}
                                    />
                                    <Text style={{ paddingLeft: "2%"}}>Finalizado</Text>
                                </View>
                                <View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-around", paddingLeft: "2%" }}>
                                    <BtDef onPress={async() => {
                                        setLoading(true);
                                        await api.post('/order/cancel', { id: data._id }).then((response) => {
                                            navigator.navigate('Finish', {desc:"Pedido cancelado com sucesso!", first: false})
                                        }).finally(() => {
                                            setLoading(false);
                                        })
                                        }}> Cancelar </BtDef>
                                    <BtDef onPress={() => navigator.navigate('Pedidos')} > Voltar </BtDef>
                                </View>

                            </View>
                        </View>
                )
                })
            }
            <Modal 
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22}}>
                        <View style={{margin: 20,
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5
                            }}>
                            <Text style={{ color: "black",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        paddingBottom: 10,
                            }}>{finished === true ? "Deseja finalizar o pedido?" : "Deseja retomar o pedido?" }</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: "42%", padding: 0 }}>
                                    <Pressable style={[styles.button, styles.buttonClose]}
                                        onPress={async() =>{
                                            // {console.log("there is paaaayments!!")
                                            // console.log(checked) }
                                            setLoading(true);
                                            await api.post('/order/finishupdate', { id: orders[0]._id, finished: finished}).then(() => {
                                                setModalVisible(!modalVisible)
                                                navigator.navigate('Pedido', {
                                                    orderId: orders[0]._id,
                                                    orderObj: orderObj
                                                })
                                            }).finally(() => {
                                                setLoading(false);
                                            })
                                        }
                                    }>
                                        <Text style={{ color: 'white' }}>Sim</Text>
                                    </Pressable>
                                    <Pressable style={[styles.button, styles.buttonClose]}
                                        onPress={() =>{
                                            setFinished(!finished);
                                            setModalVisible(!modalVisible)
                                        }
                                    }>
                                        <Text style={{ color: 'white' }}>Não</Text>
                                    </Pressable>
                                </View>          
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "10%",
        paddingLeft: "7%"
    },
    total: {
        width: "100%", height: "23%", alignItems: "center", justifyContent: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: 60,
        alignItems: "center",
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        marginTop: 20,
        backgroundColor: "#d2691e",
      },
})