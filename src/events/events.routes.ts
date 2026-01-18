import { Router } from 'express';
import { EventsController } from './events.controller';

const router = Router();

router.get('/', EventsController.getAll);
router.get('/:id', EventsController.getById);
router.post('/', EventsController.create);
router.put('/:id', EventsController.update);
router.delete('/:id', EventsController.delete);

export default router;
