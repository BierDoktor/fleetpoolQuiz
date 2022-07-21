import { Module } from '@nestjs/common';
import { QuestionModule } from 'src/questions/questions.module';
import { InstanceController } from './instance.controller';
import { InstanceService } from './instance.service';

@Module({
    controllers: [InstanceController],
    providers: [InstanceService],
    exports: [InstanceService]
})
export class InstancesModule {}
