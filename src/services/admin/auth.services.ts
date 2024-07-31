import { Admin } from "../../interfaces/admin.interface";
import { Auth } from "../../interfaces/adminAuth.interface";
import AdminModel from "../../models/admin.model";
import {encrypt,  verified} from "../../utils/bcrypt.handle";
import { generateToken } from "../../utils/jwt.handle";


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
    const passHash = await encrypt(password);
    const newAdmin = await AdminModel.create({name, lastName, dateOfBirth, role, email, password: passHash});
    return {message: "Admin created successfully", newAdmin}
}

const loginAdminService = async ({email, password}:Auth) => {
    const checkIs = await AdminModel.findOne({email});
    if(!checkIs){
        return {message: "Admin not found"}
    }
    if(email.trim().length == 0 || password.length == 0 || email.trim()=="" || password == ""){
        return {message: "Email is required"}
    }
    const isVerified = await verified(password, checkIs.password);
    if(!isVerified){
        return {message: "Invalid password"}
    }
    const token = await generateToken(checkIs.id);    
    const data = {
        message: "Login successful",
        token: token
    }
    return data
}

export {registerNewAdminService, loginAdminService}