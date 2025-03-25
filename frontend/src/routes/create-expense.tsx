import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import api from "@/lib/apiCon";

export const Route = createFileRoute("/create-expense")({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const res = await api.expenses.create.$post({json : value})
      if (!res.ok) {
        throw new Error("error posting the data");
      }
      console.log(value);
    },
  });
  return (
    <main className="flex items-center justify-center h-[90vh]">
      <Card className="w-[20vw] m-auto">
        <CardHeader className="flex flex-col  items-center">
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Add a Expense !!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex items-center justify-center flex-col gap-4"
          >
            <div className="gap-2 flex flex-col">
            <form.Field
                name="title"
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Title:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="text"
                      className="w-full"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div className="gap-2 flex flex-col">
              <form.Field
                name="amount"
                children={(field) => (
                    <>
                    <Label htmlFor={field.name}>Amount:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                    <FieldInfo field={field} />
                    </>
                )}
              />
            </div>
            <CardFooter className="flex items-center  justify-center">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Submit'}
                  </Button>
                )}
              />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
