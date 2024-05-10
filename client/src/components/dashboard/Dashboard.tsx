"use client";
import { BadgeCheck, HeartHandshake } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/store/AuthStore";
import toast from "react-hot-toast";
// import {
//   ProfileData,
//   EmployeeApplicationData,
// } from "@/types/EmployeeDashboard";
import { useRouter } from "next/navigation";

// type DashboardDetailsData = {
//   applications: ApplicationData[];
//   likedApplications: ProfileData[];
//   assignedReferrals: EmployeeApplicationData[];
//   matchedReferrals: EmployeeApplicationData[];
//   completedReferrals: EmployeeApplicationData[];
// };

type Props = {};

function EmployeeDashboard({}: Props) {
  const { token, userData } = useAuthStore((state) => state);
  const router = useRouter();

  // const [dashboardDetails, setDashboardDetails] =
  //   useState<DashboardDetailsData>({
  //     applications: [],
  //     likedApplications: [],
  //     assignedReferrals: [],
  //     matchedReferrals: [],
  //     completedReferrals: [],
  //   });
  const [dashboardDetails, setDashboardDetails] = useState<any>({})

  const [endPoint, setEndPoint] = useState<
    | "applications"
    | "likedApplications"
    | "assignedReferrals"
    | "matchedReferrals"
    | "completedReferrals"
  >("applications");

  const endPointMapping = {
    applications: `/referrals/${userData.currentCompany}`,
    likedApplications: "/referrals/getLikedReferralRequest",
    assignedReferrals: "/referrals/getAssignedReferralRequest",
    matchedReferrals: "/referrals/getMatchedReferralRequest",
    completedReferrals: "/referrals/getCompletedReferralRequest",
  };

  useEffect(() => {
    if (token === null || token === undefined) {
      router.push("/login");
      return;
    }

    const fetchTabData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}${endPointMapping[endPoint]}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setDashboardDetails((prevState: any) => ({
            ...prevState,
            [endPoint]:
              endPoint === "applications"
                ? result.referralRequests
                : result.data,
          }));
        } else {
          throw new Error(result.message);
        }

        console.log("result =>", result);
      } catch (error: any) {
        toast.error("something went wrong while fetching the data");
      }
    };

    // fetchTabData();
  }, [endPoint, token]);

  const modifyEndpoint = (value: string) => {
    setEndPoint(value as typeof endPoint);
  };

  const applications = dashboardDetails.applications?.map(() => (
    <h1>hello world</h1>
  ));

  return (
    <div className="font-poppins max-w-7xl min-h-screen mx-auto flex flex-col gap-7">
      <section className="w-full p-4 flex items-center gap-4">
        <div className="text-white p-4 w-1/2 max-w-[350px] rounded-2xl flex flex-col gap-2 items-start bg-gray-500">
          <div className="flex flex-row gap-4 items-center">
            <div className="bg-red-100 rounded-full p-2">
              <HeartHandshake className="text-red-500 w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold">
              5
            </h2>
          </div>
          <p>Orders Received</p>
        </div>
        <div className="text-white p-4 w-1/2 max-w-[350px] rounded-2xl flex flex-col gap-2 items-start bg-gray-500">
          <div className="flex flex-row gap-4 items-center">
            <div className="bg-green-200 rounded-full p-2">
              <BadgeCheck className="text-green-600 w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold">
              5
            </h2>
          </div>
          <p>Orders Accepted</p>
        </div>
      </section>

      <section className="w-full p-4">
        <Tabs
          onValueChange={modifyEndpoint}
          defaultValue="ordersReceived"
          className="w-full"
        >
          <TabsList className="bg-transparent p-0 relative">
            <TabsTrigger value="ordersReceived">
              Orders received
            </TabsTrigger>
            <TabsTrigger value="ordersAccepted">
              Orders accepted
            </TabsTrigger>
          </TabsList>

          <div>
            <TabsContent value="ordersReceived">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardDetails.applications?.length > 0 ? (
                  <h1>render orders data</h1>
                ) : (
                  <h2 className="mt-10 col-span-full font-bold text-center text-white">
                    No Data
                  </h2>
                )}
              </div>
            </TabsContent>
            <TabsContent value="ordersAccepted">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardDetails.likedApplications?.length > 0 ? (
                  <h1>render orders data</h1>
                ) : (
                  <h2 className="col-span-full first:font-bold text-center text-gray-800">
                    No Data
                  </h2>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default EmployeeDashboard;
