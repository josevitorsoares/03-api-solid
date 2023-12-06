import { beforeEach, describe, expect, it, afterEach, vi } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CheckInUseCase } from "./check-in";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check In Use Case", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInRepository, gymsRepository);

        gymsRepository.items.push({
            id: "gym-01",
            title: "JavaScript Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-5.8917081),
            longitude: new Decimal(-42.6309442)
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.8917081,
            userLongitude: -42.6309442,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2023, 1, 20, 8, 0, 0)); // 20/02/2023T08:00:00

        await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.8917081,
            userLongitude: -42.6309442,
        });

        await expect(() =>
            sut.execute({
                gymId: "gym-01",
                userId: "user-01",
                userLatitude: -5.8917081,
                userLongitude: -42.6309442,
            })
        ).rejects.toBeInstanceOf(Error);
    });

    it("should be able to check in twice but in differnt days", async () => {
        vi.setSystemTime(new Date(2023, 1, 20, 8, 0, 0)); // 20/02/2023T08:00:00

        await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.8917081,
            userLongitude: -42.6309442,
        });

        vi.setSystemTime(new Date(2023, 1, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -5.8917081,
            userLongitude: -42.6309442,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
    it("should not be able to check in on distance gym", async () => {
        gymsRepository.items.push({
            id: "gym-012",
            title: "JavaScript Gym",
            description: "",
            phone: "",
            latitude: new Decimal(-5.992565),
            longitude: new Decimal(-42.5549428)
        });

        await expect(() => sut.execute({
            gymId: "gym-02",
            userId: "user-01",
            userLatitude: -5.8917081,
            userLongitude: -42.6309442,
        }));
    });
});