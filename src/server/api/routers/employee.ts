import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  findMany: publicProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db.employee.findMany({});
    return employees;
  }),

  createEmployee: publicProcedure
    .input(
      z.object({
        name: z.string(),
        empId: z.number(),
        department: z.string(),
        dob: z.string(),
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
});
