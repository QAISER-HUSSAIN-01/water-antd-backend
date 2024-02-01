import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  bottleQty: String,
  bottlePrice: String,
  bottlesTotalAmount:String,
  bottlesRecievedAmount:String,
  bottlesRemainingAmount:String,
  remainingAmount:String,
  recievedAmount:String,
  createdBy:Schema.Types.ObjectId,
  isActive:{type:Boolean,default:true},
  isDeleted:{type:Boolean,default:false},
  role:{type:String,default:'client',enum:['admin','user','client']}
},
{
  timestamps:true
});

const User = mongoose.model('User', userSchema);
export default User;