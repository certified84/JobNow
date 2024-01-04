type JobStatus = "pending" | "sent" | "rejected" | "accepted";

export type Job = {
  id: string;
  title: string;
  pay: string;
  type: string;
  locationType: string;
  location: string;
  company: string;
  companyLogo?: string | null;
  description: string;
  requirements: string[];
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
  requirements: [""],
};


export type Application = {
  id: string;
  jobId: string;
  userId: string;
  status: JobStatus;
  statusUpdate?: string;
  statusUpdateDate: string;
  resume: string;
  coverLetter: string;
};

export const defaultApplication = {
  id: "",
  jobId: "",
  userId: "",
  status: "pending",
  statusUpdate: "",
  statusUpdateDate: "",
  resume: "",
  coverLetter: "",
};

export type Bookmark = {
  id: string;
  userId: string;
  jobId: string;
};

export const defaultBookmark = {
  id: "",
  userId: "",
  jobId: "",
};