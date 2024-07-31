import {Request, Response} from "express";
import {registerNewAdminService, loginAdminService} from "../services/admin/auth.services"



const registerAdmin = async ({body}:Request, res:Response) =>{
    const responseAdmin = await registerNewAdminService(body);
    res.send(responseAdmin);
}

const loginAdmin = async ({body}:Request, res:Response) =>{
    const {email, password} = body;
    const responseLogin = await loginAdminService({email, password});
    res.send(responseLogin);
}

export {registerAdmin, loginAdmin}