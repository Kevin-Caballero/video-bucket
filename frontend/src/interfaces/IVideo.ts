interface IVideo {
    _id?: string,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    description: string,
    title: string,
    url: string,
}

export default IVideo;