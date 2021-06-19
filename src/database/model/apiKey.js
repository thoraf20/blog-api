import mongoose from 'mongoose';

const apiSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        maxlength: 1024,
    },
    version: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    metadata: {
        type: String,
        required: true,
    },
    sta: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
},
{
    versionKey: false,
},
);

const ApiKeyModel = mongoose.model('apiKey', apiSchema);

export default ApiKeyModel;
