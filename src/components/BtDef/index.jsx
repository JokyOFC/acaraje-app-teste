import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import { Icon } from "react-native-elements"

export const BtDef = ({icon, children, onPress, color}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                { icon ? <Icon name={icon} type='font-awesome' color={color} /> : <Text>{children}</Text>}
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    }
})
