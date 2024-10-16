export type ActionOption = {
    name: string,
    action: () => void
}

export type File = {
    _id: number,
    public_url: string,
    info: {
        filename: string,
        size: number,
        update_at: Date,
        upload_at: Date,
    }
}

export type FileUpload = {
    filename: string,
    size: string
}

export type FileUploadResponse = {
    info: {
        token: string,
        init_info: object
    }
}   