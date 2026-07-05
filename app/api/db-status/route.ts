import { NextResponse } from "next/server";

export async function GET() {
  const connectionString = process.env.KV_REDIS_URL || process.env.KV_URL;
  
  let kvUrl = process.env.KV_REST_API_URL;
  let kvToken = process.env.KV_REST_API_TOKEN;

  let parsedFromUrl = false;

  if (!kvUrl && connectionString) {
    try {
      // connectionString: rediss://default:password@host:port
      const cleanUrl = connectionString.trim();
      const match = cleanUrl.match(/^rediss?:\/\/(?:([^:]*):)?([^@]+)@([^:]+)(?::(\d+))?$/);
      if (match) {
        const password = match[2];
        const host = match[3];
        kvUrl = `https://${host}`;
        kvToken = password;
        parsedFromUrl = true;
      }
    } catch (e: any) {
      console.error("Error parsing connection string:", e);
    }
  }

  const envKeys = Object.keys(process.env);
  const kvKeys = envKeys.filter(k => k.includes("KV") || k.includes("REDIS"));

  const diagnostics: any = {
    vercelEnv: process.env.VERCEL || "not_set",
    nodeEnv: process.env.NODE_ENV || "not_set",
    kvUrlDetected: !!kvUrl,
    kvTokenDetected: !!kvToken,
    parsedFromUrl,
    parsedUrl: kvUrl || "none",
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
      diagnostics.errorDetails = {
        message: e.message,
        code: e.code,
        cause: e.cause ? {
          message: e.cause.message,
          code: e.cause.code,
          errno: e.cause.errno,
          syscall: e.cause.syscall
        } : "none"
      };
    }
  } else {
    diagnostics.connectionStatus = "Skipped: Missing KV_REST_API_URL or KV_REST_API_TOKEN env variables.";
  }

  return NextResponse.json(diagnostics);
}
