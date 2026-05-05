import { ResourceType } from "../../core/types/resource.type";
import { DriverAttributes } from "../application/dto/driver-attributes.dto.type";

export type DriverUpdateInput = {
  data: {
    type: ResourceType.Drivers;
    id: string;
    attributes: DriverAttributes;
  };
};
