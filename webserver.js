import { Application, Router } from './deps.js';
import {backendRouter} from "./backend/backend.js";
import {frontendFiles} from "./frontend/frontend.js";

const app = new Application();

app.use(backendRouter.routes());
app.use(frontendFiles);

app.listen({ port:8000});