import { useState } from "react";

import { View, StyleSheet } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../components/Profile";
import { TextInput } from "react-native-gesture-handler";
import { BoxSearch } from "../../components/BoxSearch";

import { Divider } from "react-native-paper";

export const CriarBase = () => {

    const navigate = useNavigation();

    const [ empresa, setEmpresa ] = useState("");
    const [ filiais, setFiliais ] = useState(0);

    return(
        <View style={styles.container}>
            <View style={ styles.header }>
                <Profile />
                <View style={ styles.headerTexts }>
                    <Text>{empresa}</Text>
                    <Text>{filiais} Filiais</Text>
                </View>
            </View>

            <Divider />

            <View>
                <View>
                    <Text>Empresa</Text>
                    <TextInput />
                </View>

                <View>
                    <Text>Filiais</Text>
                    <BoxSearch />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    header: {

    },
    
    headerTexts: {

    }

})
