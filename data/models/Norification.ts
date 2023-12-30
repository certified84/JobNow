export type Notification = {
  id: string;
  title: string;
  pay: string,
  type: string;
  locationType: string,
  location: string,
  company: string,
  companyLogo?: string | null,
  description: string,
  requirements: string[]
};

export const defaultNotification: Notification = {
    id: "",
    title: "",
    pay: "",
    type: "",
    locationType: "",
    location: "",
    company: "",
    description: "",
    requirements: [""]
};
