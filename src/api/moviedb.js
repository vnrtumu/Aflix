import axios from "axios";
import { apiKey, BaseUrl } from "../constants";


// Endpoints
export const trendingMoviesEndpoint = `${BaseUrl}trending/movie/day?api_key=${apiKey}`;
export const upcomingMoviesEndpoint = `${BaseUrl}movie/upcoming?api_key=${apiKey}`;
export const topRatedMoviesEndpoint = `${BaseUrl}movie/top_rated?api_key=${apiKey}`;

export const movieDetailEndpoint = id => `${BaseUrl}movie/${id}?api_key=${apiKey}`;
export const movieCastEndpoint = id => `${BaseUrl}movie/${id}/credits?api_key=${apiKey}`;
export const similarMovieEndpoint = id => `${BaseUrl}movie/${id}/similar?api_key=${apiKey}`;
export const searchMoviesEndpoint =  `${BaseUrl}search/movie?api_key=${apiKey}`;

export const personDetailEndpoint = id => `${BaseUrl}person/${id}?api_key=${apiKey}`;
export const personMoviesEndpoint = id => `${BaseUrl}person/${id}/movie_credits?api_key=${apiKey}`;





const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
       const response = await axios.request(options);
       return response.data;
    } catch (error) {
        console.log("error----->", error)
        return {};
    }
}

export const  fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}

export const  fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}

export const  fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const  fetchMovieDetail = (id) => {
    return apiCall(movieDetailEndpoint(id))
}

export const  fetchMovieCast = (id) => {
    return apiCall(movieCastEndpoint(id))
}

export const  fetchSimilarMovies = (id) => {
    return apiCall(similarMovieEndpoint(id))
}

export const  fetchPersonDetail = (id) => {
    return apiCall(personDetailEndpoint(id))
}

export const  fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id))
}

export const  fetchSearchMovies = params => {
    console.log("params-->", params);
    return apiCall(searchMoviesEndpoint, params)
}