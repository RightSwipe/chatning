import mongoose from 'mongoose';

export interface AuthDocument extends mongoose.Document {
 username:String;
 fullname:String;
 password:Number;
 email:String
 createdAt: Date;
 updatedAt: Date;
}

const AuthSchema = new mongoose.Schema({
 username:{type:String, unique:true, required:true},
 fullname:{type:String, required:true},
 password:{type:Number, required:true},
 email:{type:String, unique:true, required:true},
 image:{type:String, required:true}
},{
 timestamps : true
})

const Users = mongoose.model<AuthDocument>("user",AuthSchema);
export default Users;