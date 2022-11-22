
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-navigation"

import { BtDef } from '../../components/BtDef'

import payments from "../../api/json/payments.json"
import { useState, useContext } from "react"
import { useNavigation } from "@react-navigation/native"

import api from "../../api/api"

import { EmpContext } from '../../contexts/emp';

export const Pagamento = ({ route, navigation }) => {

    const navigator = useNavigation()

    const { payId, isNew, data } = route.params

    const { empr } = useContext(EmpContext)

    console.log(isNew)
    console.log(payId)

    return(
    <>
        {isNew ? NewPay() : Payment()}
    </>
    )

    function NewPay() {
        
        const [ newPayValue, setNewPayValue ] = useState("");

        return(
            <KeyboardAvoidingView >
                <ScrollView style={{ minHeight: "100%" }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Criar Forma de Pagamento</Text>
                            <View style={{ margin: "10%", marginTop: "30%", marginRight: "2%" }}>
                                <Text style={{ fontSize: 15 }}>Nome da forma de pagamento</Text>
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { setNewPayValue(value) }} placeholder="Digite aqui o nome do produto" style={styles.inputTexto}/>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                                <BtDef onPress={() => {
                                    api.post('/payment/create', { BaseId: empr, name: newPayValue }).then(() => {
                                        navigator.navigate('Finish', {desc: "Forma de pagamento criada com sucesso"})
                                    }).catch((err) => {

                                    })
                            }}>Finalizar</BtDef>
                            </View>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    
    function Payment() {
    
        // console.log(payId)
        // const pay = payments.filter(x => x._id === payId)[0]
        
        const [ nome, setNome ] = useState(data.name)

        // console.log(pay)

        return(
            <KeyboardAvoidingView>
                <ScrollView style={{ minHeight: "100%" }}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25}}>Forma de pagamento</Text>
                        <View style={{ margin: "10%", marginTop: "30%", marginRight: "2%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput placeholderTextColor="#DFDFDF" onChangeText={(value) => { setNome(value) }} value={nome} placeholder="Digite aqui o nome da forma de pagamento" style={styles.inputTexto}/>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "10%", marginTop: "50%"}}>
                            <BtDef onPress={() => {
                                api.post('/payment/delete', { BaseId: empr, paymentId: payId }).then(() => {
                                    navigator.navigate('Finish', {desc: "Forma de pagamento deletada com sucesso"})
                                })
                            }}>Deletar</BtDef>
                            <BtDef onPress={() => { navigator.goBack() }}>Voltar</BtDef>
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
        backgroundColor: "#d2691e",
        color: "white",
        height: 52,
        borderRadius: 7,
        padding: 10
    }
})