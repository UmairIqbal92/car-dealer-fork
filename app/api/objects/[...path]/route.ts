import { NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106"

const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const objectPath = path.join("/")
    
    const privateDir = process.env.PRIVATE_OBJECT_DIR || ""
    if (!privateDir) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 })
    }

    const fullPath = `${privateDir}/${objectPath}`
    const pathParts = fullPath.split("/").filter(Boolean)
    const bucketName = pathParts[0]
    const objectName = pathParts.slice(1).join("/")

    const bucket = storage.bucket(bucketName)
    const file = bucket.file(objectName)

    const [exists] = await file.exists()
    if (!exists) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const [metadata] = await file.getMetadata()
    const [buffer] = await file.download()

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Object fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 })
  }
}
