import React, { useCallback, useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchSearchMovies } from '../api/moviedb';
import { debounce } from "lodash";
import { ImgUrl342 } from '../constants';


const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';


const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false);
    let moveiName = "Movies Venakata narayana reddy: Tumu"
    // fetchSearchMovies
    const handleSearch = value => {
        if (value && value.length > 2) {
            fetchSearchMovies({ query: value }).then(data => {
                if(data && data.results) setSearchResults(data.results);
                setLoading(false)
                // console.log("data", data);
            }).catch(error => console.log("error====>", error))
        }else {
            setSearchResults([]);
            setLoading(true)
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
                />
                <TouchableOpacity onPress={() => navigation.navigate('Home')} className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <Loading />
            ) : (
                searchResults.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >
                        <Text className="text-white font-semibold ml-1"> Results ({searchResults.length}) </Text>
                        <View className="flex-row justify-between flex-wrap">
                            {
                                searchResults.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => navigation.push('MovieDetail', item)}>
                                            <View className="space-y-2 mb-4">
                                                <Image className="rounded-3xl" source={{uri: ImgUrl342(item.poster_path)}} style={{ height: height * 0.3, width: width * 0.44 }} />
                                                <Text className="text-neutral-300 ml-1">
                                                    {item?.original_title.length > 22 ? item?.original_title.slice(0, 22) + '...' : item?.original_title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-row justify-center">
                        <Image className="h-96 " source={require('../../nodata.jpeg')} style={{ height: height * 0.3, width: width * 0.9 }} />
                    </View>
                )
            )}


        </SafeAreaView>
    )
}

export default SearchScreen