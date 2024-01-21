import {model, Schema, models} from "mongoose";

const ListSchema = new Schema({
  title: {type:String, required:true},
  detail:String,
  date: String,
  remark: String,
  urgent: Boolean,
});

export const List = models.List || model('List', ListSchema);