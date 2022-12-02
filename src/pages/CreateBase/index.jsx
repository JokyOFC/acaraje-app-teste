import { useState, useContext } from "react";

import { View, StyleSheet,Text } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { Profile } from "../../components/Profile";
import { TextInput } from "react-native-gesture-handler";
import { BoxSearch } from "../../components/BoxSearch";

import { Divider } from "react-native-paper";
import { BtDef } from "../../components/BtDef";

import api from "../../api/api";
import { useEffect } from "react";

import { EmpContext } from "../../contexts/emp";

export const CriarBase = () => {

    const { empall } = useContext(EmpContext)

    // const navigation = useNavigation()

    // const { baseId } = route.params

    /*
        {
            name: String,
            payments: [
                    {
                        type: mongo.Types.ObjectId,
                        ref: 'payment',
                        default: []
                    }
                ],
            products: [
                    {
                        type: mongo.Types.ObjectId,
                        ref: 'product',
                        default: []
                    }
                ],
            filiais: [
                {
                    filicod: Number,
                    name: String,
                }
            ]
        }
    */

    const navigate = useNavigation();

    const [ responsebase, setResponseBase ] = useState({});
    const [ empresa, setEmpresa ] = useState("Empresa");
    const [ filiais, setFiliais ] = useState(0);
    const [ filiaisList, setFiliaisList ] = useState([]);

    useEffect(() => {
        // if(baseId){
        //     api.post('/base/id', { id: baseId }).then((response) => {
        //         console.log(response.data)
        //         setResponseBase( response.data )
        //         setEmpresa(responsebase.name)
        //         setFiliaisList(responsebase.filiais)
        //     })
        // }
        setEmpresa(empall.name)
        setFiliaisList(empall.filiais)
        console.log(empall)
    }, [])

    console.log(empresa)
    console.log(filiaisList)

    return(
        <View style={styles.container}>
            <View style={ styles.header }>
                <Profile />
                <View style={ styles.headerTexts }>
                    <Text style={{ fontSize: 25 }}>{empresa}</Text>
                    <Text style={{ fontSize: 15 }}>{filiaisList.length} Filiais</Text>
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
                    <TextInput value={empresa} placeholder="Digite aqui o nome da sua empresa" onChangeText={(value) => value === "" ? setEmpresa('Empresa') :  setEmpresa(value)} style={{ marginTop: 10, marginBottom: 10, color: 'white', backgroundColor: '#d2691e', height: 50, borderRadius: 10, padding: 10 }} />
                </View>

                <View>
                    <Text style={{ marginBottom: 10 }}>Filiais</Text>
                    <BoxSearch filiaisBox={filiaisList} />
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                <BtDef onPress={() => { navigate.goBack() }}>Voltar</BtDef>
                <BtDef onPress={() => {}}>Finalizar</BtDef>
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
