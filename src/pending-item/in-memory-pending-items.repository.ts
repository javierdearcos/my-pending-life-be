import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { CreatePendingItem, PendingItem, UpdatePendingItem } from "./entities";
import { PendingItemsRepository } from "./pending-items.repository";

@Injectable()
export class InMemoryPendingItemsRepository implements PendingItemsRepository {
    private pendingItems: PendingItem[] = [
        {
            id: "69b23172-b1ed-40c3-a5f9-78ee1574342a",
            userId: "f97be3f5-4af3-419b-bb56-8520f0a49ce6",
            name: "Mindset",
            description: "Read the Mindset book by Carol S. S. Dweck",
            numberOfHours: 12
        },
        {
            id: "bbd020d9-b989-4e4c-9b00-7a4cee75257b",
            userId: "f97be3f5-4af3-419b-bb56-8520f0a49ce6",
            name: "Mass Effect 2",
            description: "Finish Mass Effect 2 videogame",
            numberOfHours: 24
        },
        {
            id: "9473e378-c658-4dee-b34b-78a756e3c958",
            userId: "f97be3f5-4af3-419b-bb56-8520f0a49ce6",
            name: "Homeland",
            description: "Finish TV Show homeland",
            numberOfHours: 4
        }
    ]

    findAllPendingItems(userId: string): PendingItem[] {
        return this.pendingItems.filter(pendingItem => pendingItem.userId === userId);
    }

    findPendingItem(userId: string, id: string): PendingItem {
        const pendingItem = 
            this.pendingItems
                    .find(pendingItem => pendingItem.id === id && pendingItem.userId === userId);

        if (!pendingItem) {
            throw Error(`Pending item ${id} not found`);
        }

        return pendingItem;
    }

    createPendingItem(userId: string, pendingItem: CreatePendingItem): PendingItem {
        this.pendingItems.push({
            id: uuidv4(),
            userId: userId,
            ...pendingItem
        });

        return this.pendingItems[this.pendingItems.length - 1];
    }

    updatePendingItem(userId: string, id: string, pendingItem: UpdatePendingItem): PendingItem {
        let pendingItemToUpdate = 
            this.pendingItems
                    .find(pendingItem => pendingItem.id === id && pendingItem.userId === userId);

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

    deletePendingItem(userId: string, id: string): void {
        const pendingItem = 
            this.pendingItems
                    .find(pendingItem => pendingItem.id === id && pendingItem.userId === userId);

        if (!pendingItem) {
            return;
        }

        this.pendingItems = 
            this.pendingItems
                    .filter(pendingItem => pendingItem.id !== id);
    }
}