import { ICropRepository } from "@/repositories/interfaces/ICropRepository";

export class FetchCropsUseCase {
  constructor(private cropRepository: ICropRepository) {}

  async execute() {
    const crops = await this.cropRepository.findAll();

    return crops;
  }
}
