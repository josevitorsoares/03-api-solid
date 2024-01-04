import { CheckInsRepositoy } from "@/repositories/check-in-repository";

export interface GetUserMetricsUseCaseRequest {
    userId: string;
}

export interface GetUserMetricsUseCaseResponse {
    checkInsCount: number;
}

export class GetUserMetricsUseCase {
    constructor(
        private checkInsRepository: CheckInsRepositoy,
    ) { }

    async execute({ userId }: GetUserMetricsUseCaseRequest) {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId);

        return {
            checkInsCount
        };
    }
}