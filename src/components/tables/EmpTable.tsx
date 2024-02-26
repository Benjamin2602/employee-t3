"use client"
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EmpTable = () => {
  const utils = api.useUtils();
  const { data: employees } = api.employee.findMany.useQuery();
  const router = useRouter();
  const { mutate: deleteEmployee } = api.employee.deleteEmployee.useMutation({
    onSuccess: async () => {
      await utils.employee.invalidate();
      router.refresh();
    },
  });
  function onClicks(id: number) {
    deleteEmployee({ id });
    // router.push("/detail");
  }

  return (
    <div>
      <Table className="mx-auto mt-3 w-1/2 border">
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>empId</TableHead>
            <TableHead>department</TableHead>
            <TableHead>dob</TableHead>
            <TableHead>gender</TableHead>
            <TableHead>designation</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {employees?.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.empId}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.dob.toLocaleDateString()}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.Salary}</TableCell>
              <TableCell>
                <Link href={`/update/${employee.id}`}>
                  <Button>Update</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button onClick={() => onClicks(employee.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center">
        <Button className="mt-2">
          <Link href="/">Add Employee</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmpTable;
