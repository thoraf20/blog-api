import { ApiKeyModel } from '../database/model/ApiKey';

export default class ApiService {
    static async findByKey (key) {
        return ApiKeyModel.findOne({key: key, status : true}).lean().exec();
    }
}