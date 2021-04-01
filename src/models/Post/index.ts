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

PostSchema.static('toClient', ((post) => {
  const { title, content, img, createdAt, updatedAt } = post;
  return {
    id: post._id,
    title,
    content,
    img,
    createdAt,
    updatedAt,
  };
}) as IPostModel['toClient']);

const Post = mongoose.model('Post', PostSchema);

export * from './types';

export default Post;
