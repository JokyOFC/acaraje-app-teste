
import { useState } from "react";

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native"

import DropDownPicker from "react-native-dropdown-picker";

import products from '../../api/json/products.json'

import payments from '../../api/json/payments.json'

import CheckBox from 'expo-checkbox';


import { RadioButton } from 'react-native-paper';

import { BtDef } from "../../components/BtDef";
import { SafeAreaView } from "react-native-safe-area-context";

export const CriarPedidos = () => {

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Produtos</Text>
                    <ScrollView style={{ maxHeight: 345 }}>
                        {
                        products.map((Data) => {

                            const [toggleCheckBox, setToggleCheckBox] = useState(false)

                            return(
                                <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center',}}>
                                    <View style={{ display: "flex", flexDirection: 'row', paddingTop: "10%", alignItems: "center", justifyContent: "center" }}>
                                        <TouchableOpacity style={{  alignItems: "center", justifyContent: "center", padding: 10 }} onPress={() => {
                                            setToggleCheckBox(!toggleCheckBox)
                                        }}>
                                            <CheckBox 
                                            disabled={false}
                                            value={toggleCheckBox}
                                            onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                                        </TouchableOpacity>
                                        <Text style={{paddingLeft: 20}}>{Data.name}</Text>
                                        <Text style={{color: "green", paddingLeft: 10}}>R$ {Data.price}</Text>
                                    </View>
                                    <View style={{display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: "center", paddingTop: "10%", paddingLeft: "3%"}}>
                                        <Text> X </Text>
                                        <TextInput style={{ marginLeft: "5%", padding: 5, backgroundColor: "#DFDFDF", height: 40, borderRadius: 5, textAlign: "center"}} placeholder="QTDE" keyboardType="numeric"/>
                                    </View>
                                </View>
                            )
                        }) 
                        }
                    </ScrollView>
                </View>
                <View style={{ minHeight: '20%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: "green", fontSize: 25, fontWeight: "bold" }}>Total</Text>
                        <Text style={{ color: "green", fontSize: 20 }}>R$ XX.XX</Text>
                </View>
                {/* <View >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Forma de pagamento</Text>
                    {
                        payments.map((Data) => {
                            const [checked, setChecked] = useState('first');

                            return(
                                <View style={{ paddingTop: "5%" }}>
                                    <View style={{ flexDirection: "row" }}>
                                         <RadioButton
                                            value="first"
                                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                                            onPress={() => setChecked('first')}
                                        />
                                    </View>
                                </View>
                            )
                        })
                    }
                </View> */}
                <View style={{ width: "100%", alignItems: "center", marginTop: "10%" }}>
                    <BtDef icon/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "10%", 
    }
})