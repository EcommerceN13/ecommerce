import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Address } from './models';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';
import {
  CreateCityDistrictDto,
  CreateRegionDto,
  UpdateCityDistrictDto,
  UpdateRegionDto,
} from './dto';
// import { UserRoles } from '../user';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // Controller methods
  @Post('region')
  @ApiOperation({ summary: 'Create new region' })
  @ApiResponse({
    status: 201,
    description: 'Region has been successfully created',
    type: Address,
  })
  @Protected(true)
  @Roles([UserRoles.admin])
  createRegion(@Body() createRegionDto: CreateRegionDto): Promise<Address> {
    return this.addressService.createRegion(createRegionDto);
  }

  @Post('city-district')
  @ApiOperation({ summary: 'Create new city or district' })
  @ApiResponse({
    status: 201,
    description: 'City or district has been successfully created',
    type: Address,
  })
  @Protected(true)
  @Roles([UserRoles.admin])
  createCityOrDistrict(
    @Body() createCityDistrictDto: CreateCityDistrictDto,
  ): Promise<Address> {
    return this.addressService.createCityOrDistrict(createCityDistrictDto);
  }

  // 1 ta Userni idsi bo'yicha barcha addresslarini olish
  @Get(':userId')
  @ApiOperation({ summary: 'Get all addresses for current user' })
  @ApiResponse({
    status: 200,
    description: 'Return all addresses',
    type: [Address],
  })
  findAddressByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Address[]> {
    return this.addressService.findAddressByUserId(userId);
  }

  @Get('region/:regionId/cities')
  @ApiOperation({
    summary: 'Get all cities by region ID',
    description:
      "Viloyat bo'yicha shaharlarni olish yoki faqat Toshkent shahri region sifatida kiritilgani uchun Toshkent shahridagi tumanlarni olishi uchun @param regionId - Viloyat yoki Toshkent shahar ID  si @returns Viloyatga tegishli shaharlar yoki Toshkent shahridagi tumanlar ro'yxati",
  })
  @ApiResponse({
    status: 200,
    description: 'Return all cities in the region',
    type: [Address],
  })
  getCitiesByRegion(
    @Param('regionId', ParseIntPipe) regionId: number,
  ): Promise<Address[]> {
    return this.addressService.getCitiesByRegion(regionId);
  }

  @Get(':userId/:id')
@ApiOperation({ summary: 'Get address by ID and User ID' })
@ApiResponse({
  status: 200,
  description: 'Return address by ID',
  type: Address,
})
@ApiResponse({
  status: 404,
  description: 'Address not found',
})
findAddressById(
  @Param('userId', ParseIntPipe) userId: number,
  @Param('id', ParseIntPipe) id: number,
): Promise<Address> {
  // console.log(userId, id, "controller")
  return this.addressService.findByAddressId(id, userId);
}

@Get()
@ApiOperation({ summary: 'Get all address' })
@ApiResponse({
  status: 200,
  description: 'Return all address',
  type: Address,
})
@ApiResponse({
  status: 404,
  description: 'Address not found',
})
findAllAddress(
): Promise<Address[]> {
  return this.addressService.findAllAddress();
}


  @Patch('region/:id')
  @ApiOperation({ summary: 'Update Region address' })
  @ApiResponse({
    status: 200,
    description: 'Address has been successfully updated',
    type: Address,
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  updateRegion(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateRegionDto: UpdateRegionDto,
  ): Promise<Address> {
    return this.addressService.updateRegion(id, UpdateRegionDto);
  }

  @Patch('city/:id')
  @ApiOperation({ summary: 'Update City or District address' })
  @ApiResponse({
    status: 200,
    description: 'Address has been successfully updated',
    type: Address,
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCityDistrictDto: UpdateCityDistrictDto,
  ): Promise<Address> {
    return this.addressService.updateCity(id, UpdateCityDistrictDto);
  }

  @Delete('delete/:id/:userId')
  @ApiOperation({ summary: 'Delete address' })
  @ApiResponse({
    status: 200,
    description: 'Address has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Address not found',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.addressService.removeAddressById(id, userId);
  }
}
