import { Admin } from "../../interfaces/admin.interface";
import { Auth } from "../../interfaces/adminAuth.interface";
import AdminModel from "../../models/admin.model";
import {encrypt, verified} from "../../utils/bcrypt.handle";


const registerNewAdminService = async ({name, lastName, dateOfBirth, role, email, password}:Admin) => {
    const checkIs = await AdminModel.findOne({email})
    if(checkIs){
        return {message: "Admin already exists"}
    }
    if(password.length < 8){
        return {message: "Password must be at least 8 characters"}
    }
    if(name == "" || lastName == "" || dateOfBirth == "" || role == "" || email == "" || password == ""){
        return {message: "All fields are required"}
    }
    if(name.length < 3 || lastName.length < 3){
        return {message: "Name and Lastname must be at least 3 characters"}
    }
    const newAdmin = await AdminModel.create({name, lastName, dateOfBirth, role, email, password});
    return {message: "Admin created successfully", newAdmin}
}

const loginAdminService = async ({email, password}:Auth) => {
    const checkIs = await AdminModel.findOne({email});
    if(!checkIs){
        return {message: "Admin not found"}
    }
    const isVerified = verified(password, checkIs.password);
    if(!isVerified){
        return {message: "Invalid password"}
    }
    return {message: "Login successful"}
}

export {registerNewAdminService, loginAdminService}