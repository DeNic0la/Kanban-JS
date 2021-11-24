import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
const backendRouter = new Router({prefix:'/api'});
backendRouter.get("/",(context)=>{
    context.response.body = "Hallo BackEnd";
});


export {backendRouter};