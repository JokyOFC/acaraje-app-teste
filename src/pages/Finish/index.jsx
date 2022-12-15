
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "react-native-elements"

import { BtDef } from "../../components/BtDef"

import { useNavigation } from "@react-navigation/native"

export const Finish = ({ route }) => {
    const navigator = useNavigation();

    navigator.canGoBack() <= false

    const { desc, first } = route.params;
    return(
        <>
            <View style={styles.container}>
                <Icon name='check' type='font-awesome' style={{padding: 20, marginTop: "150%", paddingBottom: "9%"}} size={125} color="#DFDFDF"/>
                <View style={{ alignItems: "center", justifyContent:"center", maxWidth: "80%"}}>
                    <Text style={{ fontSize: 20, color: "white", textAlign: "center", marginBottom: "5%" }}>{desc}</Text>
                    <BtDef onPress={() => {
                        first === true ? navigator.navigate("Select") : navigator.navigate("Home")
                    }}>Finalizar</BtDef>
                </View>
            </View>
            <StatusBar style="light"/>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        height: "100%",
        backgroundColor: "#d2691e",
        alignItems: "center",
        justifyContent: "center"
    }
})