import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  id:{type:String,default:'1'},
  totalBottles: String,
  bottlesIn:String,
  bottlesOut:String,
  expense:String,
  amount:String,
  recievedAmount:String,
  pendingAmount:String,
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;