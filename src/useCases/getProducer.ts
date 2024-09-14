import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";
import { AppError } from "./errors/appError";

interface GetProducerProps {
  id: string;
}
export class GetProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute({ id }: GetProducerProps) {
    const producer = await this.producerRepository.findOneById(id);

    if (!producer) throw new AppError("Produtor não encontrado");

    return producer;
  }
}
