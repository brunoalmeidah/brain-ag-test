import { InMemoryProducerRepository } from "@/repositories/inMemory/inMemoryProducerRepository";
import { expect, describe, it, beforeEach } from "vitest";
import { AppError } from "./errors/appError";
import { UpdateProducerUseCase } from "./updateProducer";

let producerRepository: InMemoryProducerRepository;
let updateProducerUseCase: UpdateProducerUseCase;
let id: string;

describe("Update Producer Use Case", () => {
  beforeEach(async () => {
    producerRepository = new InMemoryProducerRepository();
    updateProducerUseCase = new UpdateProducerUseCase(producerRepository);
    const result = await producerRepository.create({
      name: "fazendeiro",
      document: "123456",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2000,
      farmUsableTotalArea: 1500,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    });
    id = result.id;
  });

  it("Should not update a producer when document is invalid", async () => {
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
      updateProducerUseCase.execute(id, producer)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not update a producer when the sum of usable area and vegetation area is greater then total area", async () => {
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
      updateProducerUseCase.execute(id, producer)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should create a prducer with a valid CNPJ", async () => {
    const producer = {
      name: "fazendeiro alterado",
      document: "30074584000100",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2500,
      farmUsableTotalArea: 2000,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };

    const result = await updateProducerUseCase.execute(id, producer);
    expect(result.name).toBe("fazendeiro alterado");
  });

  it("Should create a prducer with a valid CPF", async () => {
    const producer = {
      name: "fazendeiro alterado",
      document: "861.982.900-93",
      farmName: "fazenda",
      city: "São Paulo",
      state: "São Paulo",
      farmTotalArea: 2500,
      farmUsableTotalArea: 2000,
      farmVegetationTotalArea: 500,
      crops: [1, 2, 3],
    };

    const result = await updateProducerUseCase.execute(id, producer);
    expect(result.name).toBe("fazendeiro alterado");
  });

  it("Should not update a producer that not exist", async () => {
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
      updateProducerUseCase.execute("123456", producer)
    ).rejects.toBeInstanceOf(AppError);
  });
});
