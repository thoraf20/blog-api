import mongoose from 'mongoose';

const blogSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        trim: true,
    },
    text: {
        type: String,
        required: false,
        select: false,
    },
    draftText: {
        type: String,
        required: true,
        select: false,
    },
    tags: [
        {
            type: String,
            trim: true,
            uppercase: true,
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    },
    imgUrl: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
    },
    blogUrl: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200,
        trim: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0.01,
        max: 100,
        min: 0,
    },
    isSubmitted: {
        type: Boolean,
        default: false,
        select: false,
        index: true,
    },
    isDraft: { 
        type: Boolean,
        default: true,
        select: false,
        index: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
        select: false,
        index: true,
    },
    publishedAt: {
        type: Date,
        required: false,
        index: true,
    },
    status: {
        required: Boolean,
        default: true,
        select: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false,
        index: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false,
        index: true,
    },
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: Date,
        required: true,
        select: false,
    },
},
{
    versionKey: false,
},
).index(
    {title: 'text', description: 'text'},
    {weights: {title: 3, description: 1}, background: false},
);

const BlogModel = mongoose.model('blog', blogSchema);

export default BlogModel;