import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { ImgUrl500 } from '../constants';

const { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableOpacity onPress={handleClick}>
            <Image
                source={{ uri: ImgUrl500(item.poster_path) }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className="rounded-3xl"
            />
        </TouchableOpacity>
    );
}

const TendingMovies = ({ data }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('MovieDetail', item)
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5 font-semibold">Tending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={() => handleClick(item)} />}
                firstItem={1}
                inactiveSliderOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}



export default TendingMovies