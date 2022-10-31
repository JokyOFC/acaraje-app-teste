
import { useContext } from "react";

import { StyleSheet, Text, Button, View } from "react-native"

import { Profile } from "../../components/Profile"
import { BtDef } from "../../components/BtDef"

import { useNavigation } from '@react-navigation/native';

import { EmpContext } from "../../contexts/emp";

import base from "../../api/json/base.json"

export const Home = () => {

    const { empr, filiais, profilePhoto } = useContext(EmpContext)

    const navigation = useNavigation();

    const baseCur = base.find(e => e._id === empr)

    const filiCur = baseCur.filiais.find(fil => fil.filicod === filiais)

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Profile srcImg={profilePhoto}/>
                </View>
                <View style={{ flex:1, flexDirection: "column", paddingLeft: 20, width: 80 }}>
                    <Text style={{ fontSize: 20, width: "100%" }}>{baseCur.name}</Text>
                    <Text>{filiCur.name}</Text>
                </View>
            </View>
            <View style={styles.body}>

                <View style={styles.wrapper}>
                    <View style={{flexDirection: "column"}}>
                        <View style={styles.product}>
                            <Text style={{fontSize: 25}}>Pedidos</Text>
                            <View style={{width: "35%"}}></View>
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
                            <View style={{width: "32%"}}></View>
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
                            <View style={{width: "22%"}}></View>
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
                            <Text style={{fontSize: 25}}>Criar Pedidos</Text>
                            <View style={{width: "20%"}}></View>
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