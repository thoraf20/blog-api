import Keystore, { KeystoreModel} from '../database/model/Keystore';
import User from '../database/model/User';

export default class KeystoreService {
    static findforKey(client, key) {
        return KeystoreModel.findOne({client: client, primaryKey: key, status: true}).exec();
    }

    static remove (id) {
        return KeystoreModel.findByIdAndRemove(id).lean().exec();
    }

    static find (client, primaryKey, secondaryKey) {
        return KeystoreModel.findOne({
            client: client, 
            primaryKey: primaryKey, 
            secondaryKey: secondaryKey,})
            .lean().exec();
    }

    static async create (client, primaryKey, secondaryKey) {
        const now = new Date();
        const keystore =await KeystoreModel.create({
            client: client,
            primaryKey: primaryKey,
            secondaryKey: secondaryKey,
            createdAt: now,
            updatedAt: now,
        });
        return keystore.toObject();
    }
}