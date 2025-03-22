import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import api from "@/lib/apiCon";
  import { useQuery } from "@tanstack/react-query";
  
  function Index() {
    const { isPending, error, data } = useQuery({
      queryKey: ["get-total-expense"],
      queryFn: getTotalExpense,
    });
    async function getTotalExpense() {
      const res = await api.expenses["total-spent"].$get();
      const data = await res.json();
      if (!res.ok) {
        throw new Error("error getting the data");
      }
      return data;
    }
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Total Amount spent</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <CardDescription>Amount: { isPending ? "..." : data.total }</CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }