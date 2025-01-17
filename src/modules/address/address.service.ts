import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './models';
import { User } from '../user';
import { Op, where } from 'sequelize';
import { CreateCityDistrictDto, CreateRegionDto, UpdateCityDistrictDto, UpdateRegionDto } from './dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  // Service methods
  async createRegion(createRegionDto: CreateRegionDto): Promise<Address> {
    return this.addressModel.create({
      type: 'REGION',
      region_id: null,
      region_name: createRegionDto.region_name,
      user_id: createRegionDto.user_id,
    });
  }

  async createCityOrDistrict(
    createCityDistrictDto: CreateCityDistrictDto,
  ): Promise<Address> {
    const region = await this.addressModel.findByPk(
      createCityDistrictDto.region_id,
    );
    if (!region) {
      throw new NotFoundException(
        `Region with ID ${createCityDistrictDto.region_id} not found`,
      );
    }

    // Toshkent shahri uchun maxsus logika
    if (
      region.city === 'Toshkent shahar' &&
      createCityDistrictDto.type === 'CITY'
    ) {
      throw new BadRequestException(
        `Cannot create cities in Tashkent city, only districts are allowed`,
      );
    }

    // Boshqa regionlar uchun
    if (
      region.city === 'Toshkent shahar' &&
      createCityDistrictDto.type !== 'DISTRICT'
    ) {
      throw new BadRequestException(
        `Only districts can be created in Tashkent city`,
      );
    }

    return this.addressModel.create({
      type: createCityDistrictDto.type,
      region_id: createCityDistrictDto.region_id,
      region_name: region.region_name,
      city: createCityDistrictDto.city,
      street: createCityDistrictDto.street,
      user_id: createCityDistrictDto.user_id,
    });
  }

  async findAddressByUserId(user_id: number): Promise<Address[]> {
    return this.addressModel.findAll({
      where: { user_id: user_id },
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
   * Viloyat bo'yicha shaharlarni olish yoki faqat Toshkent shahri region
   * sifatida kiritilgani uchun Toshkent shahridagi tumanlarni olishi uchun
   * @param regionId - Viloyat yoki Toshkent shahar ID  si
   * @returns Viloyatga tegishli shaharlar yoki Toshkent shahridagi tumanlar ro'yxati
   */
  async getCitiesByRegion(regionId: number): Promise<Address[]> {
    return this.addressModel.findAll({
      where: {
        region_id: regionId,
        type: {
          [Op.or]: ['CITY', 'DISTRICT'], // 'CITY' yoki 'DISTRICT' bo'lsa
        },
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
    // console.log(address, "***")
    if (!address) {
      throw new NotFoundException(`ID ${id} ga ega manzil topilmadi`);
    }

    return address;
  }

  async findAllAddress(): Promise<Address[]> {
    const address = await this.addressModel.findAll();

    if (!address) {
      throw new NotFoundException(`1 ta ham Address topilmadi`);
    }

    return address;
  }

  async updateRegion(
    id: number,
    UpdateRegionDto: UpdateRegionDto,
  ): Promise<Address> {
    // console.log(id)
    // const address = await this.findByAddressId(id, UpdateRegionDto.user_id);
    await this.addressModel.update(
      {
        type: 'REGION',
        region_id: null,
        region_name: UpdateRegionDto.region_name,
        user_id: UpdateRegionDto.user_id,
      },
      { where: { id } },
    );
    return this.findByAddressId(id, UpdateRegionDto.user_id);
  }

  async updateCity(
    id: number,
    UpdateCityDistrictDto: UpdateCityDistrictDto,
  ): Promise<Address> {
    const region = await this.addressModel.findByPk(
      UpdateCityDistrictDto.region_id,
    );
    if (!region) {
      throw new NotFoundException(
        `Region with ID ${UpdateCityDistrictDto.region_id} not found`,
      );
    }

    // Toshkent shahri uchun maxsus logika
    if (
      region.city === 'Toshkent shahar' &&
      UpdateCityDistrictDto.type === 'CITY'
    ) {
      throw new BadRequestException(
        `Cannot create cities in Tashkent city, only districts are allowed`,
      );
    }

    // Boshqa regionlar uchun
    if (
      region.city === 'Toshkent shahar' &&
      UpdateCityDistrictDto.type !== 'DISTRICT'
    ) {
      throw new BadRequestException(
        `Only districts can be created in Tashkent city`,
      );
    }

    // console.log(id)
    // const address = await this.findByAddressId(id, UpdateRegionDto.user_id);
    await this.addressModel.update(
      {
        type: UpdateCityDistrictDto.type,
      region_id: UpdateCityDistrictDto.region_id,
      region_name: region.region_name,
      city: UpdateCityDistrictDto.city,
      street: UpdateCityDistrictDto.street,
      user_id: UpdateCityDistrictDto.user_id,
      },
      { where: { id } },
    );
    return this.findByAddressId(id, UpdateCityDistrictDto.user_id);
  }


  async removeAddressById(id: number, userId: number): Promise<void> {
    const address = await this.findByAddressId(id, userId);
    await address.destroy();
  }
  // async removeCityOrDistrict(id: number, userId: number): Promise<void> {
  //   const address = await this.findByAddressId(id, userId);
  //   await address.destroy();
  // }
}
