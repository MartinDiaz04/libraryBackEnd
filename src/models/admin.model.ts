import {Schema, Types, model, Model} from 'mongoose'
import {Admin} from '../interfaces/admin.interface'

const AdminSchema = new Schema<Admin>({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    role: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const AdminModel = model('Admin', AdminSchema)
export default AdminModel