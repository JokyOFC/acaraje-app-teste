import { useState } from "react"

import { Icon } from "react-native-elements"
import { Divider } from "react-native-paper"

import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native"
import { useEffect } from "react"


export const BoxSearch = ({ filiaisBox }) => {
    
    const [ filiais, setFiliais ] = useState([]);
    
    console.log(filiais)

    useEffect(() => {
        setFiliais(filiaisBox)
    },[filiaisBox])

    function boxTeste() {
        return filiais; 
    }

    return(
        <View style={{ backgroundColor: '#d2691e', height:300, borderRadius: 10 }}>
            <View style={{ display: 'flex',flexDirection:'row' ,height: 50, alignItems: 'center', marginLeft: 10 }}>
                <Icon name="search" type="font-awesome" color="white"/>
                <TextInput placeholder="Buscar filial..." style={{ padding: 10, color: 'white' }}/>
            </View>
            <Divider />

            
            <ScrollView style={{ maxWidth: "92%" }}>
                {
                filiais.map((filial) => {
                    console.log(filial)
                    return(
                            <View style={{ display: 'flex', flexDirection: 'row', padding: 10, paddingLeft: 25, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {}}>
                                    <Icon name="close" type="font-awesome" color="white" />
                                </TouchableOpacity>
                                <TextInput value={filial.name} multiline={true} placeholder="Digite aqui o nome da sua filial" style={{ color: 'white', marginLeft: 10, padding: 5 }} onChangeText={() => {  }}/>
                            </View>
                        )
                    })
                }
                
            </ScrollView>

            <Divider />

            <TouchableOpacity style={{ height: 50, padding: 13 }} onPress={() => {
                setFiliais([...filiais, {name: ""}])
                console.log( filiais );
            }}>
                <Icon name="plus" type="font-awesome" color="white"/>
            </TouchableOpacity>

        </View>
    )
}

export const responseReturn = ({ objAdd }) => {

    const [ obj, setObj ] = useState([]);

    setObj([ ...obj, objAdd ])

    return obj;

} 

const styles = StyleSheet.create({
    container: {
        
    }
})