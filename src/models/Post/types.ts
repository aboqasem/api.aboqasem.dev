import { Document, LeanDocument, Model } from 'mongoose';

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
  toClient(post: IPostDocument | LeanDocument<IPostDocument>): IClientPost;
}

export interface IClientPost {
  id: string;
  title: string;
  content: string;
  img?: string;
  createdAt: Date;
  updatedAt: Date;
}
