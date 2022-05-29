import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: './db/task-management.db',
        autoLoadEntities: true,
        synchronize: true
      }
    )
  ],
})

export class AppModule {}
