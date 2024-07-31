import {Request, Response} from "express";
import {registerNewAdminService, loginAdminService} from "../services/admin/auth.services"
import { handleHttp } from "../utils/error.handle";



const registerAdmin = async ({body}:Request, res:Response) =>{
    try{
        const responseAdmin = await registerNewAdminService(body);
    if(responseAdmin.message == "Admin created successfully"){
        res.status(201);
        res.send(responseAdmin);
    }
    if(responseAdmin.message == "Admin already exists" || responseAdmin.message == "Password must be at least 8 characters" || responseAdmin.message == "All fields are required" || responseAdmin.message == "Name and Lastname must be at least 3 characters"){
        res.status(400);
        res.send(responseAdmin);
    }
    }catch(e){
        handleHttp(res, "Error");
    }
    
}

const loginAdmin = async ({body}:Request, res:Response) =>{
    const {email, password} = body;
    const responseLogin = await loginAdminService({email, password});
    if(responseLogin.message == "Login successful"){
        res.status(200);
        res.send(responseLogin);
    }
    if(responseLogin.message == "Admin not found" || responseLogin.message == "Invalid password"){
        res.status(401);
        res.send(responseLogin);
    }
}

export {registerAdmin, loginAdmin}