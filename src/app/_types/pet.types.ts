export interface Pet {
    _id: String
    name: String
    description: String
    age: Number
    species: String
    owner: Owner
    status: Boolean
    logBook: LogBook[]
    publicCode: String
    userId: String
    imageData: ImageData
}

export interface LogBook {
    logDate: Date,
    title: String,
    descripción: String
}

export interface Owner {
    name: String
    emergencyContact: String
    address: String
    social: String
}

export interface ImageData{
    filePath: String
}
