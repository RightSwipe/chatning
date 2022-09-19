import mongoose from 'mongoose';

export interface AuthDocument extends mongoose.Document {
 username:String;
 password:Number;
 email:String
 createdAt: Date;
 updatedAt: Date;
}

const AuthSchema = new mongoose.Schema({
 username:{type:String,required:true},
 password:{type:Number,required:true},
 email:{type:String, required:true},
 image:{type:String,required:true}
},{
 timestamps : true
})

const Users = mongoose.model<AuthDocument>("user",AuthSchema);
export default Users;