import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import connectDB from '../config/db';

beforeAll(async () => {
  await connectDB();

  const collectionsToClear = ['tenants', 'users', 'segments']; // adicione outras se precisar

  for (const collName of collectionsToClear) {
    const collection = mongoose.connection.collections[collName];
    if (collection) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

export const api = request(app);
