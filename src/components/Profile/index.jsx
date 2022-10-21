import { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'

export const Profile = ({ srcImg, large }) => {

    return(
        <>
        {large ? <View style={styles.containerLarger}>
                { srcImg ? <Image style={styles.avatar} /> : "" }
            </View> : <View style={styles.container}>
        { srcImg ? <Image style={styles.avatar} /> : "" }
        </View>}
            
        
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        width: 130,
        height: 130,
        backgroundColor: '#DFDFDF',
        borderRadius: 100,
    },
    containerLarger: {
        width: 200,
        height: 200,
        backgroundColor: '#DFDFDF',
        borderRadius: 100,
    },
    avatar: {
        width: 130,
        height: 130, 
        borderRadius: 50, 
    }

})
