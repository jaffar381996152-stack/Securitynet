import mongoose, { Schema, Document } from 'mongoose';
export interface Event extends Document {
    title: string;
    date: string;
    event_desc: string;
    event_image: string;
}

const EventSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        event_desc: {
            type: String,
            required: true,
        },
        event_image: {
            type: String,
            required: true,
        }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
export default mongoose.models.Event || mongoose.model<Event>('Event', EventSchema);