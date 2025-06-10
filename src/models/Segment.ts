import mongoose, { Document, Schema } from 'mongoose';
import { ISegment } from '../types/Segment';

type SegmentDocument = ISegment & Document;

const SegmentSchema = new Schema<SegmentDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<SegmentDocument>('Segment', SegmentSchema);
