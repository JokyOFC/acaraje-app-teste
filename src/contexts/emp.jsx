import React, { createContext, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

export const EmpContext = createContext({})

import img from '../../assets/2.png'

import api from '../api/api'; 
import { useEffect, useContext } from 'react';

function EmpProvider({children}) {

    const [ empr, setEmpr ] = useState();
    const [ filiais, setFilial ] = useState();

    const [ empall, setEmpAll ] = useState();

    const [ loading, setLoading ] = useState(false);

    const navigator = useNavigation();

    const profilePhoto = img

    async function entrar(emp, fili) {
        if(emp && fili) {
            try {
                setEmpr(emp);
                setFilial(fili);
                await api.post('/base/id', { id: emp }).then(function(result) {
                    setEmpAll(result.data)
                    console.log("result of post!!")
                    console.log(result.data)
                })
                navigator.navigate('Home');
                console.log(emp, fili);

            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
        
    }

    async function recarregar(emp, fili) {
        try{
            if(emp && fili) {
                setEmpr(emp);
                setFilial(fili);
                await api.post('/base/id', { id: emp }).then(function(result) {
                    setEmpAll(result.data)
                    console.log("result of post!!")
                    console.log(result.data)
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
        
    }
    
    return(
        <EmpContext.Provider value={{ empr, filiais, entrar, profilePhoto, empall, recarregar, loading, setLoading }}>
            {children}
        </EmpContext.Provider>
    )

}

export const useEmpContext = () => useContext(EmpContext);

export default EmpProvider;
