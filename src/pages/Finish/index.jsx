
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, Text } from "react-native"
import { Icon } from "react-native-elements"

import { BtDef } from "../../components/BtDef"

import { useNavigation } from "@react-navigation/native"

export const Finish = () => {
    const navigator = useNavigation();
    return(
        <>
            <View style={styles.container}>
                <Icon name='check' type='font-awesome' style={{padding: 20, marginTop: "150%", paddingBottom: "9%"}} size={125} color="#DFDFDF"/>
                <View style={{ alignItems: "center", justifyContent:"center", maxWidth: "80%"}}>
                    <Text style={{ fontSize: 20, color: "white", textAlign: "center", marginBottom: "5%" }}>lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt debitis beatae aliquam praesentium laboriosam voluptates, officiis repudiandae quia facilis, illum ab, expedita suscipit in maxime dicta reiciendis saepe error ipsa.</Text>
                    <BtDef onPress={() => {
                        navigator.navigate("Home")
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
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center"
    }
})