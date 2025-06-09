"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { CHART_DATA } from "@/lib/constants"

export function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <LineChart data={CHART_DATA.line}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <YAxis 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <BarChart data={CHART_DATA.bar}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <YAxis 
          className="text-muted-foreground"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar 
          dataKey="value" 
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
      <PieChart>        <Pie
          data={CHART_DATA.pie}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          className="sm:inner-radius-[60px] sm:outer-radius-[100px]"
        >
          {CHART_DATA.pie.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Memoize chart components for better performance
export const MemoizedLineChart = React.memo(LineChartComponent)
export const MemoizedBarChart = React.memo(BarChartComponent)  
export const MemoizedPieChart = React.memo(PieChartComponent)
