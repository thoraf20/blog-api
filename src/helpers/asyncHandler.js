import express from 'express';

export default (execution) => (req, res, next) => {
    execution(req, res, next).catch(next)
}