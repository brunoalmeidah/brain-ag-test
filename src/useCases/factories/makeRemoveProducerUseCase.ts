import { ProducerRepository } from "@/repositories/producerRepository";
import { RemoveProducerUseCase } from "../removeProducer";

export function makeRemoveProducerUseCase() {
  const producerRepository = new ProducerRepository();
  const removeProducerUseCase = new RemoveProducerUseCase(producerRepository);

  return removeProducerUseCase;
}
