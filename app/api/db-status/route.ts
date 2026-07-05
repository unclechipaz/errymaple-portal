import { NextResponse } from "next/server";
import Redis from "ioredis";

export const dynamic = "force-dynamic";

export async function GET() {
  const connectionString = process.env.KV_REDIS_URL || process.env.KV_URL;
  
  const diagnostics: any = {
    vercelEnv: process.env.VERCEL || "not_set",
    nodeEnv: process.env.NODE_ENV || "not_set",
    kvUrlDetected: !!connectionString,
    connectionStatus: "Not attempted"
  };

  if (connectionString) {
    let redis: Redis | null = null;
    try {
      redis = new Redis(connectionString, {
        maxRetriesPerRequest: 0,
        connectTimeout: 5000,
      });

      const testKey = `test_${Date.now()}`;
      
      // Write
      await redis.set(testKey, "works", "EX", 60);
      
      // Read
      const val = await redis.get(testKey);
      
      diagnostics.connectionStatus = val === "works" 
        ? "Success: Read/Write connection working!" 
        : `Failed: Read value mismatch: ${val}`;
        
      // Cleanup
      await redis.del(testKey);
    } catch (e: any) {
      diagnostics.connectionStatus = `Error: Connection exception: ${e.message}`;
      diagnostics.errorDetails = {
        message: e.message,
        code: e.code,
        stack: e.stack
      };
    } finally {
      if (redis) {
        try {
          await redis.disconnect();
        } catch (err) {}
      }
    }
  } else {
    diagnostics.connectionStatus = "Skipped: Missing KV_REDIS_URL or KV_URL env variable.";
  }

  return NextResponse.json(diagnostics);
}
