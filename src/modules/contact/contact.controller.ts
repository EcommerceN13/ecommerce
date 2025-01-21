import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos';
import { Contact } from './models';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @ApiOperation({ summary: 'Send a new contact message' })
    @Post()
    async createContact(@Body() dto: CreateContactDto): Promise<Contact> {
        return await this.contactService.createContact(dto);
    }
}
