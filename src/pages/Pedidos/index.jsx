
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"

import { Card } from "../../components/Card"

import orders from "../../api/json/orders.json"
// import { RadioButton } from "react-native-paper"

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button"

export const Pedidos = () => {

    const radio_props = [
        {label: 'Todos', value: 0},
        {label: 'Ordenar Por X', value: 1},
        {label: 'Ordenar Por Y', value: 2},
    ]

    return (
        <SafeAreaView style={{ flex: 1, height: 500 }}>
            <View>
                <View style={styles.top}>
                    <Text style={{ fontSize: 25 }}>Pedidos</Text>
                    <View style={{ padding: 10, paddingBottom: 2 }}>
                        <RadioForm formHorizontal={true} 
                            radio_props={radio_props}
                            initial={0}
                        />
                    </View>
                </View>
                <ScrollView style={{ maxHeight: "87%", maxWidth: 450 }}>
                    <View style={{ alignItems: "center" }}>
                        {
                            orders.map((order) => (
                                <Card>
                                    <Text>
                                        {order.cliente}
                                    </Text>
                                </Card>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    top: {
        padding: 35,
        paddingLeft: 15,
        paddingBottom: 0
    }
})