import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

// This would get omitted in prod envs
@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    runSeeders(this.dataSource);
  }
}
