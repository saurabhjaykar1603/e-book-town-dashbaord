import { useForm } from "react-hook-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../api/api";
import { Loader } from "lucide-react";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  coverImage: z.instanceof(FileList).refine(
    (file) => {
      return file.length === 1;
    },
    {
      message: "Please select a cover image.",
    }
  ),

  file: z.instanceof(FileList).refine(
    (file) => {
      return file.length === 1;
    },
    {
      message: "File is required.",
    }
  ),
});

function CreateBook() {
  const { toast } = useToast();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({
        title: data.message,
      });
      navigate("/dashboard/books");
      console.log("book created successfully", data.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("description", values.description);
    formData.append("coverImage", values.coverImage[0]);
    formData.append("file", values.file[0]);
    mutation.mutate(formData);
    console.log(values);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">
                    Books{" "}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-x-5">
              <Link to={"/dashboard/books"}>
                <Button variant={"outline"}>
                  <span className="ml-1">Cancel</span>
                </Button>
              </Link>

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <Loader
                    className={cn(mutation.isPending ? "animate-spin" : "")}
                  />
                ) : (
                  <span className="ml-1">Submit</span>
                )}
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create a new book</CardTitle>
              <CardDescription>
                Fill out the form bellow to create new book
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="title"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="genre"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-32" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="w-full"
                          {...coverImageRef}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Book Pdf File</FormLabel>
                      <FormControl>
                        <Input type="file" className="w-full" {...fileRef} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
}

export default CreateBook;
