import fs from 'fs';
import path from 'path';
import config from './config';
import readdir from 'recursive-readdir';
import {
    Router
} from 'express';
import {
    groupBy
} from 'lodash';

const ignoreFunc = (file, stats) => {
    return !stats.isDirectory() && !path.basename(file).endsWith('.js')
};

const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

const loadActions = async() => {
    const defaultActionsFolder = path.resolve(process.cwd(), config.apiDir || './actions');
    const files = await readdir(defaultActionsFolder, [ignoreFunc]);

    actions = [].concat(...files.map((filePath) => {
        let controller = require(filePath)
        let fileRouteParts = filePath.split('/');
        let controllerName = fileRouteParts[fileRouteParts.length - 1];
        controllers[controllerName] = controller;
        let actions = Object.getOwnPropertyNames(controller).filter((p) => typeof controller[p] === 'function');
        actions.map((action) => actionControllerMap.push({ action, controllerName }));
        return actions;
    }));

    if (hasDuplicates(actions)) {
        Object.values(groupBy(actionControllerMap, 'action')).filter((group) => group.length > 1)
            .forEach((group) => console.warn(`Action ${ group[0].action } is duplicated in ${group.map((item) => item.controllerName).join(" ")})`));
        throw new Error('All actions names must be unique!');
        actions = [...new Set(actions)];
    }
    return actions;
}

let actions = [];
let controllers = {};
let actionControllerMap = [];

export default async(app) => {
    let actions = await loadActions();
    const router = new Router();

    router.get('/actions', middleware, getActions);
    router.post('/action', middleware, execAction);

    app.use(router);
}

const middleware = (req, res, next) => {
    next();
}

const getActions = (req, res) => {
    res.send(actions);
}

const execAction = (req, res) => {
    req.body.action ?
        controllers[actionControllerMap.find((item) => item.action === req.body.action).controllerName][req.body.action](req, res) :
        res.status(400).send('action not determined');
}