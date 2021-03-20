import mongoose, { Schema, Document, Model } from 'mongoose';

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

const postSchemaDefinition: Record<keyof IPost, unknown> = {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
};

const postSchema = new Schema<IPostDocument, Model<IPostDocument>>(postSchemaDefinition, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
