export interface Categories {
    message:    string;
    success:    boolean;
    categories: Category[];
}

export interface Category {
    _id:         string;
    name:        string;
    description: string;
    images:      string[];
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
}