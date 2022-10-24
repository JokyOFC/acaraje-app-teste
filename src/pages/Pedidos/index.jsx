
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"

import { Card } from "../../components/Card"

export const Pedidos = () => {
    return(
    <SafeAreaView style={{  flex: 1, height: 500, width: 500}}>
        <View style={{ }}>
            <ScrollView style={{ maxHeight: 100, maxWidth: 500, marginTop: 100 }}>
                <Card><Text>1212</Text></Card>
            </ScrollView>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})