import { CropRepository } from "@/repositories/cropRepository";
import { FetchCropsUseCase } from "../fetchCrops";

export function makeFetchCropsUseCase() {
  const cropRepository = new CropRepository();
  const fetchCropsUseCase = new FetchCropsUseCase(cropRepository);

  return fetchCropsUseCase;
}
