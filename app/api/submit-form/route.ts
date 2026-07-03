import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Server-side basic validation
    if (!data.formType) {
      return NextResponse.json({ success: false, error: "Missing form type" }, { status: 400 });
    }

    const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    const filePath = isVercel 
      ? path.join("/tmp", "submissions.json") 
      : path.join(process.cwd(), "submissions.json");
    
    let submissions: any = {
      quickAdmissions: [],
      highSchoolRegistrations: [],
      contactInquiries: []
    };

    // Load existing submissions if the file exists
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
        console.error("Error reading/parsing submissions.json:", e);
      }
    }

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
    } else if (data.formType === "high_school_registration") {
      submissions.highSchoolRegistrations.push(newSubmission);
    } else if (data.formType === "contact_inquiry") {
      submissions.contactInquiries.push(newSubmission);
    } else {
      return NextResponse.json({ success: false, error: "Invalid form type" }, { status: 400 });
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    console.log(`[Form Submission] successfully saved: ${newSubmission.id}`);
    return NextResponse.json({ success: true, id: newSubmission.id });
  } catch (error: any) {
    console.error("API Error in submit-form:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
