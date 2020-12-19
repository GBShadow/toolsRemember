import { Request, Response } from 'express';

import FindToolService from '@modules/tools/services/FindToolService';
import FindToolsByTagService from '@modules/tools/services/ListToolsByTagService';
import CreateToolService from '@modules/tools/services/CreateToolService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

export default class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { title, link, description, tags } = request.body;

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
      const user_id = request.user.id;
      const { id } = request.params;
      const findTool = new FindToolService();

      const tool = await findTool.execute({ user_id, id });

      return response.json(tool);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const filter = request.query;
      const tag = filter.tag as string;

      const findToolByTag = new FindToolsByTagService();

      const tools = await findToolByTag.execute({ user_id, tag });

      return response.json(tools);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { id } = request.params;

      const deleteTool = new DeleteToolService();

      await deleteTool.execute({ user_id, id });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
