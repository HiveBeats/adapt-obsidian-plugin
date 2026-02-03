export interface AdaptNote {
    publicId: string;
    title?: string | null;
    content: string;
    tags?: string[];
    isPinned: boolean;
    isArchived: boolean;
    createdAt: Date; // ISO date-time string
    updatedAt: Date; // ISO date-time string
}