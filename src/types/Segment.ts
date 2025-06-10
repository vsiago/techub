import { Types } from 'mongoose';

export interface ISegment {
  _id?: string;
  name: string;
  tenantId: Types.ObjectId;
}
