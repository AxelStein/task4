import express from 'express';
import userService from './user.service.js';

const controller = {

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
        const { ids, block } = req.body;
        await userService.blockByIds(ids, block);
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

export default controller;