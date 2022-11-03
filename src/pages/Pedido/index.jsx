
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native"

// import orders from "../../api/json/orders.json"

import { format } from "date-fns";
import { TextInput } from "react-native-paper";

import RadioForm from "react-native-simple-radio-button";
import { BtDef } from "../../components/BtDef";

import CheckBox from 'expo-checkbox';

import { useNavigation } from "@react-navigation/native";
import { useEffect, useContext, useState } from "react";

import { EmpContext } from "../../contexts/emp";

import api from "../../api/api";

export const Pedido = ({ route, navigation }) => {
    
    const { orderId, orderObj } = route.params;

    console.log([orderObj])

    const navigator = useNavigation();

    const { empr, filiais, profilePhoto } = useContext(EmpContext)
    
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
                                <Text style={{fontSize: 25, fontWeight: "bold"}}>{data.id} - {data.cliente}</Text>
                                <Text style={{fontSize: 16}}>{format(new Date(data.createdAt), "dd/MM/yyyy")}</Text>
                            </View>

                            <View style={{ paddingLeft: "3%" }}>
                                <Text style={{fontSize: 20, fontWeight: "bold"}}>Produtos</Text>
                                <ScrollView style={{ height: "35%" }}>
                                    <View style={{ padding: "2%" }}>
                                        {data.products.map((prod) => {
                                            return(
                                                    <View key={prod._id} style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "10%", paddingBottom: "10%" }}>
                                                        <Text>{prod.item.name}</Text>
                                                        <View style={{ display: "flex", flexDirection: "row",  width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
                                                            <Text style={{ color: "green" }}>R${prod.item.price}.00</Text>
                                                            <Text style={{ paddingLeft: "2%", paddingRight: "2%" }}>X</Text>
                                                            <TextInput label={prod.quantity} disabled={true} style={{maxHeight: 50, minWidth: 25, borderRadius: 5, marginRight: "15%", textAlign: "center", justifyContent: "center", backgroundColor: "#ea9247", color: "white"}}/>
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
                                        value={data.finished}
                                        color="#ea9247"
                                    />
                                    <Text style={{ paddingLeft: "2%"}}>Finalizado</Text>
                                </View>
                                <View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-around", paddingLeft: "2%" }}>
                                    <BtDef onPress={() => navigator.navigate('Finish', {desc:"Pedido cancelado com sucesso!"})}> Cancelar </BtDef>
                                    <BtDef onPress={() => navigator.goBack()} > Voltar </BtDef>
                                </View>

                            </View>
                        </View>
                )
                })
            }
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
    }
})