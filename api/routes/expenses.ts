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
    amount: 1023,
  },
  {
    id: 2,
    title: "Food",
    amount: 500,
  },
  {
    id: 3,
    title: "Internet",
    amount: 1230,
  },
];

const expenses = new Hono()
  .get("/list-expenses",  (c) => {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    return c.json([...fakeExpenses]);
  })

  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    return c.json({ total });
    })

    .get("/:id{[0-9]+}", (c) => {
    const id = parseInt(c.req.param("id"));
    const expenseById = fakeExpenses.find((expense) => expense.id === id);
    if (!expenseById) {
      return c.json({ message: "expense not found" }, 404);
    }
    return c.json(expenseById);
  })

  .post("/create", zValidator("json", postExpense), (c) => {
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
