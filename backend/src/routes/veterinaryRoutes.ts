import { Router } from 'express';
import * as veterinaryController from '../controllers/veterinaryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Veterinary Records
router.post(
  '/records',
  authenticate,
  veterinaryController.addVeterinaryRecord
);

router.get(
  '/records/:animalId',
  authenticate,
  veterinaryController.getVeterinaryHistory
);

// Appointments
router.post(
  '/appointments',
  authenticate,
  veterinaryController.scheduleAppointment
);

router.get(
  '/appointments/upcoming',
  authenticate,
  veterinaryController.getUpcomingAppointments
);

router.patch(
  '/appointments/:appointmentId/complete',
  authenticate,
  veterinaryController.completeAppointment
);

// Partner Clinics
router.get(
  '/clinics',
  veterinaryController.getPartnerClinics
);

router.post(
  '/clinics',
  authenticate,
  authorize(['admin', 'coordinator']),
  veterinaryController.registerPartnerClinic
);

export default router;
