import { Request, Response } from 'express';
import Tool from '../model/Tool';

const tools: Tool[] = [];

export default class ToolController {
  create(req: Request, res: Response): Response {
    const { title, link, description, tags } = req.body;

    const tool = new Tool({ title, link, description, tags });

    tools.push(tool);

    return res.status(200).json(tool);
  }

  index(req: Request, res: Response): Response {
    const tag = req.query.tag as string;

    if (tag) {
      const filterTools = tools.filter(tool => tool.tags.includes(tag));

      return res.json(filterTools);
    }

    return res.json(tools);
  }

  delete(req: Request, res: Response): Response {
    const { id } = req.params;

    const toolIndex = tools.findIndex(tool => tool.id === String(id));

    tools.splice(toolIndex, 1);

    return res.status(204).json();
  }
}
