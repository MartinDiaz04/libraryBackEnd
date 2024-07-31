import {Auth} from './adminAuth.interface'
export interface Admin extends Auth{
    name:string,
    lastName: string,
    dateOfBirth: string,
    role:string,
}