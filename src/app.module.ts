import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstancesModule } from './instances/instances.module';
import { QuestionModule } from './questions/questions.module';

@Module({
  imports: [InstancesModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
