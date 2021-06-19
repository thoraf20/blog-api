import User, { UserModel } from '../database/model/User';
import Role, { RoleModel } from '../database/model/Role';
import { InternalError } from '../../core/ApiError';
import {Types } from 'mongoose';
import KeystoreService from './KeystoreService';
import Keystore from '../database/model/KeyStore';

export default class UserService {
    constructor(){
        super(User)
    }
         static findById(id) {
            return UserModel.findOne({_id : id, status : true})
            .select('+email +password +roles')
            .populate({
                path : roles,
                match : {status: true},
            })
            .lean()
            .exec();
    }

     static findByEmail(email) {
        return UserModel.findOne({email : email, status : true})
        .select('+email +password +roles')
        .populate({
            path : 'roles',
            match : {status : true},
            select : {code : 1},
        })
        .lean()
        .exec();
    }

     static findProfileById(id) {
        return UserModel.findOne({_id: id, status: true})
        .select('+roles')
        .populate({
            path : 'roles',
            match: {status : true},
            select : {code : 1},
        })
        .lean()
        .exec();
    }

    static findPublicProfileById(id){
        return UserModel.findOne({_id: id, status: true}).lean().exec();
    }

    async create(payload) {
        const {user, accessTokenKey, refreshTokenKey, roleCode} = payload;
        const now = new Date();
        const role = await RoleModel.findOne({code: roleCode})
        .select('+email +password')
        .lean()
        .exec();
        
        if (!role) throw new InternalError('Role must be specified');

        user.roles = [role._id];
        user.createdAt = user.updatedAt = now;
        const createdUser = await UserModel.create(user);
        const keystore = await KeyStoreModel.create(createdUser._id, accessTokenKey, refreshTokenKey);
        return {user: createdUser.toObject(), keystore: keystore};
    }

    static async update(user, accessTokenKey, refreshTokenKey) {
        user.createdAt = new Date();
        await UserModel.updateOne({_id: user._id}, {$set: {...user}})
        .lean()
        .exec();

        const keystore =await KeyStoreService.create(user._id, accessTokenKey, refreshTokenKey);
        return {user: user, keystore: keystore};
    }
 
    static updateInfo(user) {
        user.updatedAt = new Date();
        return UserModel.updateOne({_id: user._id}, {$set: {...user}})
        .lean()
        .exec();
    }

}