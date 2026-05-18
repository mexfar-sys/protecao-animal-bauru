import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: any;
}

// GET /animals - List all animals with pagination and filters
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, species, status } = req.query;
    const Animal = require('../models').default.Animal;

    const where: any = {};
    if (species) where.species = species;
    if (status) where.status = status;

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Animal.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
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
    console.error('Get animals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching animals',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /animals/adoption - List animals available for adoption
router.get('/adoption', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const Animal = require('../models').default.Animal;

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Animal.findAndCountAll({
      where: { status: 'available_for_adoption' },
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
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
    console.error('Get adoption animals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching animals',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// POST /animals - Register new animal
router.post('/', authenticate, authorize(['admin', 'coordinator', 'volunteer']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      species,
      breed,
      age,
      color,
      weight,
      healthStatus,
      description,
      photoUrl,
      status,
      complaintId,
    } = req.body;

    if (!name || !species) {
      res.status(400).json({
        success: false,
        message: 'Name and species are required',
      });
      return;
    }

    const Animal = require('../models').default.Animal;

    const animal = await Animal.create({
      name,
      species,
      breed,
      age,
      color,
      weight,
      healthStatus,
      description,
      photoUrl,
      status: status || 'under_care',
      complaintId,
    });

    res.status(201).json({
      success: true,
      message: 'Animal registered successfully',
      data: animal,
    });
  } catch (error) {
    console.error('Create animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering animal',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// PUT /animals/:id - Update animal
router.put('/:id', authenticate, authorize(['admin', 'coordinator', 'volunteer']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, color, weight, healthStatus, description, photoUrl, status } = req.body;

    const Animal = require('../models').default.Animal;
    const animal = await Animal.findByPk(id);

    if (!animal) {
      res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
      return;
    }

    Object.assign(animal, {
      name: name || animal.name,
      species: species || animal.species,
      breed: breed || animal.breed,
      age: age !== undefined ? age : animal.age,
      color: color || animal.color,
      weight: weight !== undefined ? weight : animal.weight,
      healthStatus: healthStatus || animal.healthStatus,
      description: description || animal.description,
      photoUrl: photoUrl || animal.photoUrl,
      status: status || animal.status,
    });

    await animal.save();

    res.status(200).json({
      success: true,
      message: 'Animal updated successfully',
      data: animal,
    });
  } catch (error) {
    console.error('Update animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating animal',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE /animals/:id - Delete animal (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const Animal = require('../models').default.Animal;
    const animal = await Animal.findByPk(id);

    if (!animal) {
      res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
      return;
    }

    await animal.destroy();

    res.status(200).json({
      success: true,
      message: 'Animal deleted successfully',
    });
  } catch (error) {
    console.error('Delete animal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting animal',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /animals/complaint/:complaintId - Get animals from a complaint
router.get('/complaint/:complaintId', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { complaintId } = req.params;

    const Animal = require('../models').default.Animal;
    const animals = await Animal.findAll({
      where: { complaintId },
    });

    res.status(200).json({
      success: true,
      data: animals,
    });
  } catch (error) {
    console.error('Get complaint animals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching animals',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
