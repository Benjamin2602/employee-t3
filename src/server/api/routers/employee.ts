import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db.employee.findMany({
      orderBy: { id: "asc" },
    });
    return employees;
  }),

  createEmployee: publicProcedure
    .input(
      z.object({
        name: z.string(),
        empId: z.number(),
        department: z.string(),
        dob: z.date(),
        gender: z.string(),
        designation: z.string(),
        Salary: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const employees = await ctx.db.employee.create({
        data: {
          name: input.name,
          empId: input.empId,
          department: input.department,
          dob: input.dob,
          gender: input.gender,
          designation: input.designation,
          Salary: input.Salary,
        },
      });
      return employees;
    }),
  //update employee
  updateEmployee: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        empId: z.number(),
        department: z.string(),
        dob: z.date(),
        gender: z.string(),
        designation: z.string(),
        Salary: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const editEmp = await ctx.db.employee.update({
        where: { id: input.id },
        data: {
          name: input.name,
          empId: input.empId,
          department: input.department,
          dob: input.dob,
          gender: input.gender,
          designation: input.designation,
          Salary: input.Salary,
        },
      });
      return editEmp;
    }),

  // default values in update form
  getEmployee: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const employee = await ctx.db.employee.findUnique({
        where: { id: input.id },
      });
      return employee;
    }),
});
