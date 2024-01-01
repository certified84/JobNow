export type Job = {
  id: string;
  title: string;
  pay: string;
  type: string;
  locationType: string;
  status: JobStatus;
  statusUpdate?: string;
  statusUpdateDate: string;
  location: string;
  company: string;
  companyLogo?: string | null;
  description: string;
  requirements: string[];
  bookmarked?: boolean;
};

type JobStatus = "pending" | "sent" | "rejected" | "accepted"

export const defaultJob: Job = {
  id: "",
  title: "",
  pay: "",
  type: "",
  status: "pending",
  statusUpdate: "",
  statusUpdateDate: "",
  locationType: "",
  location: "",
  company: "",
  description: "",
  requirements: [""],
  bookmarked: false,
};
