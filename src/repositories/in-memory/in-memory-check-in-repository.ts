import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

import { CheckInsRepositoy } from "../check-in-repository";

export class InMemoryCheckInRepository implements CheckInsRepositoy {
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

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date");
        const endOfTheDay = dayjs(date).endOf("date");

        const checkInOnSameDate = this.items.find((checkin) => {
            const checkInDate = dayjs(checkin.created_at);
            const isOnSameDate = 
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay); 
            
            return checkin.user_id === userId  && isOnSameDate;
        });

        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
    }

}