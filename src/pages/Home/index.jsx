
import { StyleSheet, Text, Button, View } from "react-native"

import { Profile } from "../../components/Profile"
import { BtDef } from "../../components/BtDef"

export const Home = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Profile />
                </View>
                <View style={{ flex:1, flexDirection: "column", padding: 40, paddingLeft: 20}}>
                    <Text style={{ fontSize: 25, }}>Empresa</Text>
                    <Text>Filial</Text>
                </View>
            </View>
            <View style={styles.body}>

                <View style={styles.wrapper}>
                    <View style={{flexDirection: "column"}}>
                    <View style={styles.product}>
                        <Text style={{fontSize: 25}}>Pedidos</Text>
                        <View style={{ width: 190 }} ></View>
                        <BtDef icon />
                    </View>
                    <View style={styles.product}>
                        <Text style={{fontSize: 25}}>Produtos</Text>
                        <View style={{ width: 180 }} ></View>
                        <BtDef icon />
                    </View>
                    <View style={styles.product}>
                        <Text style={{fontSize: 25}}>Criar Pedidos</Text>
                        <View style={{ width: 125 }} ></View>
                        <BtDef icon />
                    </View>
                    </View>
                </View>

            </View>
            <View style={{height: 100}} ></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        padding: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 2,
        justifyContent: "center",
        flexDirection: "row",  
    },
    wrapper: {

        flex: 1,
        justifyContent: "center",
        flexDirection: "row", 
    },

    product: {
        maxHeight: 100,
        width: 400,
        alignItems: "center",
        flexDirection: "row", 
        marginBottom: 20
    },

    space: {
        width: 230
    }
})