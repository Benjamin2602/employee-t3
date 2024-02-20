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

const EmpTable = async () => {
    const employees = await api.employee.findMany.query();
  return (
    <div>
            <Table className="mt-3 border">
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
                <TableCell>{employee.dob}</TableCell>
              <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.Salary}</TableCell>
              
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </div>
  )
}

export default EmpTable
