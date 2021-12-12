'use strict'
import { send } from '../deps.js';


const frontendFiles = context => send(
    context,
    context.request.url.pathname,
    {
        root: `${Deno.cwd()}/frontend`,
        index: "index.html"
    });


export {frontendFiles};