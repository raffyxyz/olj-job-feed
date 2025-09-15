import { Timestamp } from "firebase-admin/firestore";

interface Job {
  id: string;
  createdAt: Timestamp;
  description: string;
  employmentType: string;
  postedDate: string;
  posterName: string;
  salary: string;
  tags: string[];
  title: string;
  url: string;
}

interface JobDocumentData {
  createdAt: Timestamp;
  description: string;
  employmentType: string;
  postedDate: string;
  posterName: string;
  salary: string;
  tags: string[];
  title: string;
  url: string;
}

export type { Job, JobDocumentData };
