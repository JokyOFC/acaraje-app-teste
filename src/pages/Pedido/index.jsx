
import { StyleSheet, View, Text, Alert } from "react-native"

import orders from "../../api/json/orders.json"

export const Pedido = ({ route, navigation }) => {
    
    const { orderId } = route.params;

    return(
        <View style={ styles.container }>
            <Text> {orderId} </Text>
            {
                orders.filter(x => x._id === orderId).map((data) => {

                    return(
                        <>
                            <Text>{data.cliente}</Text>
                            <Text>{data.base.name} 1</Text>
                            <Text>{data.products.map((prod) => {
                                return(<Text>{prod.item.name} 1</Text>)
                            })}</Text>
                        </>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: "10%",
    }
})