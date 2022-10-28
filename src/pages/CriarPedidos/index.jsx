
import { useEffect, useState } from "react";

import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native"

import DropDownPicker from "react-native-dropdown-picker";

import products from '../../api/json/products.json'

import payments from '../../api/json/payments.json'

import CheckBox from 'expo-checkbox';

import { RadioButton } from 'react-native-paper';

import { BtDef } from "../../components/BtDef";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

export const CriarPedidos = () => {

    const [ item, setItem ] = useState({})

    const [ total, setTotal ] = useState(0)
    
    const navigator = useNavigation();

    const [checked, setChecked] = useState('first');

    return(
        <SafeAreaView>
                <View style={styles.container}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Produtos</Text>
                        <ScrollView style={{ maxHeight: 265 }}>
                            {
                                products.map((Data) => {
                                    
                                const [toggleCheckBox, setToggleCheckBox] = useState(false)
                                
                                // setItem(Data)
                                console.log(Data)

                                return(
                                    <View key={Data._id} style={{ display: "flex", flexDirection: 'row', alignItems: 'center', paddingTop: "7%"}}>
                                        <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center'}}>
                                            <TouchableOpacity style={{  alignItems: "center", justifyContent: "center", padding: 10, paddingRight: 0 }} onPress={() => {
                                                    setToggleCheckBox(!toggleCheckBox)
                                                }}>
                                                <CheckBox 
                                                    disabled={false}
                                                    value={toggleCheckBox}
                                                    onValueChange={(newValue) => { setToggleCheckBox(newValue) }}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "center", maxWidth: 180 , minHeight: 50}}>
                                                <Text style={{paddingLeft: 20}}>{Data.name}</Text>
                                            </View>
                                        </View>
                                        <View style={{display: 'flex', alignContent: 'center', flexDirection: 'row', alignItems: "center", marginLeft: "auto" }}>
                                            <Text style={{color: "green", paddingLeft: 10}}>R$ {Data.price}</Text>
                                            <Text> X </Text>
                                            <TextInput style={{ marginLeft: "5%", padding: 5, backgroundColor: "#DFDFDF", height: 40, borderRadius: 5, textAlign: "center"}} placeholder="QTDE" keyboardType="numeric" maxLength={2}/>
                                        </View>
                                    </View>
                                )
                            }) 
                            }
                        </ScrollView>
                    </View>
                    <View style={{ minHeight: '20%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: "green", fontSize: 25, fontWeight: "bold" }}>Total</Text>
                            <Text style={{ color: "green", fontSize: 20 }}>R$ 00.00</Text>
                    </View>
                    <View >
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Forma de pagamento</Text>
                        <ScrollView style={{ maxHeight: 100 }}>
                            <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                            {
                                payments.map((Data) => {
                                    return(
                                        <View key={Data._id} style={{ paddingTop: "1%" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton
                                                    value=""
                                                    // status={ checked === 1 ? 'checked' : 'unchecked' }
                                                    // onPress={() => checked ? setChecked(0): setChecked(1)}
                                                />
                                                <Text>{Data.name}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            </RadioButton.Group>
                        </ScrollView>
                    </View>
                    <View style={{ width: "100%", alignItems: "center", marginTop: "7%" }}>
                        <BtDef onPress={() => {
                            navigator.navigate('Finish')
                        }} > Finalizar </BtDef>
                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: "10%",
        paddingRight: "10%", 
        paddingBottom: "30%",
    }
})