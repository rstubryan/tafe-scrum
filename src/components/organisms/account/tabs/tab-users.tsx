"use client";

import { useGetAllUsers } from "@/api/user/queries";
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

export default function TabUsers() {
  const { data, isLoading, isError } = useGetAllUsers();

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
