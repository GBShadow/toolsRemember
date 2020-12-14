import { Request, Response } from 'express';

import FindToolService from '@modules/tools/services/FindToolService';
import FindToolsByTagService from '@modules/tools/services/FindToolsByTagService';
import CreateToolService from '@modules/tools/services/CreateToolService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

export default class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { title, link, description, tags, user_id } = request.body;

      const createTool = new CreateToolService();

      const tool = await createTool.execute({
        title,
        link,
        description,
        tags,
        user_id,
      });

      return response.status(201).json(tool);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const findTool = new FindToolService();

      const tool = await findTool.execute({ id });

      return response.json(tool);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      console.log(request.user);
      const filter = request.query;
      const tag = filter.tag as string;

      const findToolByTag = new FindToolsByTagService();

      const tools = await findToolByTag.execute({ tag });

      return response.json(tools);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteTool = new DeleteToolService();

      await deleteTool.execute(id);

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
