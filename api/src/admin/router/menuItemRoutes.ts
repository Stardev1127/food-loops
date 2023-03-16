import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth';
import { imageUpload } from '../../shared/middlewares/multer';
import { ROLES } from '../../constants';
import menuItemController from '../controllers/menuItemController';
import { validateMenuItemId } from '../middlewares/menuItemMiddleware';
import { requiredFile } from '../../shared/middlewares';

const router = Router();

// Authenticate and authorize all routes after this middleware
router.use(protect, restrictTo(ROLES.admin, ROLES.staff));

router.route('/').get(menuItemController.getAllMenu).post(menuItemController.addMenuItem);
router
  .route('/:menuItem')
  .get(menuItemController.getMenuItemById)
  .patch(validateMenuItemId, menuItemController.updateMenuItem);
router
  .route('/:menuItem/photo')
  .post(validateMenuItemId, imageUpload.single('image'), requiredFile, menuItemController.addMenuItemImage)
  .delete(validateMenuItemId, menuItemController.deleteMenuItemImage);

export default router;
