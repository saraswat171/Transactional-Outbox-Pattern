import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({ where: { email } });
    }

    async saveUser(payload: any): Promise<User> {
        // await this.dataSource.createQueryBuilder().insert().into(User).values([
        //     payload
        // ]).execute();

        await this.save(payload);

        return this.findOne({
            where: {
                email: payload.email
            }
        })
    }
}