import  mongoose  from "mongoose";
// import Role from './Role';

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        select: false,
    },
    password: {
        type: String,
    select: false,        
    },
    profileUrl: {
        type: String,
        trim: true,
    },
    roles: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'role',
            },
        ],
        required: true,
        select: false,
    },
    verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
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

export default UserModel;