export interface Person {
    _id: String,
    firstName: String
    middleName?: String
    lastName: String
    secondLastName?: String
    emergencyContact?: String
    birthDate: Date
    rut: String
    status: Boolean
    medicalRecord: MedicalRecord
    userId: String
  }

  interface MedicalRecord {
    bloodType: string
    allergies: string[]
    chronicConditions: string[]
    medications: Medication[]
  }
  
  export interface Medication {
    name: string
    dosage: string
    prescribedBy: string
    startDate: string
    endDate: string
  }