import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthenticationDto } from './create-user-authentication.dto';

export class UpdateUserAuthenticationDto extends PartialType(CreateUserAuthenticationDto) {}
