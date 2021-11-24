import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import {backendRouter} from "./backend/backend.js";
import {frontendRouter} from "./frontend/frontend.js";

const app = new Application();

app.use(frontendRouter.routes());
app.use(backendRouter.routes());

app.listen({ port:8000});