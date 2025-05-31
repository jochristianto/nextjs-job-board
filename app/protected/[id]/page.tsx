import { redirect } from "next/navigation";
import type { FC } from "react";

type JobPageProps = {};

const JobPage: FC<JobPageProps> = () => {
  redirect("/");
};

export default JobPage;
