// seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../models/user.model';
import { hashPassword } from '../../../utils/common.functions';
import { Repository } from 'typeorm';
import { Role } from '../../../models/role.model';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly _m_User: Repository<User>,
    @InjectRepository(Role)
    private readonly _m_Role: Repository<Role>
  ) {}

  async seed(): Promise<void> {
    await this.seedRole();
    await this.seedUser();    
  }

  private async seedRole(): Promise<void> {
    let roles = [
     {id: 1, name: 'Superadmin', is_active:true}
    ]
    await this._m_Role.save(roles);
   }

  private async seedUser(): Promise<void> {
   const roles = await this._m_Role.find({where: {id: 1}})
   let users = [
    { name: 'superadmin', email: 'admin@gmail.com', is_active: true, is_superadmin: true, password: await hashPassword('123456'), roles:  roles }
   ]
   await this._m_User.save(users);
   console.log('users has been seeded')
  }

}
