// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   ParseIntPipe,
// } from '@nestjs/common';
// import { AddressService } from './address.service';
// import { CreateAddressDto } from './dto/create-address.dto';
// import { UpdateAddressDto } from './dto/update-address.dto';
// import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Address } from './models';
// import { Protected, Roles } from '@decorators';
// import { UserRoles } from '../user';

// @ApiTags('Address')
// @ApiBearerAuth()
// @Controller('address')
// export class AddressController {
//   constructor(private readonly addressService: AddressService) {}

//   @ApiOperation({ summary: 'Create new address' })
//   @ApiResponse({
//     status: 201,
//     description: 'Address has been successfully created',
//     type: Address,
//   })
//   @Protected(true)
//   @Roles([UserRoles.admin])
//   @Post()
//   create(
//     @Body() createAddressDto: CreateAddressDto,
//     @GetUser('id') userId: number,
//   ): Promise<Address> {
//     return this.addressService.create(createAddressDto, userId);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all addresses for current user' })
//   @ApiResponse({
//     status: 200,
//     description: 'Return all addresses',
//     type: [Address],
//   })
//   findAll(@GetUser('id') userId: number): Promise<Address[]> {
//     return this.addressService.findAll(userId);
//   }

//   @Get('region/:regionId/cities')
//   @ApiOperation({ summary: 'Get all cities by region ID' })
//   @ApiResponse({
//     status: 200,
//     description: 'Return all cities in the region',
//     type: [Address],
//   })
//   getCitiesByRegion(
//     @Param('regionId', ParseIntPipe) regionId: number,
//   ): Promise<Address[]> {
//     return this.addressService.getCitiesByRegion(regionId);
//   }

//   @Get('city/:cityId/districts')
//   @ApiOperation({ summary: 'Get all districts by city ID' })
//   @ApiResponse({
//     status: 200,
//     description: 'Return all districts in the city',
//     type: [Address],
//   })
//   getDistrictsByCity(
//     @Param('cityId', ParseIntPipe) cityId: number,
//   ): Promise<Address[]> {
//     return this.addressService.getDistrictsByCity(cityId);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get address by ID' })
//   @ApiResponse({
//     status: 200,
//     description: 'Return address by ID',
//     type: Address,
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Address not found',
//   })
//   findOne(
//     @Param('id', ParseIntPipe) id: number,
//     // @GetUser('id') userId: number,
//   ): Promise<Address> {
//     // return this.addressService.findByAddressId(id, userId);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update address' })
//   @ApiResponse({
//     status: 200,
//     description: 'Address has been successfully updated',
//     type: Address,
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Address not found',
//   })
//   update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateAddressDto: UpdateAddressDto,
//     // @GetUser('id') userId: number,
//   ): Promise<Address> {
//     // return this.addressService.update(id, updateAddressDto, userId);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete address' })
//   @ApiResponse({
//     status: 200,
//     description: 'Address has been successfully deleted',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Address not found',
//   })
//   remove(
//     @Param('id', ParseIntPipe) id: number,
//     // @GetUser('id') userId: number,
//   ): Promise<void> {
//     // return this.addressService.remove(id, userId);
//   }
// }

// hali chalasi boridi shunga commitda