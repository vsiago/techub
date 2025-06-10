import SegmentModel from '../models/Segment';

export const createSegment = async (name: string, tenantId: string) => {
  const newSegment = new SegmentModel({ name, tenantId });
  return await newSegment.save();
};

export const getAllSegments = async (tenantId: string) => {
  return await SegmentModel.find({ tenantId });
};

export const getSegmentById = async (id: string) => {
  return await SegmentModel.findById(id);
};

export const updateSegment = async (id: string, data: any) => {
  return await SegmentModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSegment = async (id: string) => {
  return await SegmentModel.findByIdAndDelete(id);
};
