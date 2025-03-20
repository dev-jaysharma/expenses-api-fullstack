import { Hono } from "hono";
import { expense } from "../types/types.zod";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const postExpense = expense.omit({ id: true });

//simple que why to do this
// type Expense = {
//   [key: string]: {
//     title: string;
//     amount: number;
//   };
// };
type Expense = z.infer<typeof expense>;

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "Food",
    amount: 100,
  },
  {
    id: 3,
    title: "Internet",
    amount: 50,
  },
];

const expenses = new Hono()
  .get("/", (c) => {
    return c.json([...fakeExpenses]);
  })
  .post("/", zValidator("json", postExpense), (c) => {
    const data = c.req.valid("json");
    const expenseData = postExpense.parse(data);
    // just for demo purposes, we are adding the new expense to the fakeExpenses array
    const newExpense = { id: fakeExpenses.length + 1, ...expenseData };
    fakeExpenses.push(newExpense);
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
