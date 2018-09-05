import { ImageLinks } from "./imageLink.model";

export interface VolumeInfo {
    title: string;
    publishedDate: string;
    pageCount: number;
    imageLinks: ImageLinks;
    language: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    description: string;
}
