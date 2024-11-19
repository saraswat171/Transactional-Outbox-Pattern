import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exceptions/exceptions';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand) {
    const user = await this.repository.findByEmail(command.email);

     if (user) throw new UserEmailAlreadyExistsConflict();

    return await this.repository.saveUser(command);
  }
}