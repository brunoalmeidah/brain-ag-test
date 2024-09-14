import { ProducerRepository } from "@/repositories/producerRepository";
import { FetchProducersUseCase } from "../fetchProducers";

export function makeFetchProducersUseCase() {
  const producerRepository = new ProducerRepository();
  const fetchProducersUseCase = new FetchProducersUseCase(producerRepository);

  return fetchProducersUseCase;
}
