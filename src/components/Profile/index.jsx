import { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'

export const Profile = ({ srcImg, large }) => {

    return(
        <>
        {large ? <View style={styles.containerLarger}>
                { srcImg ? <Image style={styles.avatar} source={srcImg} /> : "" }
            </View> : <View style={styles.container}>
            { srcImg ? <Image style={styles.avatar} source={srcImg} /> : "" }
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
        elevation: 10
    },
    containerLarger: {
        width: 200,
        height: 200,
        backgroundColor: '#DFDFDF',
        borderRadius: 100,
        elevation: 10
    },
    avatar: {
        width: "100%",
        height: "100%", 
        borderRadius: 100, 
    }

})
