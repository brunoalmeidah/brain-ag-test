import { ProducerRepository } from "@/repositories/producerRepository";

import { CropRepository } from "@/repositories/cropRepository";
import { GetDashboardMetricsUseCase } from "../getDashboardMetrics";

export function makeGetDashboardMetricsUseCase() {
  const producerRepository = new ProducerRepository();
  const cropRepository = new CropRepository();
  const getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(
    producerRepository,
    cropRepository
  );

  return getDashboardMetricsUseCase;
}
