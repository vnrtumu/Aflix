import React, { useState, useEffect } from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Bars3BottomLeftIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme';
import TendingMovies from '../components/TendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';
const MovieScreen = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upComingingMovies, setUpComingingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true)
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrendingMovies(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpComingingMovies(data.results)
        setLoading(false)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopRatedMovies(data.results)
        setLoading(false)
    }
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className='mb-3'>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3BottomLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassCircleIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {/* Trending Movies Carousel*/}
                    <TendingMovies data={trendingMovies} />
                    {/* Top rated Movies Carousel*/}
                    <MovieList data={upComingingMovies} title="Upcoming" />
                    {/* Upcoming Movies Carousel*/}
                    <MovieList data={topRatedMovies} title="Top Rated" />
                </ScrollView>
            )}


        </View>
    )
}

export default MovieScreen