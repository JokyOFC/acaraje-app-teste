import React, { FC, useState } from 'react';
import { Text, StyleSheet, View } from "react-native"

import { Profile } from "../../components/Profile"
import { BtDef } from "../../components/BtDef"
import { Combo } from "../../components/Combo"

import DropDownPicker from "react-native-dropdown-picker";

import { useNavigation } from '@react-navigation/native';

export const Select = () => {

    const navigation = useNavigation();

    const [empOpen, setEmpOpen] = useState(false);
    const [empValue, setEmpValue] = useState(null);
    const [emp, setEmp] = useState([
        { label: "Emp1", value: "Emp1" },
        { label: "Emp2", value: "Emp2" },
        { label: "Emp3", value: "Emp3" },
      ]);

    const [filiOpen, setFiliOpen] = useState(false);
    const [filiValue, setFiliValue] = useState(null);
    const [fili, setFili] = useState([
        { label: "Filial 1", value: "filial1" },
        { label: "Filial 2", value: "filial2" },
        { label: "Filial 3", value: "filial3" },
      ]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Profile large={true}/>
            </View>
            <View style={styles.form}>
                <Text>Selecione uma empresa</Text>
                <DropDownPicker
                style={styles.dropdown}
                open={empOpen}
                value={empValue} //genderValue
                items={emp}
                setOpen={setEmpOpen}
                setValue={setEmpValue}
                setItems={setEmp}
                placeholder="Empresa"
                placeholderStyle={styles.placeholderStyles}
                zIndex={3000}
                zIndexInverse={1000}
                />
                
                <View style={{ height: 30 }}></View>
                <Text>Selecione uma Filial</Text>
                <DropDownPicker
                style={styles.dropdown}
                open={filiOpen}
                value={filiValue} //genderValue
                items={fili}
                setOpen={setFiliOpen}
                setValue={setFiliValue}
                setItems={setFili}
                placeholder="Filial"
                placeholderStyle={styles.placeholderStyles}
                zIndex={2000}
                zIndexInverse={1000}
                />
            </View>
            <View styles={{marginTop: 200}}>
                <BtDef onPress={() => navigation.navigate('Home')}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        alignItems: "center",
    },
    form: {
    marginBottom: 100,
    },
    header: {
        paddingTop: 200,
        paddingBottom: 100,
    },
    placeholderStyles: {
      color: "grey",
    },
    dropdownGender: {
      marginHorizontal: 10,
      width: "50%",
      marginBottom: 15,
    },
    dropdown: {
      borderColor: "#B7B7B7",
      height: 60,
      
      width: 400,
    },
    getStarted: {
      backgroundColor: "#5188E3",
      color: "white",
      textAlign: "center",
      marginHorizontal: 60,
      paddingVertical: 15,
      borderRadius: 50,
      marginTop: 20,
    },
  });
  