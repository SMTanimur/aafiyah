import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { User } from '@aafiyah/common';
import { UsersService } from '../users/users.service';

@ApiTags('Address')
@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly userService: UsersService
  ) {}

  @ApiOperation({ summary: 'Create address' })
  @ApiCreatedResponse({ description: 'Address has been successfully created.' })
  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @User() { id }: User
  ) {
    const user = await this.userService.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    createAddressDto.user = user;

    return await this.addressesService.create(createAddressDto);
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({ description: 'This action returns all addresses' })
  @UseGuards(AuthenticatedGuard)
  @Get()
  async findAll(@User() { id }: User) {
    return await this.addressesService.findAll(id);
  }

  @ApiOperation({ summary: 'Get address by id' })
  @ApiOkResponse({ description: 'This action returns address by id' })
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @User() { id: userId }: User) {
    return await this.addressesService.findOne({ id, user: { id: userId } });
  }

  @ApiOperation({ summary: 'Update address' })
  @ApiCreatedResponse({ description: 'Address has been successfully updated.' })
  @UseGuards(AuthenticatedGuard)
  @Patch()
  async update(@Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressesService.update(updateAddressDto);
  }

  @ApiOperation({ summary: 'Delete address' })
  @ApiOkResponse({ description: 'Address has been successfully deleted.' })
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
