import { PartialType } from "@nestjs/mapped-types";
import { CreatePendingItem } from "./create-pending-item.entity";

export class updatePendingItem extends PartialType(CreatePendingItem) {}