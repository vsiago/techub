import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: process.env.DB_NAME || 'multitenant_app'
    });
    console.log(`✅ Conectado ao MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

export default connectDB;
