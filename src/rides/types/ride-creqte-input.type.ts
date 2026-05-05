import { ResourceType } from "../../core/types/resource.type";
import { RideAttributes } from "../application/dto/ride-attributes.dto";

export type RideCreateInput = {
  data: {
    type: ResourceType.Rides;
    attributes: RideAttributes;
  };
};
