import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  shock: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
  default: {}
});

const IdealConditionModel = mongoose.model("idealConditions", ConditionSchema);

export default IdealConditionModel;


