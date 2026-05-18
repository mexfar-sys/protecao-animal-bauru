import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IUser, UserRole } from '../types';
import bcrypt from 'bcryptjs';

interface UserAttributes extends IUser {}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public phone?: string;
  public role!: UserRole;
  public documentType?: string;
  public documentNumber?: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public zipCode?: string;
  public bio?: string;
  public profilePhotoUrl?: string;
  public isActive!: boolean;
  public lastLogin?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  // Methods
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'coordinator', 'volunteer', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    documentType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'document_type',
    },
    documentNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
      field: 'document_number',
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'zip_code',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profilePhotoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'profile_photo_url',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      { fields: ['email'] },
      { fields: ['role'] },
      { fields: ['is_active'] },
    ],
  }
);

// Hook para hash de senha
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed('passwordHash')) {
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
  }
});

export default User;
