
import { StyleSheet, Text, View } from "react-native"

export const Produto = ({ route, navigation }) => {

    const { prodId, isNew } = route.params

    console.log(isNew)

    return(
    <>
        {isNew ? NewProduct() : Product(prodId)}
    </>
    )

}

function NewProduct() {
    
    
    return(
        <View style={styles.container}>
            <Text style={{fontSize: 25}}>Criar Forma de Pagamento</Text>
            <View>
                
            </View>
        </View>
    )
}

function Product({ id }) {
    return(
        <View style={styles.container}>
            <Text style={{fontSize: 25}}>Forma de Pagamento</Text>
            <View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "10%",
        paddingLeft: "3%",
        paddingBottom: "7%",
    }
})