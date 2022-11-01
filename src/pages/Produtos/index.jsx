
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native"

import products from "../../api/json/products.json"
import { Card } from "../../components/Card"
import { DottedCard } from "../../components/DottedCard"

export const Produtos = () => {

    const navigator = useNavigation();

    return(
        <SafeAreaView style={{ flex: 1, height: 500 }}>
            <View style={styles.container}>
                <Text style={{fontSize: 25}}>Produtos</Text>
                <ScrollView>
                    <DottedCard onPress={() => navigator.navigate('Produto', { isNew: true, prodId: "" })} icon="plus">
                        <Text style={{ color:"#ea9247" }}>Criar Produto</Text>
                    </DottedCard>
                    {
                        products.map((data) => {
                            return(
                            <Card key={data._id} onPress={() => navigator.navigate('Produto', { isNew: false, prodId: data._id }) } tam={150}>
                                <View style={{ padding:"15%" , alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color:"white" }}>{data.name}</Text>
                                    <Text style={{ fontSize: 18, color:"green", paddingTop: 10 }}> R${data.price}.00 </Text>
                                </View>
                            </Card>
                            )
                        })
                    }
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