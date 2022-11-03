
import { useEffect, useState, useContext } from "react";

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"

// import data from '../../api/json/products.json'

// import payments from '../../api/json/payments.json'

import CheckBox from 'expo-checkbox';

import { RadioButton } from 'react-native-paper';

import { BtDef } from "../../components/BtDef";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";

import { EmpContext } from "../../contexts/emp";

import api from "../../api/api";

export const CriarPedidos = () => {

    const { empr, filiais, profilePhoto } = useContext(EmpContext)
    
    const navigator = useNavigation();
    
    const [total, setTotal] = useState(0)

    const [checked, setChecked] = useState(0);

    const [ productcur, setProductCur ] = useState([])



    const [payments, setPayments] = useState([])
    
    const [products, setProducts] = useState([])
    
    async function listProducts() {
        await api.get('/products').then((response) => {
            setProducts(response.data)
        })
    }
    
    async function listPay() {
        await api.get('/payments').then((response) => {
            setPayments(response.data)
        })
    }

    // console.log(payments)
    

    const payProd = payments.map((data) => {
        return { label: data.name, value: data._id }
    })


    function handleUpdateQuantityItems(id, operation) {
        const productUpdated = products.map(product => {

            
            if (product._id === id) {
                if (operation === 'add') {
                    return { ...product, ammount: (product.ammount += 1) };
                }
                if (operation === 'minus' && product.ammount >= 1) {
                    return { ...product, ammount: (product.ammount -= 1) };
                }
            }
            return product
        });


        const prodCurT = productUpdated.filter(e => e.ammount >=1 ).map((e) => e._id)

        setProducts(productUpdated)
        setProductCur(prodCurT)

    }

    useEffect(() => {
        const newTotal = products.reduce((prev, current) =>
            prev + (current.ammount * current.price)
            , 0)
        // console.log(newTotal)
        setTotal(newTotal)

    }, [products])

    useEffect(() => {
        listPay()
    }, [])

    useEffect(() => {
        listProducts()
    }, [payments])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Produtos</Text>
                    <ScrollView style={{ maxHeight: 300 }}>
                        {
                            products.map((Data) => {

                                const [toggleCheckBox, setToggleCheckBox] = useState(false);

                                return (
                                    <View key={Data._id} style={{ display: "flex", flexDirection: 'row', alignItems: 'center', paddingTop: "7%" }}>
                                        <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "center", maxWidth: 180, minHeight: 50 }}>
                                                <Text style={{ paddingLeft: 10 }}>{Data.name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: "center", marginLeft: "auto" }}>

                                            <Text style={{ color: "green", paddingLeft: 10 }}>R$ {Data.price}</Text>

                                            <Text> X </Text>
                                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                {toggleCheckBox && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "add") }} style={{ backgroundColor: "#d2691e", width: 35, height: 35, borderRadius: 100, marginBottom: 10, alignItem: "center", justifyContent: "center" }}><Text style={{ textAlign: "center", color: "white" }}>+</Text></TouchableOpacity>}
                                                <TouchableOpacity style={{ }} onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                                                    <TextInput editable={false} value={Data.ammount.toString()} style={{ marginLeft: "5%", padding: 5, backgroundColor: "#ea9247", height: 40, borderRadius: 5, textAlign: "center", color: "white" }} defaultValue={0} keyboardType="numeric" maxLength={2} />
                                                </TouchableOpacity>
                                                {toggleCheckBox && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "minus") }} style={{ backgroundColor: "#d2691e", width: 35, height: 35, borderRadius: 100, marginTop: 10, alignItem: "center", justifyContent: "center" }}><Text style={{ textAlign: "center", color: "white" }}>-</Text></TouchableOpacity>}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ minHeight: '20%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "green", fontSize: 25, fontWeight: "bold" }}>Total</Text>
                    <Text style={{ color: "green", fontSize: 20 }}>R$ {total}.00</Text>
                </View>
                <View >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Forma de pagamento</Text>
                    <ScrollView style={{ maxHeight: 110 }}>
                        <View style={{ paddingTop: "1%" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                                <RadioForm formHorizontal={false}
                                    radio_props={payProd}
                                    initial={0}
                                    buttonColor={'#ea9247'}
                                    selectedButtonColor={'#ea9247'}
                                    animation={true}
                                    buttonSize={12}
                                    labelStyle={{ paddingBottom: 10 }}
                                    onPress={(value) => {setChecked(value);}}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ width: "100%", alignItems: "center", marginTop: "7%" }}>
                    <BtDef onPress={() => {
                        if(productcur.length == 0) {
                            Alert.alert('Error!', 'error')
                        } else if(!checked) {
                            Alert.alert('Error!', 'error')
                        } else {
                            navigator.navigate('Finish', { desc: "Pedido criado com sucesso!" })

                        }
                    }} > Finalizar </BtDef>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "30%",
        paddingTop: "2%"
    }
})