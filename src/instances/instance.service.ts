import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Instance } from "./instance.module";

@Injectable()
export class InstanceService {
    private instances: Instance[] = []

    addInstance() {
        const id = randomUUID().toString()
        const newInstance = new Instance(id, 0, [])

        this.instances.push(newInstance)

        return id
    }

    getInstance(id: string) {
        const instance = this.findInstance(id)

        return instance
    }

    addPoints(id: string, points: number) {
        const instance = this.findInstance(id)

        instance.addPoints(points)
    }

    addAnswers(id: string, answers: []) {
        const instance = this.findInstance(id)


    }

    private findInstance(id: string) {
        const index = this.instances.findIndex((i) => i.id === id)
        const instance = this.instances[index]

        if (!instance) {
            throw new NotFoundException(`no instance could be found for id ${id}`)
        }

        return instance
    }
}