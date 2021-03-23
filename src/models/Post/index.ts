import mongoose, { Schema } from 'mongoose';
import { IPost, IPostDocument, IPostModel } from './types';

const PostSchema = new Schema<IPostDocument, IPostModel, IPost>(
  {
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
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', PostSchema);

export * from './types';

export default Post;
