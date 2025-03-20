import { Hono } from "hono";
import { expense } from "../types/types.zod";
import { zValidator } from "@hono/zod-validator";

type Expense = {
  [key: string]: {
    title: string;
    amount: number;
  };
};

const fakeExpenses : Expense = {
    exp1: { title: "Groceries", amount: 85.50 },
    exp2: { title: "Gas", amount: 45.75 },
    exp3: { title: "Internet", amount: 69.99 }
} 

const expenses = new Hono()
  .get("/", (c) => {
    return c.json( {...fakeExpenses});
  })
  .post("/", zValidator("json", expense), (c) => {
    const data = c.req.valid("json");
    const expenseData = expense.parse(data);
    // just for demo purposes, we are adding the new expense to the fakeExpenses object will be commented out in the future
    const newId = `exp${Object.keys(fakeExpenses).length + 1}`;
    fakeExpenses[newId] = { ...expenseData };
    //
    return c.json({
      message: "expense created",
      title: expenseData.title,
      amount: expenseData.amount,
    });
  });
// .put
// .delete

export { expenses };
