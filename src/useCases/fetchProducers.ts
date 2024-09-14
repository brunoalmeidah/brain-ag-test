import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";

interface FetchProducersProps {
  page: number;
}
export class FetchProducersUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute({ page }: FetchProducersProps) {
    const producers = await this.producerRepository.findAll(page);

    return producers;
  }
}
