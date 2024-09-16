import { InMemoryProducerRepository } from "@/repositories/inMemory/inMemoryProducerRepository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateProducerUseCase } from "./createProducer";
import { AppError } from "./errors/appError";

let producerRepository: InMemoryProducerRepository;
let createProducerUseCase: CreateProducerUseCase;

describe("Create Producer Use Case", () => {
  beforeEach(() => {
    producerRepository = new InMemoryProducerRepository();
    createProducerUseCase = new CreateProducerUseCase(producerRepository);
  });

  it("Should not create a producer when document is invalid", async () => {
    const producer = {
      name: "fazendeiro",
      document: "123456",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };
    await expect(() =>
      createProducerUseCase.execute(producer)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not create a producer when the sum of usable area and vegetation area is greater then total area", async () => {
    const producer = {
      name: "fazendeiro",
      document: "861.982.900-93",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 2000,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };
    await expect(() =>
      createProducerUseCase.execute(producer)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should create a prducer with a valid CNPJ", async () => {
    const producer = {
      name: "fazendeiro",
      document: "30074584000100",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2500,
      farmUsableTotalArea: 2000,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };

    const result = await createProducerUseCase.execute(producer);
    expect(result.id).toBe("producer-1");
  });

  it("Should create a prducer with a valid CPF", async () => {
    const producer = {
      name: "fazendeiro",
      document: "861.982.900-93",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2500,
      farmUsableTotalArea: 2000,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };

    const result = await createProducerUseCase.execute(producer);
    expect(result.id).toBe("producer-1");
  });
});
