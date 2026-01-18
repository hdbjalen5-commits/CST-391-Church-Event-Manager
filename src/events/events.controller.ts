import { Request, Response } from 'express';
import { EventsDAO } from './events.dao';

export class EventsController {

  public static async getAll(req: Request, res: Response) {
    const events = await EventsDAO.getAll();
    res.json(events);
  }

  public static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const event = await EventsDAO.getById(id);

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(event);
  }

  public static async create(req: Request, res: Response) {
    const id = await EventsDAO.create(req.body);
    res.status(201).json({ id });
  }

  public static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await EventsDAO.update(id, req.body);

    if (!updated) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json({ message: 'Event updated' });
  }

  public static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await EventsDAO.delete(id);

    if (!deleted) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json({ message: 'Event deleted' });
  }
}
