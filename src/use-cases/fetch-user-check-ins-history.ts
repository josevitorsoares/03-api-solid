import { CheckInsRepositoy } from "@/repositories/check-in-repository";
import { CheckIn } from "@prisma/client";

export interface FetchUserCheckInsHistoryRequest {
    userId: string;
    page: number;
}

export interface FetchUserCheckInsHistoryResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(
        private chekInsRepository: CheckInsRepositoy
    ) { }

    async execute({ 
        userId,
        page 
    }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
        const checkIns = await this.chekInsRepository.fetchManyByUserId(userId, page);

        return {
            checkIns,
        };
    }
}