export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export default interface scan {
  c_uRL: string;
  c_body: string;
  c_primaryImage: Image;
}
