
import { useContext, useState } from "react";

import { StyleSheet, Text, Button, View } from "react-native"

import { Profile } from "../../components/Profile"
import { BtDef } from "../../components/BtDef"

import { useNavigation } from '@react-navigation/native';

import { EmpContext } from "../../contexts/emp";

import base from "../../api/json/base.json"
import { useEffect } from "react";

import api from "../../api/api";

export const Home = () => {

    const { empr, filiais, profilePhoto } = useContext(EmpContext)

    const navigation = useNavigation();

    //const baseCur = base.find(e => e._id === empr)

    const [ baseCur, setBaseCur ] = useState({})

    const [ filiCur, setFiliCur ] = useState([])

    // console.log(empr)
    
    // console.log(baseCur)

    
    // useEffect(() => {
    //     console.log("consultando basecur")
    //     console.log(baseCur)
    //     // let basefilis = baseCur.filiais
    //     // setFiliCur(basefilis.find(fil => fil.filicod === filiais))
    // }, [baseCur])
    
    async function getBase() {
        try{
            await api.post('/base/id', { id:empr }).then((response) => {
                // console.log(response)
                setBaseCur(response.data)
                // console.log(" responseData ")
                // console.log(response.data)
                // let basefilis = baseCur.filiais
                // setFiliCur(basefilis.find(fil => fil.filicod === filiais))
            }).catch(function(error) {
                console.log(error)
            })
            // console.log(response.data.filiais)
            // console.log("listando baseCur")
            // console.log(baseCur)
        } catch(error) {
            console.log(error)
        }

    }

    useEffect(() => {

        getBase()

        console.log("basecur!!")
        console.log(baseCur)
    },[])
    // console.log(baseCur)

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Profile srcImg={profilePhoto}/>
                </View>
                <View style={{ flex:1, flexDirection: "column", paddingLeft: 20, width: 80 }}>
                    <Text style={{ fontSize: 25, width: "100%", fontWeight: "bold" }}>{baseCur.name}</Text>
                    <Text style={{ fontSize: 15, width: "100%" }}>{filiCur.name}</Text>
                </View>
            </View>
            <View style={styles.body}>

                <View style={styles.wrapper}>
                    <View style={{flexDirection: "column"}}>
                        <View style={styles.product}>
                            <Text style={{fontSize: 25}}>Pedidos</Text>
                            <View style={{width: "26%"}}></View>
                            <BtDef  onPress={() => navigation.navigate('Pedidos')} icon="chevron-right"/>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#DFDFDF',
                                borderBottomWidth: 2,
                                width: "60%",
                                marginLeft: "17%"
                            }}
                        />
                        <View style={styles.product}>
                            <Text style={{fontSize: 25}}>Produtos</Text>
                            <View style={{width: "24%"}}></View>
                            <BtDef  onPress={() => navigation.navigate('Produtos')} icon="chevron-right"/>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#DFDFDF',
                                borderBottomWidth: 2,
                                width: "60%",
                                marginLeft: "17%"
                            }}
                        />
                        <View style={styles.product}>
                            <Text style={{fontSize: 25}}>Pagamentos</Text>
                            <View style={{width: "14%"}}></View>
                            <BtDef onPress={() => navigation.navigate('Pagamentos')} icon="chevron-right"/>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#DFDFDF',
                                borderBottomWidth: 2,
                                width: "60%",
                                marginLeft: "17%"
                            }}
                        />
                        <View style={styles.product}>
                            <Text style={{fontSize: 25}}>Vendas</Text>
                            <View style={{width: "29%"}}></View>
                            <BtDef onPress={() => navigation.navigate('CriarPedido')} icon="chevron-right"/>
                        </View>
                        
                    </View>
                </View>

            </View>
            <View style={{height: 100}} ></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        width: "100%",
        padding: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 2,
        justifyContent: "space-between",
        justifyContent: "center",
        flexDirection: "row",  
    },
    wrapper: {
        flexDirection: "row", 
        flex: 1,
        width: "100%",
    },

    product: {
        display:'flex',
        paddingLeft: 35,
        flexDirection: "row", 
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
        
    },

    space: {
        width: 230
    }
})