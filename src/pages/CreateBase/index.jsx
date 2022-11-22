import { useState } from "react";

import { View, StyleSheet,Text } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../components/Profile";
import { TextInput } from "react-native-gesture-handler";
import { BoxSearch } from "../../components/BoxSearch";

import { Divider } from "react-native-paper";
import { BtDef } from "../../components/BtDef";

export const CriarBase = () => {

    const navigate = useNavigation();

    const [ empresa, setEmpresa ] = useState("Empresa");
    const [ filiais, setFiliais ] = useState(0);

    return(
        <View style={styles.container}>
            <View style={ styles.header }>
                <Profile />
                <View style={ styles.headerTexts }>
                    <Text style={{ fontSize: 25 }}>{empresa}</Text>
                    <Text style={{ fontSize: 15 }}>{filiais} Filiais</Text>
                </View>
            </View>

            <View
                style={{
                    borderBottomColor: '#DFDFDF',
                    borderBottomWidth: 2,
                    width: "70%",
                    marginLeft: "15%",
                }}
            />

            <View style={{ paddingTop: '5%' }}>
                <View>
                    <Text>Empresa</Text>
                    <TextInput placeholder="Digite aqui o nome da sua empresa" onChangeText={(value) => value === "" ? setEmpresa('Empresa') :  setEmpresa(value)} style={{ marginTop: 10, marginBottom: 10, color: 'white', backgroundColor: '#d2691e', height: 50, borderRadius: 10, padding: 10 }} />
                </View>

                <View>
                    <Text style={{ marginBottom: 10 }}>Filiais</Text>
                    <BoxSearch />
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                <BtDef>Voltar</BtDef>
                <BtDef>Finalizar</BtDef>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        height: '30%',
        alignItems: 'center',
        maxWidth: '50%'
    },
    
    headerTexts: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: '7%'
    },

})
