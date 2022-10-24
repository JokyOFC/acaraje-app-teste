import { StyleSheet, View } from "react-native"


export const Card = ({ children }) => {
    return(<View style={styles.container}>
        {children}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        borderRadius: 25,
        height: "90%",
        width: "90%",
        shadowColor: "#D9D9D9",
        shadowRadius: 25,
        shadowOffset: 5,
        shadowOpacity: 2,
    }
})
