import { IProducerRepository } from "@/repositories/interfaces/IProducerRepository";
import { ICropRepository } from "@/repositories/interfaces/ICropRepository";

export class GetDashboardMetricsUseCase {
  constructor(
    private producerRepository: IProducerRepository,
    private cropRepository: ICropRepository
  ) {}

  async execute() {
    const totals = await this.producerRepository.getTotalOfFarmAndArea();
    const pizzaChartByState =
      await this.producerRepository.getTotalGroupedByStates();
    const pizzaChartByCrop = await this.cropRepository.getGroupedByCrop();
    const pizzaCharBySoil =
      await this.producerRepository.getTotalGroupedBySoil();

    return {
      ...totals,
      pizzaCharBySoil,
      pizzaChartByCrop,
      pizzaChartByState,
    };
  }
}
