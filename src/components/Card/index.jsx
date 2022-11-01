import { StyleSheet, TouchableOpacity, View } from "react-native"

export const Card = ({ children, onPress, tam, pad }) => {

    console.log(tam)

    console.log(pad)

    !tam ? tam=200 : tam=tam

    pad ? pad=25 : pad=pad

    console.log(tam)
    
    console.log(pad)

    return(
    <TouchableOpacity onPress={onPress} style={styles.pressContainer}>
        <View style={styles.container(tam, pad)}>
            {children}
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: (size, padd) => ({
        backgroundColor: "#ea9247",
        borderRadius: 25,
        height: size,
        padding:padd,
        width: "85%",
        margin: 10,
        elevation: 10,
        shadowColor: "#ea9247",
        shadowOpacity: 6,
        shadowOffset: 1
    }),
    pressContainer: {
        width: "100%",
        alignItems: "center",
        
    }
})
