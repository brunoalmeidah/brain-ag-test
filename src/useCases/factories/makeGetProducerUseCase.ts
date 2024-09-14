import { ProducerRepository } from "@/repositories/producerRepository";
import { GetProducerUseCase } from "../getProducer";

export function makeGetProducerUseCase() {
  const producerRepository = new ProducerRepository();
  const getProducerUseCase = new GetProducerUseCase(producerRepository);

  return getProducerUseCase;
}
