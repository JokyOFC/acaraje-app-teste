
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native"

import payments from "../../api/json/payments.json"
import { Card } from "../../components/Card"
import { DottedCard } from "../../components/DottedCard"

import { useNavigation } from "@react-navigation/native"

export const Pagamentos = () => {

    const navigator = useNavigation();

    return(
        <SafeAreaView style={{ flex: 1, height: 500 }}>
            <View style={styles.container}>
                <Text style={{fontSize: 25}}>Formas de Pagamento</Text>
                <ScrollView>
                    {
                        payments.map((data) => {
                            return(
                            <Card key={data._id} onPress={() => navigator.navigate('Pagamento', { isNew: false, payId: data._id })}>
                                <View style={{ padding:"20%" , alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.name}</Text>
                                </View>
                            </Card>
                            )
                        })
                    }
                    <DottedCard icon="plus" onPress={() => navigator.navigate('Pagamento', { isNew: true})}>
                        <Text style={{ marginTop: 10, color:"#D9D9D9" }}>Criar Pagamento</Text>
                    </DottedCard>
                </ScrollView>
            </View>
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    container: {
        padding: "10%",
        paddingLeft: "3%",
        paddingBottom: "7%",
        paddingRight: "5%"
    }
})