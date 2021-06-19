import Role, { RoleModel } from '../database/model/Role';

export default class RoleService {
    static findByCode(code) {
        return RoleModel.findByOne({code: code, status: true}).lean().exec();
    }
}