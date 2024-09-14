import { ProducerRepository } from "@/repositories/producerRepository";
import { CreateProducerUseCase } from "../createProducer";

export function makeCreateProducerUseCase() {
  const producerRepository = new ProducerRepository();
  const createProducerUseCase = new CreateProducerUseCase(producerRepository);

  return createProducerUseCase;
}
