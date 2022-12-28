
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Alert } from "react-native"
import { SafeAreaView } from "react-navigation"

import { NavigationRouteContext, useNavigation } from "@react-navigation/native"

import { BtDef } from '../../components/BtDef'

// import products from "../../api/json/products.json"
import { useState, useContext, useEffect } from "react"

import { EmpContext, useEmpContext } from "../../contexts/emp"

import api from "../../api/api"
import axios from "axios"

export const Produto = ({ route, navigation }) => {

    const navigator = useNavigation()

    const { prodId, isNew, data } = route.params

    const { empr, setLoading } = useEmpContext();

    console.log(isNew)
    console.log(prodId)
    
    console.log("there is prod 1!!!")
    console.log(data)

    const [ prodname, setProdName ] = useState();
    const [ prodprice, setProdPrice ] = useState(0);
    const [ product, setProduct ] = useState({})

    return(
    <>
        {isNew ? NewProduct() : Product()}
    </>
    )

    function NewProduct() {
        
        const [ newProductValue, setNewProductValue ] = useState("");
        const [ newPriceValue, setNewPriceValue ] = useState(0);
        const [ newPriceNValue, setNewPriceNValue ] = useState(0);
        
        return(
            <KeyboardAvoidingView >
                <ScrollView style={{ minHeight: "100%" }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Criar Produto</Text>
                            <View style={{ margin: "10%", marginTop: "30%", marginRight: "2%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput placeholderTextColor="#DFDFDF" placeholder="Digite aqui o nome do produto" style={styles.inputTexto} value={newProductValue} onChangeText={(value) => setNewProductValue(value)} />
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço</Text>
                                <TextInput placeholderTextColor="#DFDFDF" placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric" value={newPriceValue} onChangeText={(value) => setNewPriceValue(value)}/>
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço para Eventos</Text>
                                <TextInput placeholderTextColor="#DFDFDF" placeholder="Digite aqui o preço do produto para eventos" style={styles.inputTexto} keyboardType="numeric" value={newPriceNValue} onChangeText={(value) => setNewPriceNValue(value)}/>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                                <BtDef onPress={async() => {
                                    if(!newProductValue) return Alert.alert('Error!', 'error')
                                    if(!newPriceValue) return Alert.alert('Error!', 'error')
                                    if(!newPriceNValue) { setNewPriceNValue(0) }
                                    setLoading(true);
                                    try {
                                        await api.post('/product/create', { BaseId: empr, name: newProductValue, price: { price: newPriceValue, priceEvent: newPriceNValue }  }).then(() => {
                                            navigator.navigate('Finish', { desc: "Produto criado com sucesso!", first: false })
                                        })
                                    } catch(err) {
                                        console.log(err)
                                    } finally {
                                        setLoading(false);
                                    }
                            }}>Finalizar</BtDef>
                            </View>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    
    function Product() {
    
        console.log(prodId)
        // const prod = products.filter(x => x._id === prodId)[0]
        
        console.log("there is prod!!")
        console.log(product)

        const [ nome, setNome ] = useState(data.name)
        const [ preco, setPreco ] = useState(data.price)
        const [ precoEvent, setPrecoEvent ] = useState(data.priceEvent)

        // console.log(prod)

        return(
            <KeyboardAvoidingView>
                <ScrollView style={{ minHeight: "100%" }}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25}}>Produto</Text>
                        <View style={{ margin: "10%", marginTop: "30%", marginRight: "2%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { setNome(value) }} value={nome} placeholder="Digite aqui o nome do produto" style={styles.inputTexto}/>
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço</Text>
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { Alert.alert('Aviso!', 'Função ainda não desenvolvida no sistema! em futuras atualizações iremos trazer essa função!') }} value={preco.price.toString()} placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric"/>
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço para Eventos</Text>
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { Alert.alert('Aviso!', 'Função ainda não desenvolvida no sistema! em futuras atualizações iremos trazer essa função!') }} value={preco.priceEvent.toString()}  placeholder="Digite aqui o preço do produto para Eventos" style={styles.inputTexto} keyboardType="numeric"/>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                            <BtDef onPress={async() => {
                                setLoading(true);
                                try {
                                    await api.post('/product/delete', { BaseId: empr, productId: prodId }).then(() => {
                                        navigator.navigate('Finish', { desc: "Produto deletado com sucesso!" })
                                    })
                                } catch(err) {
                                    console.log(err)
                                } finally {
                                    setLoading(false);
                                }
                            }}>Deletar</BtDef>
                            <BtDef onPress={() => {
                                navigator.goBack()
                            }}>Voltar</BtDef>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingRight: "10%",
        paddingLeft: "3%",
        paddingBottom: "7%",
        paddingTop: "12%"
    },
    inputTexto: {
        backgroundColor: "#d2691e",
        color: "white",
        height: 52,
        borderRadius: 7,
        padding: 10,
        paddingLeft: 15
    },
})