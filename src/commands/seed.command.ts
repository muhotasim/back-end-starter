// seed.command.ts
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeederService } from '../modules/seeder/services/seeder.service';

@Injectable()
export class SeedCommand {
  constructor(private readonly seederService: SeederService) {}

  @Command({ command: 'seed:run', describe: 'Seed the database' })
  async run(): Promise<void> {
    await this.seederService.seed();
    console.log('Database seeded successfully');
  }
}
