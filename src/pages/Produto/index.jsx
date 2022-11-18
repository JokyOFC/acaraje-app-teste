
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Alert } from "react-native"
import { SafeAreaView } from "react-navigation"

import { NavigationRouteContext, useNavigation } from "@react-navigation/native"

import { BtDef } from '../../components/BtDef'

// import products from "../../api/json/products.json"
import { useState, useContext, useEffect } from "react"

export const Produto = ({ route, navigation }) => {

    const navigator = useNavigation()

    const { prodId, isNew, data } = route.params

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
        
        
        return(
            <KeyboardAvoidingView >
                <ScrollView style={{ minHeight: "100%" }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Criar Produto</Text>
                            <View style={{ margin: "10%", marginTop: "30%", marginRight: "2%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput placeholderTextColor="#DFDFDF" placeholder="Digite aqui o nome do produto" style={styles.inputTexto} value={prodname} onChangeText={(value) => setProdName(value)} />
                                <Text style={{ fontSize: 15, paddingTop: 27 }}>Preço</Text>
                                <TextInput placeholderTextColor="#DFDFDF" placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric" value={prodprice} onChangeText={(value) => setProdPrice(value)}/>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                                <BtDef onPress={() => {
                                    if(!prodname) return Alert.alert('Error!', 'error')
                                    if(!prodprice) return Alert.alert('Error!', 'error')
                                    navigator.navigate('Finish', { desc: "Produto criado com sucesso!" })
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
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { setPreco(value) }} value={preco.price.toString()} placeholder="Digite aqui o preço do produto" style={styles.inputTexto} keyboardType="numeric"/>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                            <BtDef onPress={() => {
                                navigator.navigate('Finish', { desc: "Produto deletado com sucesso!" })
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
    }
})