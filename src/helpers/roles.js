import { RoleCode } from '../database/model/RoleCode';
import { RoleRequest } from 'app-request';
import express from 'express';

export default roleCode => (req, res, next) => {
    req.currentRoleCode = roleCode;
    next();
};