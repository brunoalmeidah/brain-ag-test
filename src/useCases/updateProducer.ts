import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";
import { AppError } from "./errors/appError";
import { validateCNPJ } from "@/helpers/validateCNPJ";
import { validateCPF } from "@/helpers/validateCPF";

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

    const isDocumentValid =
      validateCNPJ(data.document) || validateCPF(data.document);

    if (!isDocumentValid) throw new AppError("Documento inválido");

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
