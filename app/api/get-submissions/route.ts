import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "submissions.json");
    
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
        console.error("Error parsing submissions.json:", e);
      }
    }

    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error("API Error in get-submissions:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
