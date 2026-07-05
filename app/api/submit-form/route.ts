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

async function saveSubmissions(submissions: any) {
  const redis = getRedisClient();

  if (redis) {
    try {
      await redis.set("submissions", JSON.stringify(submissions));
      return true;
    } catch (e) {
      console.error("Failed to write to Redis:", e);
    }
  }

  // Fallback to local file system
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  const filePath = isVercel 
    ? path.join("/tmp", "submissions.json") 
    : path.join(process.cwd(), "submissions.json");

  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");
  return true;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Server-side basic validation
    if (!data.formType) {
      return NextResponse.json({ success: false, error: "Missing form type" }, { status: 400 });
    }

    const submissions = await getSubmissions();

    const newSubmission = {
      id: `${data.formType}_${Date.now()}`,
      timestamp: new Date().toISOString(),
      data: { ...data }
    };
    
    // Delete formType from data to keep it clean
    delete newSubmission.data.formType;

    // Append to corresponding array based on formType
    if (data.formType === "quick_admissions") {
      submissions.quickAdmissions.push(newSubmission);
    } else if (data.formType === "high_school_registration" || data.formType === "school_admissions_apply") {
      submissions.highSchoolRegistrations.push(newSubmission);
    } else if (data.formType === "contact_inquiry") {
      submissions.contactInquiries.push(newSubmission);
    } else {
      return NextResponse.json({ success: false, error: "Invalid form type" }, { status: 400 });
    }

    // Write back to storage
    await saveSubmissions(submissions);

    console.log(`[Form Submission] successfully saved: ${newSubmission.id}`);
    return NextResponse.json({ success: true, id: newSubmission.id });
  } catch (error: any) {
    console.error("API Error in submit-form:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
