import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";
import { AppError } from "./errors/appError";

interface RemoveProducerProps {
  id: string;
}
export class RemoveProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute({ id }: RemoveProducerProps) {
    const producer = await this.producerRepository.findOneById(id);

    if (!producer) throw new AppError("Produtor não encontrado");

    await this.producerRepository.delete(id);
  }
}
