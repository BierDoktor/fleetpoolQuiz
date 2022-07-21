import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionService: QuestionService) {}

    @Get(':id')
    getQuestion(@Param('id') questionId: number) {
        const question = this.questionService.getQuestion(questionId)

        return {
            text: question.text,
            answers: question.answers.map((answer, index) => {
                return {
                    id: index,
                    text: answer.text
                }
            })
        }
    }

    @Post()
    solveQuestion(
        @Body('instanceId') instanceId: string,
        @Body('qId') qId: number,
        @Body('aIds') aIds: number[]
    ): any {
        const points = this.questionService.solveQuestion(qId, aIds, instanceId)
        const next = this.questionService.getNext(qId)

        return {
            points,
            next
        }
    }
}

type solveQuestionReturnType = {
    points: number
    next: number
}