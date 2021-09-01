import mongoose from 'mongoose';

export interface WorkDocument extends mongoose.Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);
const Work = mongoose.model('Work', WorkSchema);
export default Work;
