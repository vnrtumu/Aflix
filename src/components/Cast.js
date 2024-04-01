import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { ImgUrl185, ImgUrl342 } from '../constants';

const Cast = ({ cast, navigation }) => {
    return (
        <View className="my-6"  >
            <Text className="text-white text-lg mx-5 mb-5 font-semibold">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 15, marginLeft: 20 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity key={index} className="mr-4 items-center" onPress={() => navigation.navigate('Person', person)}>
                                <View className="overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500">
                                    <Image source={{ uri: ImgUrl185(person.profile_path) }} className="rounded h-24 w-20" />
                                </View>
                                <Text className=" text-white text-xs mt-1">
                                    {person.original_name ? person.original_name.length > 10 ? person.original_name.slice(0, 10) + "..." : person.original_name : null}
                                </Text>
                                <Text className=" text-neutral-400 text-xs mt-1">
                                    {person.character ? person.character.length > 10 ? person.character.slice(0, 10) + "..." : person.character : null}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Cast