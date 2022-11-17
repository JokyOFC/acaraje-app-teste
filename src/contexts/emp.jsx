import React, { createContext, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

export const EmpContext = createContext({})

import img from '../../assets/2.png'

import api from '../api/api'; 

function EmpProvider({children}) {

    const [ empr, setEmpr ] = useState();
    const [ filiais, setFilial ] = useState();

    const [ empall, setEmpAll ] = useState();

    const navigator = useNavigation();

    const profilePhoto = img

    async function entrar(emp, fili) {
        if(emp && fili) {
            setEmpr(emp);
            setFilial(fili);
            await api.post('/base/id', { id: emp }).then(function(result) {
                setEmpAll(result.data)
                console.log("result of post!!")
                console.log(result.data)
            })
            navigator.navigate('Home');
            console.log(emp, fili);
        }
        
    }
    
    
    return(
        <EmpContext.Provider value={{ empr, filiais, entrar, profilePhoto, empall }}>
            {children}
        </EmpContext.Provider>
    )
}

export default EmpProvider;
