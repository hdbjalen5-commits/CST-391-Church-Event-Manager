import { pool } from '../services/mysql.connector';
import { Event } from './events.model';

export class EventsDAO {

  public static async getAll(): Promise<Event[]> {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows as Event[];
  }

  public static async getById(id: number): Promise<Event | null> {
    const [rows]: any = await pool.query(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  public static async create(event: Event): Promise<number> {
    const [result]: any = await pool.execute(
      'INSERT INTO events (title, event_date, location) VALUES (?, ?, ?)',
      [event.title, event.event_date, event.location]
    );
    return result.insertId;
  }

  public static async update(id: number, event: Event): Promise<boolean> {
    const [result]: any = await pool.execute(
      'UPDATE events SET title = ?, event_date = ?, location = ? WHERE id = ?',
      [event.title, event.event_date, event.location, id]
    );
    return result.affectedRows > 0;
  }

  public static async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.execute(
      'DELETE FROM events WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}
