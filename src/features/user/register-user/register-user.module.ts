import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserController } from './register-user.controller';
import { RegisterUserHandler } from './register-user.handler';

@Module({
  imports: [CqrsModule],
  controllers: [RegisterUserController],
  providers: [UserRepository, RegisterUserCommand, RegisterUserHandler],
})
export class RegisterUserModule {}