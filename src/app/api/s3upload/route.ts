import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { requireAdmin } from "@/app/libs/requireAdmin";

export async function GET(request: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    const client = new S3Client({
        region: process.env.NEXT_S3_REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.NEXT_S3_ACCESS_KEY || '',
            secretAccessKey: process.env.NEXT_S3_SECRET_KEY || '',
        },
    });

    const { searchParams } = request.nextUrl;
    const file = searchParams.get("file");
    const type = searchParams.get("type") || "image/jpeg";

    if (!file) {
        return NextResponse.json({ success: false, error: "File query parameter is required" }, { status: 400 });
    }

    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_S3_BUCKET || 'securitynet-bucket',
        Key: file,
        ContentType: type,
    });

    try {
        const url = await getSignedUrl(client, command, { expiresIn: 60 });
        return NextResponse.json({ success: true, data: { presignedUrl: url } });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
