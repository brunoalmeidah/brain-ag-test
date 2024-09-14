import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";
import { AppError } from "./errors/appError";

interface UpdateProducerProps {
  name: string;
  farmName: string;
  document: string;
  city: string;
  state: string;
  farmTotalArea: number;
  farmUsableTotalArea: number;
  farmVegetationTotalArea: number;
  crops: number[];
}

export class UpdateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(producerId: string, data: UpdateProducerProps) {
    const producer = await this.producerRepository.findOneById(producerId);

    if (!producer) throw new AppError("Produtor não encontrado");

    const sumOfArea = data.farmUsableTotalArea + data.farmVegetationTotalArea;

    if (sumOfArea > data.farmTotalArea)
      throw new AppError(
        "A soma da área agrícultável e vegetação não pode ser maior que a área total da fazenda"
      );

    const producerUpdated = await this.producerRepository.update(
      producerId,
      data
    );

    return producerUpdated;
  }
}
