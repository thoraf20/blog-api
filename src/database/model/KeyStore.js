import mongoose from 'mongoose';
import User from './User';

const keyStoreSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    primaryKey: {
        type: String,
        required: true,
    },
    secondaryKey: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type:Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type:Date,
        required: true,
        select: false,
    },
},
{
    versionKey: false,
},
);

keyStoreSchema.index({client: 1, primaryKey: 1});
keyStoreSchema.index({client: 1, primaryKey: 1, secondaryKey: 1});

const KeyStoreModel = mongoose.model('keystore', keyStoreSchema);

export default KeyStoreModel;
