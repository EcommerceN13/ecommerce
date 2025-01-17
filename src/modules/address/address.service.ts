import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './models/address.model';
import { User } from '../user';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  

  async create(createAddressDto: CreateAddressDto, userId: number): Promise<Address> {
    return this.addressModel.create({
      ...createAddressDto,
      user_id: userId,
    });
  }

  async findAll(userId: number): Promise<Address[]> {
    return this.addressModel.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Address,
          as: 'region',
        },
        {
          model: Address,
          as: 'cities',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });
  }

  /**
   * Viloyat bo'yicha shaharlarni olish
   * @param regionId - Viloyat ID si
   * @returns Viloyatga tegishli shaharlar ro'yxati
   */
  async getCitiesByRegion(regionId: number): Promise<Address[]> {
    return this.addressModel.findAll({
      where: {
        region_id: regionId,
        type: 'CITY',
      },
    });
  }

  /**
   * Shahar bo'yicha tumanlarni olish
   * @param cityId - Shahar ID si
   * @returns Shaharga tegishli tumanlar ro'yxati
   */
  async getDistrictsByCity(cityId: number): Promise<Address[]> {
    return this.addressModel.findAll({
      where: {
        region_id: cityId,
        type: 'DISTRICT',
      },
    });
  }

  async findByAddressId(id: number, userId: number): Promise<Address> {
    const address = await this.addressModel.findOne({
      where: { id, user_id: userId },
      include: [
        {
          model: Address,
          as: 'region',
        },
        {
          model: Address,
          as: 'cities',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!address) {
      throw new NotFoundException(`ID ${id} ga ega manzil topilmadi`);
    }

    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
    userId: number,
  ): Promise<Address> {
    const address = await this.findByAddressId(id, userId);
    await address.update(updateAddressDto);
    return this.findByAddressId(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const address = await this.findByAddressId(id, userId);
    await address.destroy();
  }
}
