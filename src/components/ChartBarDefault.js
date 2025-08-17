"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { getEmployees } from "@/lib/action/employeeAction" 

const generateEmployeeChartData = (employees) => {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  const monthCounts = new Array(12).fill(0)

  employees.forEach((emp) => {
    if (emp.createdAt) {
      const date = new Date(emp.createdAt)
      const monthIndex = date.getMonth()
      monthCounts[monthIndex] += 1
    }
  })

  return months.map((month, index) => ({
    month,
    employees: monthCounts[index],
  }))
}


const chartConfig = {
  employees: {
    label: "Employees",
    color: "#4F46E5", 
  },
}

export function ChartBarDefault() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployees()
        if (response.success) {
          const data = generateEmployeeChartData(response.data)
          setChartData(data)
        }
      } catch (err) {
        console.error("Error fetching employees for chart:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card className="w-[524px] h-[350px]">
      <CardHeader>
        <CardTitle>Employee Activity</CardTitle>
        <CardDescription>Employees created per month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="employees" fill="var(--color-employees)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
