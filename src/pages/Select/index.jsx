import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert } from "react-native"

import { Profile } from "../../components/Profile"
import { BtDef } from "../../components/BtDef"

import DropDownPicker from "react-native-dropdown-picker";

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import base from '../../api/json/base.json'
import { EmpContext } from '../../contexts/emp';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

      const [ disb, setDisb ] = useState(true)

      useEffect(() => {
        const result = base.map((item) => ({
          label: item.name, 
          value: item._id
        }))

        setEmp(result)
      },[])

      const { entrar, profilePhoto } = useContext(EmpContext)

    return(
      <SafeAreaView>
          <View style={styles.container}>
              <View style={styles.header}>
                  <Profile large={true} srcImg={profilePhoto}/>
              </View>
              <View style={styles.form}>
                  <Text style={{color: "#ea9247", paddingBottom: 5}}>Selecione uma empresa</Text>
                  <DropDownPicker
                    style={styles.dropdown}
                    open={empOpen}
                    value={empValue}
                    items={emp}
                    setOpen={setEmpOpen}
                    setValue={setEmpValue}
                    setItems={setEmp}
                    placeholder="Empresa"
                    placeholderStyle={styles.placeholderStyles}
                    autoScroll={true}
                    zIndex={4000}
                    zIndexInverse={2000}
                    containerStyle={{width:"80%"}}
                    closeAfterSelecting={true}
                    listMode="SCROLLVIEW"
                    textStyle={{ color: "white" }}
                    dropDownContainerStyle={{ backgroundColor: "#d2691e" }}
                    onSelectItem={(value) => {
                      console.log(value)
                      const resultVal = base.filter(x => x._id === value.value)[0].filiais.map((item) => ({
                        label: item.name, 
                        value: item.filicod
                      }))
              
                      setFili(resultVal)
                      setDisb(false)
                    }}
                  />
                  
                  <View style={{ height: 30 }}></View>
                  <Text style={{color: "#ea9247", paddingBottom: 5}}>Selecione uma Filial</Text>
                  <DropDownPicker
                    style={styles.dropdown}
                    open={filiOpen}
                    value={filiValue}
                    items={fili}
                    setOpen={setFiliOpen}
                    setValue={setFiliValue}
                    setItems={setFili}
                    placeholder="Filial"
                    placeholderStyle={styles.placeholderStyles}
                    autoScroll={true}
                    zIndex={3000}
                    containerStyle={{width:"80%"}}
                    zIndexInverse={2000}
                    closeOnBackPressed={true}
                    disabled={disb}
                    listMode="SCROLLVIEW"
                    textStyle={{ color: "white" }}
                    dropDownContainerStyle={{ backgroundColor: "#d2691e" }}
                  />
              </View>
              <View styles={{marginTop: "10%", alignItems: "center", justifyContent: "center"}}>
                  <TouchableOpacity>
                    <Text style={{color: "white"}}>Criar uma nova base</Text>
                  </TouchableOpacity>
                  <BtDef onPress={() => {!filiValue || !empValue ? Alert.alert('Error!','error!') : entrar(empValue, filiValue) }}>Entrar</BtDef>
              </View>

          </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container:{
        alignItems: "center",
        backgroundColor: "#9b3c00"
    },
    form: {
    marginBottom: 100,
    },
    header: {
        paddingTop: "20%",
        paddingBottom: "15%",
    },
    placeholderStyles: {
      color: "#ea9247",
    },
    dropdown: {
      borderColor: "#B7B7B7",
      backgroundColor: "#b6520f",
      height: 60,
      elevation: 10,
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
  