import { Document } from 'mongoose';

export interface AddCity extends Document {
    readonly city: string;
}