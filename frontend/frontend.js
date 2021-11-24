import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const frontendRouter = new Router();
frontendRouter.get("/front",(context)=>{
    context.response.body = "Hallo FrontEnd";
});

export {frontendRouter};