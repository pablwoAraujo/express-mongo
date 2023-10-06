import mongoose from "mongoose";

mongoose.Schema.Types.String.set(
  "validate", 
  {
    validator: (value) =>  value !== "",
    message: ({path}) => `O campo _${path} não pode ficar em branco`
  }
);