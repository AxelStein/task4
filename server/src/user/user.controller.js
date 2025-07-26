import express from 'express';
import userService from './user.service.js';

export default {

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    getList: async (req, res) => {
        const { sortBy, sortAsc } = req.query;
        res.send(await userService.getUsers(sortBy, sortAsc));
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    blockByIds: async (req, res) => {
        await userService.blockByIds(req.body.ids, req.body.block);
        res.sendStatus(200);
    },

    /**
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    deleteByIds: async (req, res) => {
        await userService.deleteByIds(req.body.ids);
        res.sendStatus(200);
    }
}