import Container from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import type { FC } from "react";

type JobsPageProps = {};

const JobsPage: FC<JobsPageProps> = () => {
  return (
    <>
      <SiteHeader title="Jobs" />

      <Container className="flex flex-1 flex-col">xxx</Container>
    </>
  );
};

export default JobsPage;
