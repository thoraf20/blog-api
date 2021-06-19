import mongoose from 'mongoose';

const roleSchema =  mongoose.Schema(
    {
        code: {
            type: mongoose.Schema.Types.String,
            required: true,
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
        updatedAt :{
            type: Date,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
    },
);

const RoleModel = mongoose.model('role', roleSchema);
 
export default RoleModel;