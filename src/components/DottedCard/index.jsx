
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

import { Icon } from "react-native-elements"

export const DottedCard = ({ children, onPress, icon }) => {
    return(
        <TouchableOpacity onPress={onPress} style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    { icon && <Icon size={30} iconStyle='' name={icon} type='font-awesome' color='#ea9247' />}
                    {children}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 150,
        padding:25,
        width: "85%",
        margin: 10,
        borderWidth:2,
        borderStyle: 'dashed',
        borderColor:'#ea9247',
        alignItems: "center",
        justifyContent: "center"
    }
})
