import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getDbCredentials() {
  let kvUrl = process.env.KV_REST_API_URL;
  let kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl) {
    const connectionString = process.env.KV_REDIS_URL || process.env.KV_URL;
    if (connectionString) {
      try {
        const cleanUrl = connectionString.trim();
        const match = cleanUrl.match(/^rediss?:\/\/(?:([^:]*):)?([^@]+)@([^:]+)(?::(\d+))?$/);
        if (match) {
          const password = match[2];
          const host = match[3];
          kvUrl = `https://${host}`;
          kvToken = password;
        }
      } catch (e) {
        console.error("Error parsing connection string:", e);
      }
    }
  }

  return { kvUrl, kvToken };
}

async function getSubmissions() {
  const { kvUrl, kvToken } = getDbCredentials();

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/submissions`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = JSON.parse(json.result);
          return {
            quickAdmissions: parsed.quickAdmissions || [],
            highSchoolRegistrations: parsed.highSchoolRegistrations || [],
            contactInquiries: parsed.contactInquiries || []
          };
        }
      }
    } catch (e) {
      console.error("Failed to read from Vercel KV:", e);
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
