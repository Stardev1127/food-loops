import { Router } from 'express';
import menuItemController from '../controllers/menuItemController';

const router = Router();

router.get('/', menuItemController.getAllMenu);
router.get('/:menuItem', menuItemController.getMenuItemById);

export default router;
