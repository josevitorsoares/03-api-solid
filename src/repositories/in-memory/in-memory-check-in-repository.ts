import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { CheckInRepositoy } from "../check-in-repository";

export class InMemoryCheckInRepository implements CheckInRepositoy {
    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const chekin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        };

        this.items.push(chekin);

        return chekin;
    }

}