export interface Patient{
    id: number;
    fullName: string;
    cpf: string;
    birthDate: Date;
    phone: string;
    addressStreet: string;
    addressNumber: string;
    addressNeighborhood: string;
    addressCity: string;
    addressState: string;
    emergencyContact1: string;
    emergencyContact2: string;
}

export const patients: Patient[] = [];