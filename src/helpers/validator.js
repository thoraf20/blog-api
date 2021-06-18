import Joi from 'joi';
import express from 'express';
import Logger from 'logger';
import {BadRequestError} from '../core/ApiError';
import mongoose from 'mongoose';

export  const ValidationSource = {
    BODY : 'body',
    HEADER : 'header',
    QUERY : 'query',
    PARAM : 'param',
}

export const objectId = () => {
    Joi.string().custom((value, helpers) => {
        if(!Types.objectId.isValid(value)) return helpers.error('any.invalid');
        return value;
    }, 'Object Id Validation');
}

export const JoiUrlEndpoint = () =>{
    Joi.string().custom((value, helpers) => {
        if (value.includes('://')) return helpers.error('any.invalid');
        return value;
    }, 'Url Endpoint Validation')
}

export default (schema, source = ValidationSource.BODY) => (req, res, next) => {
    try{
        const {error} = schema.validate(req[source]);

        if (!error) return next();

        const {details} = error;
        const message = details.map((i) => i.message.replace(/[' "']+/g, ' ')).join(',');
        Logger.error(message);

        next(new BadRequestError(message));
    } catch(error) {
        next(error);
    }
}
