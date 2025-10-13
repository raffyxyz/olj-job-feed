import { getOnlyTodayJobsV1 } from "./jobs";
import jobs from "../response.json";

test("console log result of getOnlyTodayJobs", () => {
  // Pretend today is Oct 13, 2025
  const mockToday = new Date("2025-10-13T00:00:00Z");
  const realDateNow = Date.now;
  global.Date.now = jest.fn(() => mockToday.getTime());

  const jobs = [
    {
      title: "Specialist, Operations Management (INTUIT2027 Campaign)",
      url: "/jobseekers/job/Specialist-Operations-Management-INTUIT2027-Campaign-1476165",
      posterName: "landen szakal",
      postedDate: "Oct 12, 2025",
      salary: "1000",
      description:
        "Specialist, Operations Management (INTUIT2027 Campaign) Job Title: Specialist, Operations Management (INTUIT2027 Campaign) Location: Remote Engagement: Full-Time, Long-Term The Mission: A Campaign of Flawless Execution This is not a standard administrative role. We are seeking a mission-critical Specialist, Operations Management to…",
      tags: [""],
      employmentType: "Full Time",
      createdAt: { _seconds: 1760331001, _nanoseconds: 696000000 },
    },
    {
      title:
        "We’re Looking for a Spanish-Speaking Video Editor for Meta Ads (Facebook/Instagram)!",
      url: "/jobseekers/job/Were-Looking-for-a-Spanish-Speaking-Video-Editor-for-Meta-Ads-FacebookInstagram-1489281",
      posterName: "Marc Fabrega",
      postedDate: "Oct 12, 2025",
      salary: "",
      description:
        "???? Essential requirement: You must speak fluent Spanish and edit videos in Spanish. All our scripts, materials, and ads are in Spanish, so this requirement is mandatory. Are you a creative, fast, and detail-oriented video editor with experience in performance-driven…",
      tags: [""],
      employmentType: "Part Time",
      createdAt: { _seconds: 1760331001, _nanoseconds: 696000000 },
    },
    {
      title: "Accounting Manager CPA (US Based Accounting Firm; Tax Dept)",
      url: "/jobseekers/job/Accounting-Manager-CPA-US-Based-Accounting-Firm-Tax-Dept-1483342",
      posterName: "Carol Trotter",
      postedDate: "Oct 12, 2025",
      salary: "$1600 - $1800 USD per month",
      description:
        "Aligned Outsource, Inc. is seeking a qualified Accounting Manager - CPA for its client, a U.S. Based Accounting Firm Position Overview: We are seeking an experienced and highly skilled Accounting Manager to join our Tax Department. This position involves managing…",
      tags: [""],
      employmentType: "Full Time",
      createdAt: { _seconds: 1760331001, _nanoseconds: 696000000 },
    },
    {
      title: "Construction VA",
      url: "/jobseekers/job/Construction-VA-1481902",
      posterName: "Camila Davis",
      postedDate: "Oct 12, 2025",
      salary: "Php 40,000 - Php 65,000",
      description:
        "MISSION (why this role exists) -Own trade partner coverage so TriArc receives at least three qualified, apples-to-apples bids for every trade package on every pursuit and project—improving pricing confidence, schedule reliability, and award speed while living our five core values.…",
      tags: [
        "Construction Project Manager",
        "Customer Service",
        "Appointment Setting",
      ],
      employmentType: "Full Time",
      createdAt: { _seconds: 1760331001, _nanoseconds: 697000000 },
    },
  ];

  const result = getOnlyTodayJobsV1(jobs);

  console.log("🧪 Function result:", result);

  // Restore Date.now()
  global.Date.now = realDateNow;
});
