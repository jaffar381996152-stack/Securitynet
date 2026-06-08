import { NextRequest, NextResponse } from 'next/server';
import Event from '../../../../models/Event';
import { connect } from "@/utils/config/dbConfig";
import { requireAdmin } from "@/app/libs/requireAdmin";

export async function POST(request: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    await connect();
    try {
        const { formData } = await request.json();
        const { title, date, event_desc, event_image } = formData;
        const newEvent = new Event({ title, date, event_desc, event_image });
        await newEvent.save();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(_request: NextRequest) {
    await connect();
    try {
        const events = await Event.find({});
        return NextResponse.json({ success: true, data: events });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    await connect();
    try {
        const { id, title, event_desc, event_image } = await request.json();
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
        }
        event.title = title;
        event.event_desc = event_desc;
        event.event_image = event_image;
        await event.save();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
