import { Router } from 'express';
import checkoutController from '../controllers/checkoutController';
import { validateCheckout } from '../middlewares/checkoutMiddleware';

const router = Router();

router.post('/', validateCheckout, checkoutController.checkout);

export default router;
