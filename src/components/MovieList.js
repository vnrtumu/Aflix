import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ImgUrl185, ImgUrl500, fallBackPoster } from '../constants';

const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }) => {

  const navigation = useNavigation();
  let moveiName = "Movies Venakata narayana reddy: Tumu"
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center ">
        <Text className="text-white text-xl font-semibold ">{title}</Text>
        {!hideSeeAll ? (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">See All</Text>
          </TouchableOpacity>
        ) : null}

      </View>
      {/* Movie Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push('MovieDetail', item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={{uri: ImgUrl185(item.poster_path ) || fallBackPoster}}
                    style={{ width: width * 0.33, height: height * 0.22 }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300 ml-1">
                    {/* {item.title} */}
                    {item && item.title ? item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title : null}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>
    </View>
  )
}

export default MovieList