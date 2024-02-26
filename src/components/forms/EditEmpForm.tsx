"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

import React, { useEffect, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const UpdateForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const formSchema = z.object({
    name: z.string().min(1).max(30),
    empId: z.string().min(1).max(20),
    department: z.string().min(1).max(40),
    dob: z.string(),
    gender: z.string(),
    designation: z.string(),
    Salary: z.string().min(1).max(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      empId: "",
      department: "",
      dob: "",
      gender: "male",
      designation: "",
      Salary: "",
    },
  });

  const { data: employee } = api.employee.getEmployee.useQuery({
    id: parseInt(params.id),
  });

  useEffect(() => {
    if (employee) {
      form.setValue("name", employee.name);
      form.setValue("empId", employee.empId.toString());
      form.setValue("department", employee.department);
      form.setValue("dob", employee.dob.toLocaleString());
      form.setValue("gender", employee.gender);
      form.setValue("designation", employee.designation);
      form.setValue("Salary", employee.Salary.toString());
    }
  }, [employee , form]);

  const updateEmployeess = api.employee.updateEmployee.useMutation({
    onSuccess: () => {
      router.push("/display");
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await updateEmployeess.mutateAsync({
        id: parseInt(params.id),
        name: data.name,
        empId: parseInt(data.empId),
        department: data.department,
        dob: new Date(data.dob),
        gender: data.gender,
        designation: data.designation,
        Salary: parseInt(data.Salary),
      });
      // toast.success("Employee detail successfully added!");
      router.push("/display");
    });
  }
  return (
    <div className="mx-auto w-1/2">
      <h1 className="m-2 py-4 text-4xl">Employee Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="employee name" {...field} />
                </FormControl>
                <FormDescription>
                  Your full name as per the company records
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="empId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormDescription>
                  specify your employee id, it should be unique
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="department" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select the category</SelectLabel>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Testing">Testing</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>specify your department</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Date of birth" {...field} />
                </FormControl>
                <FormDescription>specify your date of birth</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="r1" />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="r2" />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Specify your Gender</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="enter your designation" {...field} />
                </FormControl>
                <FormDescription>Specify your Designation</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input placeholder="Salary" {...field} />
                </FormControl>
                <FormDescription>Specify your Salary</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit">Submit</Button>
            <Button className="">
              <Link href="/display">Employee Detail</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateForm;
