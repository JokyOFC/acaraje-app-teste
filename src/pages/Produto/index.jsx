
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-navigation"

import { BtDef } from '../../components/BtDef'

import products from "../../api/json/products.json"
import { useState } from "react"

export const Produto = ({ route, navigation }) => {

    const { prodId, isNew } = route.params

    console.log(isNew)
    console.log(prodId)

    return(
    <>
        {isNew ? NewProduct() : Product()}
    </>
    )

    function NewProduct() {
        
        
        return(
            <KeyboardAvoidingView >
                <ScrollView style={{ minHeight: "100%" }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Criar Produto</Text>
                            <View style={{ margin: "10%", marginTop: "30%", marginRight: "7%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput placeholder="Digite aqui o nome do produto" style={styles.inputTexto}/>
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço</Text>
                                <TextInput placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric"/>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "37%", marginTop: "50%"}}>
                                <BtDef>Finalizar</BtDef>
                            </View>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    
    function Product() {
    
        console.log(prodId)
        const prod = products.filter(x => x._id === prodId)[0]
        
        const [ nome, setNome ] = useState(prod.name)
        const [ preco, setPreco ] = useState(prod.price)

        console.log(prod)

        return(
            <KeyboardAvoidingView>
                <ScrollView style={{ minHeight: "100%" }}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25}}>Produto</Text>
                        <View style={{ margin: "10%", marginTop: "30%", marginRight: "7%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput onChangeText={(value) => { setNome(value) }} value={nome} placeholder="Digite aqui o nome do produto" style={styles.inputTexto}/>
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço</Text>
                                <TextInput onChangeText={(value) => { setPreco(value) }} value={preco.toString()} placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric"/>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "16%", marginTop: "50%"}}>
                            <BtDef>Deletar</BtDef>
                            <BtDef>Voltar</BtDef>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        padding: "10%",
        paddingLeft: "3%",
        paddingBottom: "7%",
        paddingTop: "12%"
    },
    inputTexto: {
        backgroundColor: "#D9D9D9",
        height: 52,
        borderRadius: 7,
        padding: 10
    }
})