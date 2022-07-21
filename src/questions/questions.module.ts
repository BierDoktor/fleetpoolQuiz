import { Module } from "@nestjs/common";
import { InstancesModule } from "src/instances/instances.module";
import { QuestionService } from "./question.service";
import { QuestionsController } from "./questions.controller";

@Module({
    controllers: [QuestionsController],
    imports: [InstancesModule],
    providers: [QuestionService],
    exports: [QuestionService]
})

export class QuestionModule {}