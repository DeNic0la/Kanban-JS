'use strict'
import { send, renderFile, configure, Application, Router } from '../deps.js';

//Path to the View Files
const viewPath = `${Deno.cwd()}/frontend/views/`
configure({
    views: viewPath
})
const content = {cols:[
        {id:1,name:"Todo",cards:[]},
        {id:2,name:"Work in Progress",cards:[]},
        {id:3,name:"Very Done",cards:[]},
    ]};

const frontendFiles = context => send(
    context,
    context.request.url.pathname,
    {
        root: `${Deno.cwd()}/frontend`,
        index: "index.html"
    });


export {frontendFiles};