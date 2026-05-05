import { DriverAttributes } from "../application/dto/driver-attributes.dto.type";
import { ResourceType } from "../../core/types/resource.type";

export type DriverCreateInput = {
  data: {
    type: ResourceType.Drivers;
    attributes: DriverAttributes;
  };
};
