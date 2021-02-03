import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { OpenApiValidator } from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import apiSchema from './api.schema.json';

const docsRouter = Router();

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(apiSchema));
new OpenApiValidator({
  apiSpec: apiSchema as OpenAPIV3.Document,
  validateRequests: true,
  validateResponses: true,
}).install(docsRouter);

export default docsRouter;
