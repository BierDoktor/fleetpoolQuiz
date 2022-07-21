import { Answer } from "src/questions/answer.moduie"
import { Question } from "src/questions/question.service"

export class Instance {

    constructor(
        public id: string,
        public points: number,
        public answers: answerSummary[]
    ) {}

    addPoints(points: number) {
        this.points += points
    }

    addAnswers(question: Question, answerIds: number[]) {
        this.answers.push({
            question,
            answerIds
        })
    }
}

type answerSummary = {
    question: Question
    answerIds: number[]
}