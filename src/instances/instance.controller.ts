import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InstanceService } from "./instance.service";

@Controller('instances')
export class InstanceController {

    constructor(private readonly instanceService: InstanceService) {}

    @Post()
    addInstance()
    : addInstanceReturnType {
        const id = this.instanceService.addInstance()

        return {
            id: id,
            nextQ: 0
        }
    }

    @Get(':instanceId')
    printSummary(@Param('instanceId') instanceId: string)
    : any {
        const instance = this.instanceService.getInstance(instanceId)

        return instance.answers
    }
}

type addInstanceReturnType = {
    id: string
    nextQ: number
}