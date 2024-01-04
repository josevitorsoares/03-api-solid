import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepositoy {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
    fetchManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
    countByUserId(userId: string): Promise<number>;
}