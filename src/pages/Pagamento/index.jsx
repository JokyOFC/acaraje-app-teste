
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-navigation"

import { BtDef } from '../../components/BtDef'

import payments from "../../api/json/payments.json"
import { useState } from "react"

export const Pagamento = ({ route, navigation }) => {

    const { payId, isNew } = route.params

    console.log(isNew)
    console.log(payId)

    return(
    <>
        {isNew ? NewPay() : Payment()}
    </>
    )

    function NewPay() {
        
        
        return(
            <KeyboardAvoidingView >
                <ScrollView style={{ minHeight: "100%" }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 25}}>Criar Forma de Pagamento</Text>
                            <View style={{ margin: "10%", marginTop: "30%", marginRight: "7%" }}>
                                <Text style={{ fontSize: 15 }}>Nome da forma de pagamento</Text>
                                <TextInput placeholder="Digite aqui o nome do produto" style={styles.inputTexto}/>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", paddingLeft: "37%", marginTop: "50%"}}>
                                <BtDef>Finalizar</BtDef>
                            </View>
                        </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    
    function Payment() {
    
        console.log(payId)
        const pay = payments.filter(x => x._id === payId)[0]
        
        const [ nome, setNome ] = useState(pay.name)

        console.log(pay)

        return(
            <KeyboardAvoidingView>
                <ScrollView style={{ minHeight: "100%" }}>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25}}>Forma de pagamento</Text>
                        <View style={{ margin: "10%", marginTop: "30%", marginRight: "7%" }}>
                                <Text style={{ fontSize: 15 }}>Nome do produto</Text>
                                <TextInput onChangeText={(value) => { setNome(value) }} value={nome} placeholder="Digite aqui o nome da forma de pagamento" style={styles.inputTexto}/>
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