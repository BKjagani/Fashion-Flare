import express from 'express'
import { checkoutSession, verifySession } from './stripe.controller.js';

const router = express.Router()

router.post('/stripe-checkout-session', checkoutSession)

router.post('/verify-session', verifySession)

export default router;