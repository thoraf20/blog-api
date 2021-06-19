import { model, Schema, Document } from "mongoose";
import Role from './Role';

const userSchema = new Schema({
    name: {
        type : 'Schema.Types.String',
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: 'Schema.Types.String',
        required: true,
        unique: true,
        trim: true,
        select: false,
    },
    password: {
        type: 'Schema.Types.String',
    select: false,        
    },
    profileUrl: {
        type: 'Schema.Types.String',
        trim: true,
    },
    roles: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true,
        select: false,
    },
    verified: {
        type: Schema.Types.Boolean,
        default: false,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true,
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
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel