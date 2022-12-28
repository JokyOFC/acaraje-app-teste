import { useState, useContext } from "react";

import { View, StyleSheet,Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView , Modal, Pressable} from "react-native"

import { useNavigation, useIsFocused } from "@react-navigation/native"
import { Profile } from "../../components/Profile";
import { TextInput } from "react-native-gesture-handler";
import { BoxSearch } from "../../components/BoxSearch";

import { Divider } from "react-native-paper";
import { BtDef } from "../../components/BtDef";

import api from "../../api/api";
import { useEffect } from "react";

import { EmpContext, useEmpContext } from "../../contexts/emp";

import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { setDayOfYear } from "date-fns";

export const CriarBase = ({ route, navigation }) => {

    const { empall, empr, filiais, profilePhoto, setLoading } = useEmpContext();

    const isFocused = useIsFocused();

    const { editarBase } = route.params;

    const navigator = useNavigation();

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
    const [ empresaE, setEmpresaE ] = useState(""); 
    const [ filiaist, setFiliais ] = useState(0);
    const [ filiaisList, setFiliaisList ] = useState([]);

    const [ editanome, setEditaNome ] = useState(false);
    const [ editafili, setEditaFili ] = useState(false);
    const [ editafiliname, setEditaFiliName ] = useState(false);

    const [ editafililist, setEditaFiliList ] = useState([]);
    const [ editafilinamelist, setEditaFiliNameList ] = useState([]);

    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
        // if(baseId){
        //     api.post('/base/id', { id: baseId }).then((response) => {
        //         console.log(response.data)
        //         setResponseBase( response.data )
        //         setEmpresa(responsebase.name)
        //         setFiliaisList(responsebase.filiais)
        //     })
        // }
        console.log(editarBase)
        editarBase === false ? setEmpresa("Empresa") : setEmpresa(empall.name)  
        editarBase === false ? setEmpresaE("") : setEmpresaE(empall.name) 
        editarBase === false ? setFiliaisList([]) : setFiliaisList(empall.filiais)
        console.log(empall)
    }, [])

    

    const [ filiaisList2, setFiliaisList2 ] = useState([]);

    useEffect(() => {
        console.log("que delicia")
    }, [filiaisList2])

    console.log(empresa.length)
    console.log(filiaisList)

    function criarBaseF() {
        useEffect(() => {
            console.log(" estou criando uma base! ")
        }, [])
        return(
            <View style={styles.container}>
            <View style={ styles.header }>
                <Profile srcImg={profilePhoto}/>
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
                    paddingTop: '5%'
                }}
            />

            <View style={{ paddingTop: '5%' }}>
                <View>
                    <Text>Empresa</Text>
                    <TextInput value={empresaE} placeholder="Digite aqui o nome da sua empresa" onChangeText={(value) => {if(value === ""){ setEmpresa('Empresa'); setEmpresaE("") } else {  setEmpresa(value); setEmpresaE(value)}}}  style={{ marginTop: 10, marginBottom: 10, color: 'white', backgroundColor: '#d2691e', height: 50, borderRadius: 10, padding: 10 }} />
                </View>

                <View>
                    <Text style={{ marginBottom: 10 }}>Filiais</Text>
                    <View style={{ backgroundColor: '#d2691e', height:300, borderRadius: 10 }}>
                        <View style={{ display: 'flex',flexDirection:'row' ,height: 50, alignItems: 'center', marginLeft: 10 }}>
                            <Icon name="search" type="font-awesome" color="white"/>
                            <TextInput value="" onChangeText={(value) => { Alert.alert('Aviso!', 'Função ainda não desenvolvida no sistema! em futuras atualizações iremos trazer essa função!') }} placeholder="Buscar filial..." style={{ padding: 10, color: 'white' }}/>
                        </View>
                        <Divider />

                        
                        <ScrollView style={{ maxWidth: "92%" }}>
                            {
                            filiaisList.map((filial) => {
                                return(
                                        <View key={filial.filicod} style={{ display: 'flex', flexDirection: 'row', padding: 10, paddingLeft: 25, alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => {

                                                setFiliaisList(filiaisList.filter( x => x.filicod !== filial.filicod ))
                                                console.log(filiaisList)

                                            }}>
                                                <Icon name="close" type="font-awesome" color="white" />
                                            </TouchableOpacity>
                                            <Text style={{ color: 'white', marginLeft: 4 , marginRight: -10}}> {filial.filicod} -</Text>
                                            <TextInput value={filial.name} multiline={true} placeholder="Digite aqui o nome da sua filial" style={{ color: 'white', marginLeft: 10, padding: 5 }} onChangeText={(value) => {

                                                const objT = filiaisList.map(x => x);
                                                objT.find(e => e.filicod === filial.filicod).name = value
                                                console.log("A", filiaisList)
                                                console.log("B", objT)
                                                // const obj = filiaisList.find(e => e.filicod === filial.filicod);
                                                // obj.name = value
                                                // setFiliaisList([ ...filiaisList, obj ])
                                                // console.log(obj)
                                                setFiliaisList(objT)

                                            }}/>
                                        </View>
                                    )
                                })
                            }
                            
                        </ScrollView>

                        <Divider />

                        <TouchableOpacity style={{ height: 50, padding: 13 }} onPress={() => {
                            console.log("this is length fili")
                            console.log(filiaisList.length)
                            setFiliais(filiaisList.length)
                            //corrigir bug!!
                            setFiliaisList([...filiaisList, { filicod: filiaisList[filiaisList.length-1] === undefined || !filiaisList[filiaisList.length-1] ? 1 : filiaisList[filiaisList.length-1].filicod + 1, name: "" }])
                            // setFiliaisList([...filiaisList, { filicod: filiaisList.length + 1, name: "" }])
                        }}>
                            <Icon name="plus" type="font-awesome" color="white"/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                <BtDef onPress={() => { navigate.goBack() }}>Voltar</BtDef>
                <BtDef onPress={async() => {

                    console.log(empresaE)
                    if(empresaE === "" || empresaE.length === 0 || !empresaE)  {Alert.alert('Error', 'error')}
                    else if(filiaisList === [] || filiaisList.length === 0 || !filiaisList)  {Alert.alert('Error', 'error')} else {
                        setLoading(true) 
                        try {
                            await api.post("/base/create", { name: empresaE, filiais: filiaisList }).then(() => {
                                navigator.navigate('Finish', {desc: "Base criada com sucesso!", first: true})
                            })
                        } catch (err) {
                            console.log(err)
                        } finally {
                            setLoading(false);
                        }
                        
                    }


                }}>Finalizar</BtDef>
            </View>

        </View>
        )
    }

    function editarBaseF(){
        async function editRequest() {
            setLoading(true)
            try {
                await api.post('/base/id', { id: empr }).then((response) => {
                    setFiliaisList(response.data.filiais)
                })

            } catch (err) {

            } finally {
                setLoading(false);
            }
        }
        useEffect(() => {
            editRequest();
        }, [isFocused])
        return(
            <View style={styles.container}>
            <View style={ styles.header }>
                <Profile srcImg={profilePhoto} />
                <View style={ styles.headerTexts }>
                    <Text style={{ fontSize: 25 }}>{empresa}</Text>
                    <Text style={{ fontSize: 15 }}>{filiaisList.length} Filiais</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }}>
                    <Icon name="trash" type="font-awesome" color="red" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    borderBottomColor: '#DFDFDF',
                    borderBottomWidth: 2,
                    width: "70%",
                    marginLeft: "15%",
                    paddingTop: '5%'
                }}
            />

            <View style={{ paddingTop: '5%' }}>
                <View>
                    <Text>Empresa</Text>
                    <TextInput value={empresaE} placeholder="Digite aqui o nome da sua empresa" onChangeText={(value) => { if(value === empall.name){setEditaNome(false)} else {setEditaNome(true)}; if(value === ""){ setEmpresa('Empresa'); setEmpresaE(""); } else {  setEmpresa(value); setEmpresaE(value)}}} style={{ marginTop: 10, marginBottom: 10, color: 'white', backgroundColor: '#d2691e', height: 50, borderRadius: 10, padding: 10 }} />
                </View>

                <View>
                    <Text style={{ marginBottom: 10 }}>Filiais</Text>
                    <View style={{ backgroundColor: '#d2691e', height:300, borderRadius: 10 }}>
                        <View style={{ display: 'flex',flexDirection:'row' ,height: 50, alignItems: 'center', marginLeft: 10 }}>
                            <Icon name="search" type="font-awesome" color="white"/>
                            <TextInput value="" onChangeText={(value) => { Alert.alert('Aviso!', 'Função ainda não desenvolvida no sistema! em futuras atualizações iremos trazer essa função!') }} placeholder="Buscar filial..." style={{ padding: 10, color: 'white' }}/>
                        </View>
                        <Divider />

                        
                        <ScrollView style={{ maxWidth: "92%" }}>
                            {
                            filiaisList.map((filial) => {
                                return(
                                        <View key={filial.filicod} style={{ display: 'flex', flexDirection: 'row', padding: 10, paddingLeft: 25, alignItems: 'center' }}>
                                            <TouchableOpacity onPress={async() => {

                                                if(filial.filicod === filiais) {
                                                    Alert.alert('Error', 'Você não pode deletar a filial em que está!');
                                                }else{
                                                    setLoading(true)
                                                    try {
                                                        await api.post('/base/fili/delete', { id: empr, filicod: filial }).then(() => {
                                                            setFiliaisList(filiaisList.filter( x => x.filicod !== filial.filicod ))
                                                        })
                                                    } catch (err) {
                                                        console.log(err)
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                    console.log(filiaisList)
                                                }

                                            }}>
                                                <Icon name="close" type="font-awesome" color="white" />
                                            </TouchableOpacity>
                                            <Text style={{ color: 'white', marginLeft: 4 , marginRight: -10}}> {filial.filicod} -</Text>
                                            <TextInput value={filial.name} multiline={true} placeholder="Digite aqui o nome da sua filial" style={{ color: 'white', marginLeft: 10, padding: 5 }} onChangeText={(value) => {

                                                const objT = filiaisList.map(x => x);
                                                objT.find(e => e.filicod === filial.filicod).name = value
                                                console.log("A", filiaisList)
                                                console.log("B", objT)
                                                // const obj = filiaisList.find(e => e.filicod === filial.filicod);
                                                // obj.name = value
                                                // setFiliaisList([ ...filiaisList, obj ])
                                                // console.log(obj)
                                                setFiliaisList(objT)
                                                if(filial._id != undefined){
                                                    if(!editafilinamelist.includes(filial.filicod)) {
                                                        setEditaFiliName(true)
                                                        setEditaFiliNameList([ ...editafilinamelist, filial.filicod ])
                                                        console.log("this is the editafilinamelist")
                                                        console.log( editafilinamelist )
                                                    }
                                                }

                                            }}/>
                                        </View>
                                    )
                                })
                            }
                            
                        </ScrollView>

                        <Divider />

                        <TouchableOpacity style={{ height: 50, padding: 13 }} onPress={() => {
                            console.log("this is length fili")
                            console.log(filiaisList.length)
                            setFiliais(filiaisList.length)
                            console.log(" this is the lastId ")
                            // console.log(lastIndexOf(filiaisList))
                            setFiliaisList([...filiaisList, { filicod: filiaisList[filiaisList.length-1] === undefined || !filiaisList[filiaisList.length-1] ? 1 : filiaisList[filiaisList.length-1].filicod + 1, name: "" }])
                            setEditaFili(true);
                            // if(filiaisList === empall.filiais) {
                            //     setEditaFili(false);
                            // } else {
                            //     setEditaFili(true);
                            // }
                        }}>
                            <Icon name="plus" type="font-awesome" color="white"/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                <BtDef onPress={() => { navigate.goBack() }}>Voltar</BtDef>
                <BtDef onPress={async() => {

                    console.log('filislist filtered again')
                    console.log(filiaisList.filter(x => x._id === undefined))

                    let teste = filiaisList.filter(x => x._id === undefined);

                    setEditaFiliList(teste);

                    console.log(empr, filiais)
                    console.log('this is editaFili')
                    console.log(editafili)
                    console.log('this is editaNome')
                    console.log(editanome)

                    console.log(" this is editFiliList ")
                    console.log(editafililist)

                    let teste2 = []
                    let filinametestelist = editafilinamelist
                    console.log(filinametestelist)

                    filinametestelist.forEach( y => {teste2 = [...filiaisList.filter(x => x.filicod === y)]; return teste2 })

                    // for(const y of filinametestelist) {
                    //     teste2 = [...teste2, filiaisList.filter(x => x.filicod === y)];
                    // }

                    console.log("this is teste2!")
                    console.log(teste2)

                    if( editanome === true && editafiliname === true ) {

                        console.log('edita os 2!!')

                        if(empresaE === "" || !empresaE || empresaE.length === 0) return Alert.alert('Erro!', 'A empresa precisa ter um nome!')
                        setLoading(true);
                        try {
                            await api.post('/base/update', { id: empr, name: empresaE })
                        } catch (err) {
                            console.log(err)
                        } finally {
                            setLoading(false);
                        }

                        for(const x of teste2){
                            console.log("this from teste2!")
                            console.log(x)
                            if(x.name === "" || !x.name || x.name.length === 0) return Alert.alert('Erro!', 'A filial precisa ter um nome!')
                            setLoading(true);
                            try {
                                await api.post('/base/updatefiliname', { baseId: empr, id: x.filicod, name: x.name }).catch((err) => {
                                    Alert.alert('Error', err)
                                })
                            } catch (err) {
                                console.log(err)
                            } finally  {
                                setLoading(false);
                            }
                        }

                        navigate.navigate('Finish', { desc: 'Base atualizada com sucesso!' })

                    } else if(editafili === true && editanome === true) {
                        console.log('im in first condition')
                        if(empresaE === "" || !empresaE || empresaE.length === 0) return Alert.alert('Erro!', 'A empresa precisa ter um nome!')
                        setLoading(true);
                        try {
                            await api.post('/base/update', { id: empr, name: empresaE })
                        } catch(err) {
                            console.log(err)
                        } finally {
                            setLoading(false);
                        }
                        console.log('im in the x')
                        console.log(editafililist)
                        for (const x of teste) {
                            console.log(x)
                            if(x.name === "" || !x.name || x.name.length === 0) return Alert.alert('Erro!', 'A filial precisa ter um nome!')
                            setLoading(true);
                            try {
                                await api.post('/base/createfili', { baseId: empr, filicod: x.filicod, name: x.name })
                            } catch (err) {
                                console.log(err);
                            } finally {
                                setLoading(false);
                            }
                        }
                            navigate.navigate('Finish', { desc: 'Base atualizada com sucesso!' })
                    } else if( editanome === true && editafili === false ) {
                        if(empresaE === "" || !empresaE || empresaE.length === 0) return Alert.alert('Erro!', 'A empresa precisa ter um nome!')
                        setLoading(true);
                        try{
                            await api.post('/base/update', { id: empr, name: empresaE }).then(() => {
                                navigate.navigate('Finish', { desc: 'Base atualizada com sucesso!' })
                            })
                        } catch(err) {
                            console(err);
                        } finally {
                            setLoading(false);
                        }
                    } else if( editanome === false && editafili === true ){
                        console.log('this is testeeee!')
                        console.log(teste)
                        for (const x of teste) {
                            console.log(x)
                            if(x.name === "" || !x.name || x.name.length === 0) return Alert.alert('Erro!', 'A filial precisa ter um nome!')
                            setLoading(true);
                            try {
                                await api.post('/base/createfili', { baseId: empr, filicod: x.filicod, name: x.name })
                            } catch (err) {
                                console.log(err);
                            } finally {
                                setLoading(false);
                            }
                        }
                        navigate.navigate('Finish', { desc: 'Base atualizada com sucesso!' })
                    } else if( editafiliname === true && editanome === false) {
                        console.log(teste2)
                        for(const x of teste2){
                            console.log("this from teste2!")
                            console.log(x)
                            if(x.name === "" || !x.name || x.name.length === 0) return Alert.alert('Erro!', 'A filial precisa ter um nome!')
                            setLoading(true);
                            try {
                                await api.post('/base/updatefiliname', { baseId: empr, id: x.filicod, name: x.name })
                            } catch (err) {
                                console.log(err)
                            } finally {
                                setLoading(false);
                            }
                            
                        }
                        navigate.navigate('Finish', { desc: 'Base atualizada com sucesso!' })
                    } else {
                        Alert.alert('Error', 'error')
                    }

                }}>Salvar</BtDef>
            </View>

            <Modal 
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '100%' }}>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22}}>
                        <View style={{margin: 20,
                                    backgroundColor: "white",
                                    opacity: 1,
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                            }}>
                            <Text style={{ color: "black",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        paddingBottom: 10,
                                        fontSize: 15,
                            }}>Deseja deletar essa base?</Text>
                            <Text style={{ color: "black",
                                        paddingBottom: 10,
                                        fontSize: 15,
                                        textAlign: 'justify'
                            }}>Aviso! Ao deletar essa base, todos seus pedidos, produtos e formas de pagamentos também irão ser deletadas!</Text>
                            <Text style={{ color: "red",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        paddingBottom: 10,
                                        fontSize: 15,
                            }}>Isso é irreversivel!</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: "42%", padding: 0 }}>
                                    <Pressable style={[styles.button, styles.buttonClose]}
                                        onPress={async() =>{
                                            // {console.log("there is paaaayments!!")
                                            // console.log(checked) }
                                            setLoading(true);
                                            try {
                                                await api.post('/base/delete', { id: empr}).then(() => {
                                                    setModalVisible(!modalVisible)
                                                    navigator.navigate('Select')
                                                })
                                            } catch(err) {
                                                console.log(err)
                                            } finally {
                                                setLoading(false);
                                            }
                                            
                                        }
                                    }>
                                        <Text style={{ color: 'white' }}>Sim</Text>
                                    </Pressable>
                                    <Pressable style={[styles.button, styles.buttonClose]}
                                        onPress={() =>{
                                            setModalVisible(!modalVisible)
                                        }
                                    }>
                                        <Text style={{ color: 'white' }}>Não</Text>
                                    </Pressable>
                                </View>          
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
        )
    }

    return(
        <SafeAreaView >
            <KeyboardAvoidingView >
                <ScrollView >
                    { editarBase === true ? editarBaseF() : criarBaseF() }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        height: 200,
        alignItems: 'center',
        maxWidth: '50%'
    },
    
    headerTexts: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: '7%',
        minWidth: '50%'
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: 60,
        alignItems: "center",
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        marginTop: 20,
        backgroundColor: "#d2691e",
      },

})
