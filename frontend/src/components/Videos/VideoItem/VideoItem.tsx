import React from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router'
import * as VideoService from '../../../services/VideoService'
import IProps from '../../../interfaces/IProps'
import IVideo from '../../../interfaces/IVideo';
import './VideoItem.css'

const VideoItem = (props: IProps) => {
    const video: IVideo = props.video;
    const getVideos = props.getVideos;

    const history = useHistory();

    const handleDelete = async (id: string) => {
        await VideoService.deleteVideo(id);
        getVideos();
    }

    return (
        <div className="col-md-4">
            <div className="card video-card" >
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h1 onClick={() => history.push(`/update-video/${video._id}`)}>{video.title}</h1>
                        <span className="text-danger" onClick={() => { video._id && handleDelete(video._id) }}>x</span>
                    </div>
                    <p>{video.description}</p>
                    <div className="embed-responsive embed-responsive-16by9">
                        <ReactPlayer url={video.url} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoItem
