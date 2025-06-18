"use client";

import { useState, useEffect } from "react";
import { useGetAllUsers } from "@/api/user/queries";
import { useDeleteUsers } from "@/api/user/mutation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { TabProfileSkeleton } from "@/components/atoms/skeleton/account/form/skeleton-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProps } from "@/api/user/type";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TabUsers() {
  const { data, isLoading, isError } = useGetAllUsers();
  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteUser = (id: number) => {
    if (id) {
      deleteUser(id.toString());
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentPage(1);
    }
  }, [data]);

  if (isLoading) {
    return <TabProfileSkeleton type="loading" />;
  }

  if (isError || !data) {
    return <TabProfileSkeleton type="error" />;
  }

  const usersArray = Array.isArray(data) ? data : [];

  const totalItems = usersArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedUsers = usersArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user: UserProps) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {user.photo ? (
                      <AvatarImage
                        src={user.photo}
                        alt={user.full_name_display}
                      />
                    ) : (
                      <AvatarFallback
                        style={{ backgroundColor: user.color }}
                        className={"text-secondary"}
                      >
                        {getInitials(user.full_name_display)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.full_name_display}</span>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? "outline" : "destructive"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeletingUser}
                      >
                        {isDeletingUser ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete User Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete{" "}
                          <b>{user?.username}</b>? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user.id!)}
                        >
                          Delete User
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination component */}
        {totalItems > itemsPerPage && (
          <div className="mt-5">
            <PaginationLayout
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
