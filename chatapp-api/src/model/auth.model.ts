import mongoose from 'mongoose';

export interface AuthDocument extends mongoose.Document {
 username:string;
 fullname:string;
 password:string;
 email:string;
 status:boolean;
 image:string;
 lastmessage:string;
 createdAt: Date;
 updatedAt: Date;
}

const AuthSchema = new mongoose.Schema({
 username:{type:String, unique:true, required:true},
 fullname:{type:String, required:true},
 password:{type:String, required:true},
 email:{type:String, unique:true, required:true},
 image:{type:String, required:true},
 status:{type:Boolean},
 lastmessage:{type:String}
},{
 timestamps : true
})

const Users = mongoose.model<AuthDocument>("users",AuthSchema);
export default Users;