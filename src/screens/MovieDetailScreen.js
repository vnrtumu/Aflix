import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { ImgUrl500 } from '../constants';
import { fetchMovieCast, fetchMovieDetail, fetchSimilarMovies } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const MovieDetailScreen = () => {
  const navigation = useNavigation()
  const [isFavourite, toggleFavourite] = useState(false);
  const [itemData, setItemData] = useState({});
  const [cast, setCast] = useState([])
  const [simlarMovies, setSimlarMovies] = useState([])
  const [loading, setLoading] = useState(false);
  const { params: item } = useRoute();
  let moveiName = "Movies Venakata narayana: Tumuereddy"
  useEffect(() => {
    setLoading(true)
    // call the movie detail api 
    getMovieDetail(item.id)
    getMovieCast(item.id)
    getSimilarMovie(item.id)
  }, [item])
  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetail(id);
    if (data && data) setItemData(data)
    setLoading(false)
  }

  const getMovieCast = async (id) => {
    const data = await fetchMovieCast(id);
    if (data && data.cast) setCast(data.cast)
    setLoading(false)
  }

  const getSimilarMovie = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimlarMovies(data.results)
    setLoading(false)
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      {/* Back buttton and Movie Poster */}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
          <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()} >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: ImgUrl500(item.poster_path) }}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.40 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}

      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider ">{itemData?.original_title}</Text>

        <Text className="text-neutral-400 text-center text-base font-semibold ">{itemData?.status} - {itemData?.release_date?.split('-')[0]} - {itemData?.runtime} min</Text>

        <View className=" flex-row justify-center mx-4 space-x-2 ">
          {itemData.genres ? itemData.genres.map((genre, index) => {
            return (<Text className="text-neutral-400 text-center text-base font-semibold" key={index}>{genre.name}</Text>)
          }) : null}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">{itemData.overview}</Text>
      </View>
      {/* Cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similar Movies */}
      <MovieList title="Simlar Movies" hideSeeAll={true} data={simlarMovies} />
    </ScrollView>
  )
}

export default MovieDetailScreen
