import { View, TouchableOpacity, Text, StyleSheet } from "react-native"


export const BtDef = ({icon, children, onPress}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
    },

    button: {
        width: 90,
        height: 60,
        backgroundColor: "#DFDFDF",
        borderRadius: 15,
    }
})
