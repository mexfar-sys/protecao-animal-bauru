import { Request, Response } from 'express';
import VeterinaryRecord from '../models/VeterinaryRecord';
import VeterinaryAppointment from '../models/VeterinaryAppointment';
import PartnerClinic from '../models/PartnerClinic';
import Animal from '../models/Animal';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: any;
}

// Add veterinary record
export const addVeterinaryRecord = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const { animalId, recordType, recordDate, veterinarianName, clinicName, description, findings, diagnosis, treatmentPlan, nextFollowup, documentUrl } = req.body;

    if (!animalId || !recordType || !recordDate) {
      res.status(400).json({
        success: false,
        message: 'Animal ID, record type, and date are required',
      });
      return;
    }

    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
      return;
    }

    const record = await VeterinaryRecord.create({
      animalId,
      recordType,
      recordDate,
      veterinarianName,
      clinicName,
      description,
      findings,
      diagnosis,
      treatmentPlan,
      nextFollowup,
      documentUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Veterinary record added successfully',
      data: record,
    });
  } catch (error) {
    console.error('Add veterinary record error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding veterinary record',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get veterinary history for animal
export const getVeterinaryHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { animalId } = req.params;
    const { recordType, page = 1, limit = 10 } = req.query;

    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
      return;
    }

    const where: any = { animalId };
    if (recordType) where.recordType = recordType;

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await VeterinaryRecord.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['recordDate', 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get veterinary history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching veterinary history',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Schedule appointment
export const scheduleAppointment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const { animalId, clinicId, appointmentDate, appointmentType, description } = req.body;

    if (!animalId || !clinicId || !appointmentDate || !appointmentType) {
      res.status(400).json({
        success: false,
        message: 'Animal ID, clinic ID, appointment date, and type are required',
      });
      return;
    }

    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
      return;
    }

    const clinic = await PartnerClinic.findByPk(clinicId);
    if (!clinic) {
      res.status(404).json({
        success: false,
        message: 'Clinic not found',
      });
      return;
    }

    const appointment = await VeterinaryAppointment.create({
      animalId,
      clinicId,
      appointmentDate,
      appointmentType,
      description,
      status: 'scheduled',
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Schedule appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error scheduling appointment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get upcoming appointments
export const getUpcomingAppointments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const now = new Date();

    const { count, rows } = await VeterinaryAppointment.findAndCountAll({
      where: {
        appointmentDate: {
          [Symbol.for('$gte')]: now,
        },
        status: 'scheduled',
      },
      include: [
        { model: Animal, attributes: ['id', 'name', 'species', 'breed'] },
        { model: PartnerClinic, as: 'clinic', attributes: ['id', 'name', 'phone', 'address'] },
      ],
      offset,
      limit: Number(limit),
      order: [['appointmentDate', 'ASC']],
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Complete appointment
export const completeAppointment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    const { appointmentId } = req.params;

    const appointment = await VeterinaryAppointment.findByPk(appointmentId);
    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
      return;
    }

    appointment.status = 'completed';
    appointment.completedAt = new Date();
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment marked as completed',
      data: appointment,
    });
  } catch (error) {
    console.error('Complete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing appointment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get partner clinics
export const getPartnerClinics = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { city, specialties, page = 1, limit = 10 } = req.query;

    const where: any = { isActive: true };
    if (city) where.city = city;

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await PartnerClinic.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['name', 'ASC']],
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get clinics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clinics',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Register partner clinic
export const registerPartnerClinic = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'coordinator')) {
      res.status(403).json({ success: false, message: 'Permission denied' });
      return;
    }

    const {
      name,
      cnpj,
      phone,
      email,
      website,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      specialties,
      ownerName,
      ownerPhone,
      operatingHours,
      emergencyService,
    } = req.body;

    if (!name || !phone || !address || !city || !state) {
      res.status(400).json({
        success: false,
        message: 'Name, phone, address, city, and state are required',
      });
      return;
    }

    const clinic = await PartnerClinic.create({
      name,
      cnpj,
      phone,
      email,
      website,
      address,
      city,
      state,
      zipCode,
      latitude,
      longitude,
      specialties,
      ownerName,
      ownerPhone,
      operatingHours,
      emergencyService: emergencyService || false,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Partner clinic registered successfully',
      data: clinic,
    });
  } catch (error) {
    console.error('Register clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering clinic',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
