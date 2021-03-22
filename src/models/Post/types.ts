import { Document, Model } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  img?: string;
}

export interface IPostDocument extends IPost, Document {
  // mongoose' timestamps option auto-generates createdAt and updatedAt
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostModel extends Model<IPostDocument> {
  // static methods go here
}
