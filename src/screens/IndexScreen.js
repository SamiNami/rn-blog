import React, { useContext, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts()
        
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        })

        // this function will be ran if the component unmounts
        return () => {
            listener.remove()
        }
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={blogPost => {
                    return blogPost.title;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    {item.title} id: {item.id}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        deleteBlogPost(
                                            item.id
                                        );
                                    }}
                                >
                                    <Feather
                                        style={styles.icon}
                                        name="trash"
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: (
            <TouchableOpacity
                onPress={() => {navigation.navigate('Create')}}
            >
                <Feather size={30} name="plus" />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;
