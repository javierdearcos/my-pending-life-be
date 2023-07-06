import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { CreatePendingItem } from "./entities/create-pending-item.entity";
import { PendingItem } from "./entities/pending-item.entity";
import { updatePendingItem } from "./entities/update-pending-item.entity";

@Injectable()
export class PendingItemsRepository {
    private pendingItems: PendingItem[] = [
        {
            id: "69b23172-b1ed-40c3-a5f9-78ee1574342a",
            name: "Mindset",
            description: "Read the Mindset book by Carol S. S. Dweck",
            numberOfHours: 12
        },
        {
            id: "bbd020d9-b989-4e4c-9b00-7a4cee75257b",
            name: "Mass Effect 2",
            description: "Finish Mass Effect 2 videogame",
            numberOfHours: 24
        },
        {
            id: "9473e378-c658-4dee-b34b-78a756e3c958",
            name: "Homeland",
            description: "Finish TV Show homeland",
            numberOfHours: 4
        }
    ]

    findAllPendingItems(): PendingItem[] {
        return this.pendingItems;
    }

    findPendingItem(id: string): PendingItem {
        const pendingItem = this.pendingItems.filter(pendingItem => pendingItem.id === id)[0];

        if (!pendingItem) {
            throw Error(`Pending item ${id} not found`);
        }

        return pendingItem;
    }

    createPendingItem(pendingItem: CreatePendingItem): PendingItem {
        this.pendingItems.push({
            id: uuidv4(),
            ...pendingItem
        });

        return this.pendingItems[this.pendingItems.length - 1];
    }

    updatePendingItem(id: string, pendingItem: updatePendingItem): PendingItem {
        let pendingItemToUpdate = this.pendingItems.filter(pendingItem => pendingItem.id === id)[0];

        if (!pendingItemToUpdate) {
            throw Error(`Pending item ${id} not found`);
        }

        pendingItemToUpdate = {
            ...pendingItemToUpdate,
            ...pendingItem
        };

        this.pendingItems = this.pendingItems.filter(pendingItem => pendingItem.id !== id);
        this.pendingItems.push(pendingItemToUpdate);

        return pendingItemToUpdate;
    }

    deletePendingItem(id: string): void {
        this.pendingItems = this.pendingItems.filter(pendingItem => pendingItem.id !== id);
    }
}