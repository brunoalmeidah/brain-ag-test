import { validateCNPJ } from "@/helpers/validateCNPJ";
import { validateCPF } from "@/helpers/validateCPF";
import { AppError } from "./errors/appError";
import { Producer } from "@prisma/client";
import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";

interface CreateProducerProps {
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

export class CreateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(data: CreateProducerProps): Promise<Producer> {
    const isDocumentValid =
      validateCNPJ(data.document) || validateCPF(data.document);

    if (!isDocumentValid) throw new AppError("Documento inválido");

    const sumOfArea = data.farmUsableTotalArea + data.farmVegetationTotalArea;

    if (sumOfArea > data.farmTotalArea)
      throw new AppError(
        "A soma da área agrícultável e vegetação não pode ser maior que a área total da fazenda"
      );

    const producer = await this.producerRepository.create(data);

    return producer;
  }
}
