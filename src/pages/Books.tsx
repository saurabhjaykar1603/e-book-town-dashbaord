import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { BadgePlus, MoreHorizontal } from "lucide-react";
import { Book } from "../types/types";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "react-router-dom";

function BooksPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10000,
  });

  console.log("data", data?.data);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={"/dashboard/books/create"}>
          <Button>
            <BadgePlus size={20} /> <span className="ml-1"> Add Book</span>
          </Button>
        </Link>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Manage your Book and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Author Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <p className="sr-ony">Actions</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                [1, 2, 4].map((_item, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="w-[64px] h-[64px] rounded-md" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-8 w-[90px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[60px] rounded-lg" />
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-8 w-[90px]" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-8 w-[90px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[50px]" />
                    </TableCell>
                  </TableRow>
                ))}

              {data?.data?.map((book: Book) => {
                return (
                  <TableRow key={book._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={book.coverImage}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {book?.title || "NA"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{book?.genre || "NA"}</Badge>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {book?.author?.name || "NA"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {book?.createdAt?.slice(0, 10) || "NA"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of{" "}
            <strong>{data?.data?.length}</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BooksPage;
