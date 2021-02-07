import { Request, Response } from 'express';
import Video from '../models/Video'

export const getVideo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const videoFound = await Video.findById(id);
        if (videoFound) {
            res.json(videoFound);
        } else {
            res.status(404).json({ message: 'Video not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

export const createVideo = async (req: Request, res: Response) => {
    try {
        const videoFound = await Video.findOne({ url: req.body })
        if (videoFound) {
            res.status(301).json({ message: 'The URL already exists' })
        } else {
            const newVideo = new Video(req.body);
            const savedVideo = await newVideo.save();
            res.json(savedVideo)
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const updateVideo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedVideo = await Video.findByIdAndUpdate(id, data, { new: true });
        if (updatedVideo) {
            res.json(updatedVideo);
        } else {
            res.status(404).json({ message: 'Video not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteVideo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const videoFound = await Video.findByIdAndDelete(id);
        if (videoFound) {
            res.json(videoFound);
        } else {
            res.status(404).json({ message: 'Video not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}