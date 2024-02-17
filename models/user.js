import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  month: String,
  date: String,
  qty:String
  // Add more properties as needed
});
const userSchema = new Schema({
  records:[recordSchema],
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  bottleQty: String,
  bottlePrice: String,
  bottlesTotalAmount:String,
  bottlesRecievedAmount:{type:String,default:'0'},
  bottlesRemainingAmount:{type:String,default:'0'},
  remainingAmount:{type:String,default:'0'},
  recievedAmount:{type:String,default:'0'},
  createdBy:Schema.Types.ObjectId,
  isActive:{type:Boolean,default:true},
  isDeleted:{type:Boolean,default:false},
  role:{type:String,default:'client',enum:['admin','user','client']}
},
{
  timestamps:true,
});

const User = mongoose.model('User', userSchema);
export default User;