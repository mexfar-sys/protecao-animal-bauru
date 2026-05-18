import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { ICampaign, CampaignType, CampaignStatus } from '../types';

interface CampaignAttributes extends ICampaign {}

interface CampaignCreationAttributes extends Optional<CampaignAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Campaign extends Model<CampaignAttributes, CampaignCreationAttributes> implements CampaignAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public campaignType!: CampaignType;
  public startDate!: Date;
  public endDate!: Date;
  public status!: CampaignStatus;
  public bannerUrl?: string;
  public content?: string;
  public targetAudience?: string;
  public responsibleId?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Campaign.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 2000],
      },
    },
    campaignType: {
      type: DataTypes.ENUM('awareness', 'adoption', 'vaccination', 'sterilization', 'rescue', 'event', 'education', 'other'),
      allowNull: false,
      field: 'campaign_type',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
    },
    status: {
      type: DataTypes.ENUM('planned', 'active', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'planned',
    },
    bannerUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'banner_url',
      validate: {
        isUrl: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    targetAudience: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'target_audience',
    },
    responsibleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'responsible_id',
      references: {
        model: 'users',
        key: 'id',
      },
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
    tableName: 'campaigns',
    timestamps: false,
    indexes: [
      { fields: ['status'] },
      { fields: ['campaign_type'] },
      { fields: ['start_date'] },
    ],
  }
);

export default Campaign;
