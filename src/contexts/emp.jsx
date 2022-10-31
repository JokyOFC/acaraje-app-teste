import React, { createContext, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

export const EmpContext = createContext({})

import img from '../../assets/2.png'

function EmpProvider({children}) {

    const [ empr, setEmpr ] = useState()
    const [ filiais, setFilial ] = useState()

    const navigator = useNavigation();

    const profilePhoto = img

    function entrar(emp, fili) {
        if(emp && fili) {
            setEmpr(emp),
            setFilial(fili)
            navigator.navigate('Home')
            console.log(emp, fili)
        }
        
    }
    
    
    return(
        <EmpContext.Provider value={{ empr, filiais, entrar, profilePhoto }}>
            {children}
        </EmpContext.Provider>
    )
}

export default EmpProvider;
