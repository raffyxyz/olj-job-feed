import * as cheerio from "cheerio";

export type JobType = {
  title: string;
  url: string | undefined;
  posterName: string;
  postedDate: string;
  salary: string;
  description: string;
  tags: string[];
  employmentType: string;
};

export const parseJobPosts = (htmlContent: string) => {
  const jobs: JobType[] = [];

  const $ = cheerio.load(htmlContent);

  $(".results .jobpost-cat-box").each((index, element) => {
    const $job = $(element);

    // Extract job title (remove the badge text)
    const titleElement = $job.find("h4.fs-16.fw-700");
    const fullTitle = titleElement.text().trim();
    const badgeText = titleElement.find(".badge").text().trim();
    const jobTitle = fullTitle.replace(badgeText, "").trim();

    // Extract job URL
    const jobUrl = $job.find("a").first().attr("href");

    // Extract poster name and date
    const posterInfo = $job.find("p.fs-13.mb-0").text().trim();
    const posterMatch = posterInfo.match(/^([^•]+)•/);
    const posterName = posterMatch ? posterMatch[1].trim() : "";

    const dateMatch = posterInfo.match(/Posted on (.+)$/);
    const postedDate = dateMatch ? dateMatch[1].trim() : "";

    // Extract salary
    const salary = $job.find("dd.col").text().trim();

    // Extract job description
    const description = $job
      .find(".desc a")
      .first()
      .text()
      .trim()
      .replace(/\s+/g, " ");

    // Extract job tags
    const tags: string[] = [];
    $job.find(".job-tag .badge").each((i, tag) => {
      tags.push($(tag).text().trim());
    });

    // Extract experience level badge
    const employmentType = $job.find("h4 .badge").text().trim();

    // Create job object
    const jobData = {
      title: jobTitle,
      url: jobUrl,
      posterName: posterName,
      postedDate: postedDate,
      salary: salary,
      description: description,
      tags: tags,
      employmentType: employmentType,
    };

    jobs.push(jobData);
  });

  return jobs;
};
