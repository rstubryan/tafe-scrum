"use client";

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
import { ResponseProps } from "@/api/base/global-type";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
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

  const handleDeleteUser = (id: number) => {
    if (id) {
      deleteUser(id.toString());
    }
  };

  if (isLoading) {
    return <TabProfileSkeleton type="loading" />;
  }

  if (isError || !data) {
    return <TabProfileSkeleton type="error" />;
  }

  const users = (data as ResponseProps<UserProps[]>) || [];

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
              <TableHead>Roles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {users.map((user: UserProps) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {user.photo ? (
                      <AvatarImage
                        src={user.photo}
                        alt={user.full_name_display}
                      />
                    ) : (
                      <AvatarFallback style={{ backgroundColor: user.color }}>
                        {getInitials(user.full_name_display)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{user.full_name_display}</span>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.roles?.map((role: string) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <Badge variant={user.is_active ? "success" : "destructive"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{user.theme || "Default"}</TableCell>
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
      </CardContent>
    </Card>
  );
}
