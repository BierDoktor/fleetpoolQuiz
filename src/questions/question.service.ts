import { Injectable, OnModuleInit } from "@nestjs/common";
import { InstanceService } from "src/instances/instance.service";

@Injectable()
export class QuestionService implements OnModuleInit {
    private questions: Question[] = []

    constructor(private readonly instanceService: InstanceService) {}

    onModuleInit() {
        this.questions = [
            {
                text: 'A byte is comprised of how many bits?',
                answers: [
                    {
                        text: '2',
                        correct: false
                    },
                    {
                        text: '4',
                        correct: false
                    },
                    {
                        text: '8',
                        correct: true
                    }
                ]
            },
            {
                text: 'What is H2O?',
                answers: [
                    {
                        text: 'Water',
                        correct: true
                    },
                    {
                        text: 'Helium',
                        correct: false
                    },
                    {
                        text: 'Oxygen',
                        correct: false
                    }
                ]
            },
            {
                text: 'What is H2O comprised of ?',
                answers: [
                    {
                        text: 'Nitrogen',
                        correct: false
                    },
                    {
                        text: 'Hydrogen',
                        correct: true
                    },
                    {
                        text: 'Carbon dioxide',
                        correct: false,
                    },
                    {
                        text: 'Oxygen',
                        correct: true
                    }
                ]
            },
            {
                text: 'Your heart pumps blood. Correct?',
                answers: [
                    {
                        text: 'Yes',
                        correct: true
                    },
                    {
                        text: 'No',
                        correct: false
                    }
                ]
            },
            {
                text: 'Where can you find an Eiffel Tower?',
                answers: [
                    {
                        text: 'Tokyo',
                        correct: true,
                        bonus: true
                    },
                    {
                        text: 'Berlin',
                        correct: false
                    },
                    {
                        text: 'Dubai',
                        correct: false
                    },
                    {
                        text: 'Paris',
                        correct: true
                    },
                    {
                        text: 'Las Vegas',
                        correct: true,
                        bonus: true
                    }
                ]
            }
        ]
    }

    getQuestion(id: number) {
        const question = this.questions[id]

        return question
    } 

    getQuestions() {
        return this.questions
    }

    solveQuestion(qId: number, aIds: number[], instanceId: string) {
        const question = this.getQuestion(qId)
        const instance = this.instanceService.getInstance(instanceId)
        let points = 0
        let allRequiredAnswersGiven = true

        instance.addAnswers(question, aIds)

        for(const aId of aIds) {
            const answer = question.answers[aId]

            if(answer.correct) {
                points++
            } else {
                return 0
            }
        }

        question.answers.forEach((a, i) => {
            if(a.correct && !a.bonus) {
                if(!aIds.includes(i)) {
                    allRequiredAnswersGiven = false
                }
            }
        })

        this.instanceService.addPoints(instanceId, points)

        return allRequiredAnswersGiven ? points : 0
    }

    getNext(qId: number) {
        if(qId < this.questions.length -1) {
            return qId+1
        } else {
            return -1
        }
    }
}

export type Question = {
    text: string
    answers: Answer[]
}

type Answer = {
    text: string
    correct: boolean
    bonus?: boolean
}