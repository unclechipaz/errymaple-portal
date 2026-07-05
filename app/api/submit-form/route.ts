import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

async function getSubmissions() {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

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

async function saveSubmissions(submissions: any) {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/set/submissions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${kvToken}` },
        body: JSON.stringify(submissions)
      });
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error("Failed to write to Vercel KV:", e);
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
