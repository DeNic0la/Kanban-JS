import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { renderFile, configure } from "https://deno.land/x/eta@v1.12.3/mod.ts"

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
const myHtmlFile = await renderFile("./container",content);
const frontendRouter = new Router();
frontendRouter.get("/front",(context)=>{
    context.response.body = myHtmlFile
});



export {frontendRouter};