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

export interface LogBook{
    title: String,
    description: String
    isPublic: Boolean
    date: Date
    color: String
  
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
