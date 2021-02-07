import React, { useEffect, useState } from 'react'
import IVideo from '../../../interfaces/IVideo';
import * as VideoService from '../../../services/VideoService'
import VideoItem from '../VideoItem/VideoItem';

const VideoList = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const res = await VideoService.getVideos();
        const sortedVideos = res.data.map(video => {
            return {
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date()
            }
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setVideos(sortedVideos);
    }

    return (
        <div className="row">
            {videos.map((video) => {
                return <VideoItem key={video._id} video={video} getVideos={getVideos} />
            })}
        </div>
    )
}

export default VideoList
