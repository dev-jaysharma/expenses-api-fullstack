import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    async function fetchTotalAmount() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalAmount(data.total);
    }
    fetchTotalAmount();
  })
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Total Amount spent</CardTitle>
        </CardHeader>
        <CardContent
        className="flex flex-col items-center justify-center"
        >
          <CardDescription>Amount: {totalAmount}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
