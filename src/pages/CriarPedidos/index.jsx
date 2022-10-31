
import { useEffect, useState } from "react";

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"

import data from '../../api/json/products.json'

import payments from '../../api/json/payments.json'

import CheckBox from 'expo-checkbox';

import { RadioButton } from 'react-native-paper';

import { BtDef } from "../../components/BtDef";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";

export const CriarPedidos = () => {
    
    const navigator = useNavigation();
    
    const [total, setTotal] = useState(0)

    const [checked, setChecked] = useState(0);

    const [ productcur, setProductCur ] = useState([])

    const payProd = payments.map((data) => {
        return { label: data.name, value: data._id }
    })

    const [products, setProducts] = useState(data)

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
        
    }, [checked])

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
                                                <Text style={{}}>{Data.name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: "center", marginLeft: "auto" }}>

                                            <Text style={{ color: "green", paddingLeft: 10 }}>R$ {Data.price}</Text>

                                            <Text> X </Text>
                                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                {toggleCheckBox && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "add") }} style={{ backgroundColor: "#D9D9D9", width: 20, borderRadius: 100, marginBottom: 10 }}><Text style={{ textAlign: "center" }}>+</Text></TouchableOpacity>}
                                                <TouchableOpacity onPress={() => { setToggleCheckBox(!toggleCheckBox) }}>
                                                    <TextInput editable={false} value={Data.ammount.toString()} style={{ marginLeft: "5%", padding: 5, backgroundColor: "#DFDFDF", height: 40, borderRadius: 5, textAlign: "center" }} defaultValue={0} keyboardType="numeric" maxLength={2} />
                                                </TouchableOpacity>
                                                {toggleCheckBox && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "minus") }} style={{ backgroundColor: "#D9D9D9", width: 20, borderRadius: 100, marginTop: 10 }}><Text style={{ textAlign: "center" }}>-</Text></TouchableOpacity>}
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
                                    buttonColor={'#BBBBBB'}
                                    selectedButtonColor={'#BBBBBB'}
                                    animation={true}
                                    buttonSize={12}
                                    labelStyle={{ paddingBottom: 10 }}
                                    onPress={(value) => setChecked(value)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ width: "100%", alignItems: "center", marginTop: "7%" }}>
                    <BtDef onPress={() => {
                        console.log(checked)
                        console.log(productcur)
                        navigator.navigate('Finish', { desc: "Pedido criado com sucesso!" })
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
    }
})