import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Redis from "ioredis";

export const dynamic = "force-dynamic";

let globalRedis: Redis | null = null;

function getRedisClient() {
  if (globalRedis) return globalRedis;
  
  const connectionString = process.env.KV_REDIS_URL || process.env.KV_URL;
  if (connectionString) {
    globalRedis = new Redis(connectionString, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
    });
  }
  return globalRedis;
}

async function getSubmissions() {
  const redis = getRedisClient();

  if (redis) {
    try {
      const data = await redis.get("submissions");
      if (data) {
        const parsed = JSON.parse(data);
        return {
          quickAdmissions: parsed.quickAdmissions || [],
          highSchoolRegistrations: parsed.highSchoolRegistrations || [],
          contactInquiries: parsed.contactInquiries || []
        };
      }
    } catch (e) {
      console.error("Failed to read from Redis:", e);
    }
  }

  // Fallback to local file system
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  const filePath = isVercel 
    ? path.join("/tmp", "submissions.json") 
    : path.join(process.cwd(), "submissions.json");

  let submissions = {
    quickAdmissions: [],
    highSchoolRegistrations: [],
    contactInquiries: []
  };

  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      submissions = {
        quickAdmissions: parsed.quickAdmissions || [],
        highSchoolRegistrations: parsed.highSchoolRegistrations || [],
        contactInquiries: parsed.contactInquiries || []
      };
    } catch (e) {
      console.error("Failed to parse local submissions file:", e);
    }
  }
  return submissions;
}

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error("API Error in get-submissions:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
