import React, {useState} from 'react';
import {View,TouchableOpacity, Text, Modal, StyleSheet, Image, Pressable, ScrollView, FlatList} from 'react-native';
import axios from 'axios';


const api= {
    ACCESS_KEY: 'a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa',
    base: 'https://api.unsplash.com/photos/?',
}
let PHOTO_DATA;

// Fecth API

const getPhotoAPI = async () => {

    const res = await axios.get(`${api.base}client_id=${api.ACCESS_KEY}`);
    const data = await res.data;
    //console.log(data);
    PHOTO_DATA = data;
}

getPhotoAPI();


function Item ({user_name, user_image, feed_image, feed_imageRegular, like_count, user_bio}) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    
    

    return(
        <View style={styles.container}>
           
            <Modal style={styles.modalContainer}
                animationType='fade'
                statusBarTranslucent={true}              
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View>
                
                    <Image style={styles.modalPhoto} source={{uri: feed_imageRegular}}/>
                    <Text style={styles.like}>{like_count} Votes</Text>
                    <Text style={styles.nameProfile}>{user_name}</Text>
                    
                    <Modal
                        animationType='slide'
                        statusBarTranslucent={true}              
                        visible={modalVisible2}
                        onRequestClose={() => {
                            setModalVisible2(!modalVisible2);
                        }}
                    >
                        <View style={styles.profile}>

                            <View style={styles.inf}>
                           
                                
                                <View style={styles.photoCont}>
                                    <Image style={styles.photoUser} source={{uri: user_image}}/>
                                </View>
                                
                                <View>
                                    <Text style={styles.profileName}>{user_name}</Text>
                                    <Text style={styles.textBio}>{user_bio}</Text>
                                </View>

                                
                            </View>
                            
                        </View>
                    </Modal>     
                    <TouchableOpacity
                        onPress={() => setModalVisible2(true)}
                        style={styles.viewProfile}
                    >
                        <Text style={styles.textProfile} >Ver Perfil</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
                <View style={styles.containerFeed}>
                    <Pressable onPress={() => setModalVisible(true)}>

                        <Image style={styles.feedPhotos} source={{uri: feed_image}} />
                        <Text style={styles.likeFeedPhoto}>{like_count} Votos</Text>
                    </Pressable>
                </View>
        </View>
    );
}

export default function Home() {

    
    return(
        <View>
             <View style={styles.header}>
                <Text style={styles.textHeader}>Discover</Text>
            </View>
            
            <FlatList
                data={PHOTO_DATA}
                numColumns={2}
                renderItem={({ item }) => 
                <Item 
                    user_name={item.user.name}
                    user_image={item.user.profile_image.large}
                    feed_imageRegular={item.urls.regular}
                    feed_image={item.urls.small}
                    like_count={item.likes}
                    user_bio= {item.user.bio}
                />}
            KeyExtractor={item => item.id}
            />
        </View>
    );
  
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },

    
    feedPhotos:{
        width: 145,
        height: 235,
        borderRadius: 15,
        marginHorizontal: 10,
    },

    likeFeedPhoto:{
        color: 'white',
        bottom: '10%',
        left: '10%',
        position: 'absolute',
    },

    containerFeed:{
        alignItems: 'stretch',
        justifyContent: 'center',
    },

    header:{
        paddingTop: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textHeader:{
        fontSize: 40,
        fontWeight: 'bold'
    },

    nameProfile: {
        color: 'white',
        fontSize: 20,
        bottom: '18%',
        marginLeft: 10,
    },

     modalPhoto: {
         width: "100%",
         height: "100%"
     },

    like: {
        position: 'absolute',
        bottom: '25%',
        color: 'white',
        marginLeft: 10,
    },
    viewProfile: {
        bottom: '10%',
        marginLeft: 10,
        position: 'absolute',
    },

    textProfile:{
        color: 'white',
        fontSize: 16,
    },

    profile: {
        padding: 20,
    },

    inf: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal:20,
    },

    photoCont: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },

    photoUser: {
        borderRadius: 50,
        width: 60,
        height: 60,
    },

    profileName: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'justify',

    },

    textBio: {
        textAlign: 'justify',
        marginRight: 10,
    },

});
