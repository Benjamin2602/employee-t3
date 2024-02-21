import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/trpc/server";
import { Button } from "../ui/button";
import Link from "next/link";

const EmpTable = async () => {
  const employees = await api.employee.findMany.query();
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
