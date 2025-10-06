import mongoose from 'mongoose';
import * as schema from './schema';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

// Debug logging
console.log('=== MongoDB Connection Debug ===');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI length:', process.env.MONGODB_URI?.length);
console.log('MongoDB URI (masked):', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
console.log('Full URI (first 50 chars):', MONGODB_URI.substring(0, 50) + '...');
console.log('Environment check - NODE_ENV:', process.env.NODE_ENV);
console.log('================================');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error message:', e instanceof Error ? e.message : 'Unknown error');
    console.error('Error code:', (e as any)?.code);
    console.error('Error name:', (e as any)?.name);
    console.error('Full error:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export { connectDB };
export const db = { connectDB };