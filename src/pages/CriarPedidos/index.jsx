
import { useEffect, useState, useContext } from "react";

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native"

// import data from '../../api/json/products.json'

// import payments from '../../api/json/payments.json'

import CheckBox from 'expo-checkbox';

// import { RadioButton } from 'react-native-paper';

import { BtDef } from "../../components/BtDef";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import RadioForm from "react-native-simple-radio-button";

import { EmpContext } from "../../contexts/emp";

import api from "../../api/api";
import axios from "axios";

export const CriarPedidos = () => {

    const { empr, filiais, profilePhoto } = useContext(EmpContext)
    
    const navigator = useNavigation();
    
    const [total, setTotal] = useState(0)

    const [checked, setChecked] = useState(0);

    const [ productcur, setProductCur ] = useState([])

    const [payments, setPayments] = useState([])
    
    const [products, setProducts] = useState([])

    async function listProducts() {
        await api.post('/products', { BaseId: empr }).then((response) => {
            console.log("dataofproducts")
            console.log(response.data)
            setProducts(response.data)
        })
    }
    
    async function listPay() {
        await api.post('/payments', { BaseId: empr }).then((response) => {
            console.log("dataofpayments")
            console.log(response.data)
            setPayments(response.data)
        })
    }
    
    useEffect(() => {
        listPay()
        listProducts()      
    }, [])


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


        const prodCurT = productUpdated.filter(e => e.ammount >=1 ).map((e) => { return { amount: e.ammount, item: e._id } })

        setProducts(productUpdated)
        setProductCur(prodCurT)

        console.log("--------------------------------------")

        console.log("There is products again!!")
        console.log(products)
        console.log("There is products cur!")
        console.log(productcur)

        console.log("--------------------------------------")

        console.log("There is productAAAA")
        console.log(productUpdated)
    }

   
    useEffect(() => {
        if(products === []) return
        const newTotal = products.reduce((prev, current) =>
            prev + (current.ammount * current.price.price)
            , 0)
        // console.log(newTotal)
        setTotal(newTotal)

    }, [products])



    // useEffect(() => {
        
    // }, [payments])
    const [checkBoxTest, setCheckBoxTest] = useState([])

    function toggleBoxCheck(name) {
        return setCheckBoxTest({...checkBoxTest,[name]: !checkBoxTest[name]})
    }

    console.log(checkBoxTest, "testeeee")

    const [modalVisible, setModalVisible] = useState(false);

    const productsPopulated = () => {

        return(
            <>
            {
            
            products.map((Data) => {
                // let toggleCheckBox = false

                return (
                    <View key={Data._id} style={{ display: "flex", flexDirection: 'row', alignItems: 'center', paddingTop: "7%" }}>
                        <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "center", maxWidth: 180, minHeight: 50 }}>
                                <Text style={{ paddingLeft: 10 }}>{Data.name}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: "center", marginLeft: "auto" }}>

                            <Text style={{ color: "green", paddingLeft: 10 }}>R$ {Data.price.price}</Text>

                            <Text> X </Text>
                            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                {checkBoxTest[Data._id] && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "add") }} style={{ backgroundColor: "#d2691e", width: 35, height: 35, borderRadius: 100, marginBottom: 10, alignItem: "center", justifyContent: "center" }}><Text style={{ textAlign: "center", color: "white" }}>+</Text></TouchableOpacity>}
                                <TouchableOpacity style={{ }} onPress={() => { toggleBoxCheck(Data._id) }}>
                                    <TextInput editable={false} value={Data.ammount.toString()} style={{ marginLeft: "5%", padding: 5, backgroundColor: "#ea9247", height: 40, borderRadius: 5, textAlign: "center", color: "white" }} defaultValue={0} keyboardType="numeric" maxLength={2} />
                                </TouchableOpacity>
                                {checkBoxTest[Data._id] && <TouchableOpacity onPress={() => { handleUpdateQuantityItems(Data._id, "minus") }} style={{ backgroundColor: "#d2691e", width: 35, height: 35, borderRadius: 100, marginTop: 10, alignItem: "center", justifyContent: "center" }}><Text style={{ textAlign: "center", color: "white" }}>-</Text></TouchableOpacity>}
                            </View>
                        </View>
                    </View>
                )
            })
            
            }
            </>
        )
    }

    const withoutProd = () => {
        return(
            <View style={{ minHeight: 300, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#ea9247', fontSize: 22}} > Sem Produtos! :( </Text>
                <Text style={{ color: '#ea9247', fontSize: 12, marginTop: "2%"}}>Crie novos produtos na aba de produtos!</Text>
            </View>
        )
    }

    const [clienteName, setClienteName] = useState()

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Produtos</Text>
                    <ScrollView style={{ maxHeight: 300 }}>
                        {
                            !products || products == [] || products.length === 0 ? withoutProd() : productsPopulated()
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
                                {
                                    payProd === [] ? <View style={{alignItems: 'center', justifyContent: 'center'}}><Text style={{ color: '#ea9247', fontSize: 18}}>Sem formas de pagamentos!</Text></View> : (<RadioForm formHorizontal={false}
                                    radio_props={payProd}
                                    initial={0}
                                    buttonColor={'#ea9247'}
                                    selectedButtonColor={'#ea9247'}
                                    animation={true}
                                    buttonSize={12}
                                    labelStyle={{ paddingBottom: 10 }}
                                    onPress={(value) => {setChecked(value);}}
                                />)
                                }
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
                            setModalVisible(true)
                        }
                    }} > Finalizar </BtDef>
                </View>
            </View>
            
            <Modal 
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22}}>
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
                        }}>Para concluir o pedido, informe o nome do cliente:</Text>
                        <TextInput onChangeText={(value) => { setClienteName(value) }} placeholderTextColor="#DFDFDF" placeholder="Digite aqui o nome do cliente" style={styles.inputTexto}/>
                        <Pressable style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                                // {console.log("there is paaaayments!!")
                                // console.log(checked) }
                                api.post('/order/create', { cliente: clienteName, products: productcur, paymentMethod: checked, baseId: empr, filicod: filiais, total: total }).then(() => {
                                    setModalVisible(!modalVisible)
                                    navigator.navigate('Finish', {desc: "Pedido criado com sucesso"})
                                })
                            }>
                                <Text style={{ color: 'white' }}>Finalizar pedido</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "30%",
        paddingTop: "5%"
    },
    inputTexto: {
        backgroundColor: "#d2691e",
        color: "white",
        height: 52,
        borderRadius: 7,
        padding: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        marginTop: 20,
        backgroundColor: "#d2691e",
      },
})