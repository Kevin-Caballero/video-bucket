import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from "react-toastify";
import IVideo from '../../../interfaces/IVideo';
import IParams from '../../../interfaces/IParams';
import * as VideoService from '../../../services/VideoService'

const VideoForm = () => {
    const history = useHistory();
    const params = useParams<IParams>();

    const [video, setVideo] = useState<IVideo>({
        title: '',
        description: '',
        url: ''
    });

    useEffect(() => {
        if (params.id) {
            getVideo(params.id);
        }
    }, [params.id])

    const getVideo = async (id: string) => {
        const res = await VideoService.getVideo(id);
        console.log(res);

        const { title, description, url } = res.data;
        setVideo({ title, description, url });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVideo({ ...video, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (params.id) {
                await VideoService.updateVideo(params.id, video);
                toast.success('Video updated');
            } else {
                const res = await VideoService.createVideo(video);
                toast.success('Video added');
            }
            history.push('/');
        } catch (error) {
            toast.error('Video added');
        }
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className={params.id ? `card-header bg-info text-white` : `card-header bg-primary text-white`}>
                        <h3>{params.id ? 'Update Video' : 'Create Video'}</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Write a title for the video"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.title}
                                    autoFocus />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="url"
                                    placeholder="https://someSite.com"
                                    onChange={handleInputChange}
                                    value={video.url}
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    placeholder="Something to say about the video?"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.description}
                                    rows={3} />
                            </div>
                        </div>
                        <div className="card-footer">
                            {params.id
                                ? <button className="btn btn-info">Update Video</button>
                                : <button className="btn btn-primary">Crate Video</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VideoForm
