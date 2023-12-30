export type Job = {
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

export const defaultJob: Job = {
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
