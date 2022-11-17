import { useState } from "react"

import { Icon } from "react-native-elements"
import { Divider } from "react-native-paper"

import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native"

export const BoxSearch = ({ filiaisBox }) => {
    
    const [ filiais, setFiliais ] = useState([{}]);

    return(
        <View>
            
            <View>
                <Icon name="" type="" color=""/>
                <TextInput />
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

            <TouchableOpacity>
                <Icon name="" type="" color=""/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})