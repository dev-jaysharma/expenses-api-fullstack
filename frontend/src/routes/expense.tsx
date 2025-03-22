import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/apiCon";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expense")({
  component: Expense,
});

function Expense() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-expense"],
    queryFn: getAllExpense,
  });

  async function getAllExpense() {
    const res = await api.expenses["list-expenses"].$get();
    const data = await res.json();
    if (!res.ok) {
      throw new Error("error getting the data");
    }
    return data;
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <main className="w-[50vw] mx-auto h-[90vh] flex flex-col items-center justify-center">
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell className="font-medium">
                  {" "}
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  {" "}
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
              </TableRow>
            ) : (
              data.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">
                    ${expense.amount}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
