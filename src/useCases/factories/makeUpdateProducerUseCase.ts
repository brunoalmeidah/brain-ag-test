import { ProducerRepository } from "@/repositories/producerRepository";
import { UpdateProducerUseCase } from "../updateProducer";

export function makeUpdateProducerUseCase() {
  const producerRepository = new ProducerRepository();
  const updateProducerUseCase = new UpdateProducerUseCase(producerRepository);

  return updateProducerUseCase;
}
