export enum EmploymentType {
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
  CONTRACTOR = 'Contractor',
  TEMPORARY = 'Temporary',
  INTERN = 'Intern',
  VOLUNTEER = 'Volunteer',
  PER_DIEM = 'Per Diem',
  OTHER = 'Other',
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface Location {
  existingLocation?: EntityReference;
  externalLocation?: string;
}

export interface Coordinate {
  latitude?: number;
  longitude?: number;
}

export interface YextBoundingBox {
  southWest: Coordinate;
  northEast: Coordinate;
}

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

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export default interface Job {
  applicationUrl?: string;
  datePosted?: string;
  employmentType?: EmploymentType;
  hiringOrganization?: string;
  jobLocation?: EntityReference;
  landingPageUrl?: string;
  c_uRL?: string;
  location?: Location;
  nudgeEnabled?: boolean;
  primaryConversationContact?: unknown;
  slug?: string;
  validThrough?: unknown;
  workRemote?: boolean;
  yextBoundingBox?: YextBoundingBox;
  description?: string;
  logo?: ComplexImage;
  name: string;
  c_activeInSearch?: boolean;
  c_body?: string;
  c_employmentType?: string;
  c_fullBodyText?: string;
  c_jobFunction?: string;
  c_jobLocation?: string;
  c_contentGenTest?: string;
  displayCoordinate?: Coordinate;
  keywords?: string[];
  id: string;
  timezone?: unknown;
  yextDisplayCoordinate?: Coordinate;
}
