import { useState } from "react"

import { Icon } from "react-native-elements"
import { Divider } from "react-native-paper"

import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native"

export const BoxSearch = ({ filiaisBox }) => {
    
    const [ filiais, setFiliais ] = useState([{}]);

    return(
        <View style={ styles.container }>
            
            <View style={{ display: 'flex',flexDirection:'row' ,height: 50, alignItems: 'center', marginLeft: 10 }}>
                <Icon name="search" type="font-awesome" color="white"/>
                <TextInput placeholder="Buscar filial..." style={{ padding: 10, color: 'white' }}/>
            </View>
            <Divider />

            
            <ScrollView>
                {filiais.map((filial) => {
                    return(
                        <View>
                            <Icon />
                            <Text>  </Text>
                        </View>
                    )
                })}
            </ScrollView>

            <Divider />

            <TouchableOpacity style={{ height: 50, padding: 13 }}>
                <Icon name="plus" type="font-awesome" color="white"/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d2691e',
        height:300,
        borderRadius: 10
    }
})