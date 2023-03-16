import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth';
import { ROLES } from '../../constants';
import customerOrderController from '../controllers/customerOrderController';

const router = Router();

// Authenticate and authorize all routes after this middleware
router.use(protect, restrictTo(ROLES.admin, ROLES.staff));

router.route('/').get(customerOrderController.getAllOrders);
router.route('/:orderId').get(customerOrderController.getOrderById);

export default router;
