export interface ServiceItem {
  id: string;
  name: string;
  summary: string;
  features: string[];
  icon: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  vehicle: string;
  rating: number;
  text: string;
  isSample: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  vehicleDetails: string;
  projectDetails: string;
  locationZip: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  phoneRaw: string;
  email: string;
  facebook: string;
  instagram: string;
}
