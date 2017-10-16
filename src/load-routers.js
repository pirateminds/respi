import fs from 'fs';
import path from 'path';

export default (app) => {
    let defaultActionsFolder = path.resolve(process.cwd(), './actions');
    let actions = fs.readdirSync(defaultActionsFolder).filter(e=> e.endsWith('.js'));
    
    console.log('actions', actions);
    return actions;
}

