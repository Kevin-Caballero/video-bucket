import axios from "axios";
import IVideo from "../interfaces/IVideo";

const apiBaseURL = 'http://localhost:8000/api';

export const getVideos = async () => {
    return await axios.get<IVideo[]>(`${apiBaseURL}/videos`);
}

export const getVideo = async (id: string) => {
    return await axios.get<IVideo>(`${apiBaseURL}/videos/${id}`);
}

export const createVideo = async (video: IVideo) => {
    return await axios.post(`${apiBaseURL}/videos`, video);
}

export const updateVideo = async (id: string, video: IVideo) => {
    return await axios.put(`${apiBaseURL}/videos/${id}`, video);
}

export const deleteVideo = async (id: string) => {
    return await axios.delete(`${apiBaseURL}/videos/${id}`);
}