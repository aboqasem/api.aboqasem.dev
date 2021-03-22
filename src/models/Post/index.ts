import mongoose, { Schema } from 'mongoose';
import { IPost, IPostDocument, IPostModel } from './types';

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

const postSchema = new Schema<IPostDocument, IPostModel>(postSchemaDefinition, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export * from './types';

export default Post;
