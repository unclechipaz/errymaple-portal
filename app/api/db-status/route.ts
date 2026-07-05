import { NextResponse } from "next/server";

export async function GET() {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  
  // Also check other common variations just in case Vercel set them with different prefixes
  const envKeys = Object.keys(process.env);
  const kvKeys = envKeys.filter(k => k.includes("KV") || k.includes("REDIS"));

  const diagnostics: any = {
    vercelEnv: process.env.VERCEL || "not_set",
    nodeEnv: process.env.NODE_ENV || "not_set",
    kvUrlDetected: !!kvUrl,
    kvTokenDetected: !!kvToken,
    detectedKeys: kvKeys,
    connectionStatus: "Not attempted"
  };

  if (kvUrl && kvToken) {
    try {
      const testKey = `test_${Date.now()}`;
      // Attempt to write test key
      const writeRes = await fetch(`${kvUrl}/set/${testKey}/works`, {
        method: "POST",
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      
      if (writeRes.ok) {
        // Attempt to read test key
        const readRes = await fetch(`${kvUrl}/get/${testKey}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
          cache: 'no-store'
        });
        
        if (readRes.ok) {
          const json = await readRes.json();
          diagnostics.connectionStatus = json.result === "works" 
            ? "Success: Read/Write connection working!" 
            : `Failed: Read value mismatch: ${JSON.stringify(json)}`;
        } else {
          diagnostics.connectionStatus = `Failed: Read request failed with status ${readRes.status}`;
        }
      } else {
        diagnostics.connectionStatus = `Failed: Write request failed with status ${writeRes.status}`;
      }
    } catch (e: any) {
      diagnostics.connectionStatus = `Error: Connection exception: ${e.message}`;
    }
  } else {
    diagnostics.connectionStatus = "Skipped: Missing KV_REST_API_URL or KV_REST_API_TOKEN env variables.";
  }

  return NextResponse.json(diagnostics);
}
