import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataItem {
  name: string;
  Estado: number;
  "Média região": number;
}

interface ComparisonChartProps {
  data: ChartDataItem[];
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
  return (
    <div className="bg-[#1a1a3e] rounded-lg p-3">
      <div className="text-xs text-[#94a3b8] mb-3">
        Estado vs Média da Região
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} layout="vertical" barSize={12}>
          <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f0f23",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px" }}
            iconType="circle"
            iconSize={8}
          />
          <Bar dataKey="Estado" fill="#3B82F6" radius={[0, 4, 4, 0]} />
          <Bar
            dataKey="Média região"
            fill="#64748B"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
