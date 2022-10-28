import { StyleSheet, TouchableOpacity, View } from "react-native"


export const Card = ({ children, onPress }) => {
    return(
    <TouchableOpacity onPress={onPress} style={styles.pressContainer}>
        <View style={styles.container}>
            {children}
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        borderRadius: 25,
        minHeight: 200,
        padding:25,
        width: "85%",
        margin: 10,
    },
    pressContainer: {
        width: "100%",
        alignItems: "center",
        
    }
})
