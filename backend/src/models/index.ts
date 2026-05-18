import User from './User';
import Complaint from './Complaint';
import ComplaintMedia from './ComplaintMedia';
import ComplaintUpdate from './ComplaintUpdate';
import Animal from './Animal';
import VeterinaryRecord from './VeterinaryRecord';
import PartnerClinic from './PartnerClinic';
import VeterinaryAppointment from './VeterinaryAppointment';
import AdoptionInterest from './AdoptionInterest';
import Legislation from './Legislation';
import Campaign from './Campaign';
import Notification from './Notification';
import AuditLog from './AuditLog';

// ============================================
// Relationships
// ============================================

// User relationships
User.hasMany(Complaint, { foreignKey: 'userId', as: 'complaintsReported' });
User.hasMany(Complaint, { foreignKey: 'assignedTo', as: 'complaintsAssigned' });
User.hasMany(ComplaintUpdate, { foreignKey: 'updatedBy' });
User.hasMany(Animal, { foreignKey: 'adoptedBy' });
User.hasMany(AdoptionInterest, { foreignKey: 'userId' });
User.hasMany(AdoptionInterest, { foreignKey: 'approvedBy', as: 'approvalsGiven' });
User.hasMany(Campaign, { foreignKey: 'responsibleId' });
User.hasMany(Notification, { foreignKey: 'userId' });
User.hasMany(AuditLog, { foreignKey: 'userId' });

// Complaint relationships
Complaint.belongsTo(User, { foreignKey: 'userId', as: 'reporter' });
Complaint.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
Complaint.hasMany(ComplaintMedia, { foreignKey: 'complaintId', as: 'media' });
Complaint.hasMany(ComplaintUpdate, { foreignKey: 'complaintId', as: 'updates' });
Complaint.hasMany(Animal, { foreignKey: 'complaintId' });

// ComplaintMedia relationships
ComplaintMedia.belongsTo(Complaint, { foreignKey: 'complaintId' });

// ComplaintUpdate relationships
ComplaintUpdate.belongsTo(Complaint, { foreignKey: 'complaintId' });
ComplaintUpdate.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' });

// Animal relationships
Animal.belongsTo(Complaint, { foreignKey: 'complaintId', allowNull: true });
Animal.belongsTo(User, { foreignKey: 'adoptedBy', as: 'adoptant' });
Animal.hasMany(VeterinaryRecord, { foreignKey: 'animalId', as: 'veterinaryRecords' });
Animal.hasMany(VeterinaryAppointment, { foreignKey: 'animalId', as: 'appointments' });
Animal.hasMany(AdoptionInterest, { foreignKey: 'animalId', as: 'adoptionInterests' });

// VeterinaryRecord relationships
VeterinaryRecord.belongsTo(Animal, { foreignKey: 'animalId' });

// PartnerClinic relationships
PartnerClinic.hasMany(VeterinaryAppointment, { foreignKey: 'clinicId', as: 'appointments' });

// VeterinaryAppointment relationships
VeterinaryAppointment.belongsTo(Animal, { foreignKey: 'animalId' });
VeterinaryAppointment.belongsTo(PartnerClinic, { foreignKey: 'clinicId', as: 'clinic' });

// AdoptionInterest relationships
AdoptionInterest.belongsTo(Animal, { foreignKey: 'animalId' });
AdoptionInterest.belongsTo(User, { foreignKey: 'userId', as: 'interested' });
AdoptionInterest.belongsTo(User, { foreignKey: 'approvedBy', as: 'approver' });

// Legislation relationships (no foreign keys, standalone)

// Campaign relationships
Campaign.belongsTo(User, { foreignKey: 'responsibleId', as: 'responsible' });

// Notification relationships
Notification.belongsTo(User, { foreignKey: 'userId', as: 'recipient' });

// AuditLog relationships
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'actor' });

// ============================================
// Export all models
// ============================================
export {
  User,
  Complaint,
  ComplaintMedia,
  ComplaintUpdate,
  Animal,
  VeterinaryRecord,
  PartnerClinic,
  VeterinaryAppointment,
  AdoptionInterest,
  Legislation,
  Campaign,
  Notification,
  AuditLog,
};

export default {
  User,
  Complaint,
  ComplaintMedia,
  ComplaintUpdate,
  Animal,
  VeterinaryRecord,
  PartnerClinic,
  VeterinaryAppointment,
  AdoptionInterest,
  Legislation,
  Campaign,
  Notification,
  AuditLog,
};
