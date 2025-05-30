import { DataTable } from "@/app/protected/data-table";
import dataTableData from "@/app/protected/data.json";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={dataTableData} />
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-12">
          <div className="w-full">
            <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
              <InfoIcon size="16" strokeWidth={2} />
              This is a protected page that you can only see as an authenticated user
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <h2 className="font-bold text-2xl mb-4">Your user details</h2>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
              {JSON.stringify(data.user, null, 2)}
            </pre>
          </div>
          <div>
            <h2 className="font-bold text-2xl mb-4">Next steps</h2>
            <FetchDataSteps />
          </div>
        </div>
      </div>
    </>
  );
}
