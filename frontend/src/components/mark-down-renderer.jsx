import React from "react";
import ReactMarkdown from "react-markdown";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, ArcElement, LinearScale, CategoryScale, Tooltip, Legend);

const MarkdownRenderer = ({ markdown }) => (
    <ReactMarkdown
        components={{
            code({ className, children, ...props }) {
                if (className?.includes("language-json")) {
                    try {
                        return <ElectionAnalysis data={JSON.parse(children)} />;
                    } catch {
                        return <pre {...props} className={className}><code>{children}</code></pre>;
                    }
                }
                return <pre {...props} className={className}><code>{children}</code></pre>;
            },
        }}
    >
        {markdown}
    </ReactMarkdown>
);

const ElectionAnalysis = ({ data }) => {
    const safeData = Array.isArray(data) ? data : [data];
    return (
        <div>
            <h2>Election Analysis</h2>
            {safeData.map((item, index) => (
                <div key={index}>
                    <p style={{ whiteSpace: 'normal' }}>{item.summary}</p>
                    <DynamicChart chartData={item} />
                </div>
            ))}
        </div>
    );
};

const DynamicChart = ({ chartData }) => {
    const data = {
        labels: chartData.data.map(item => item.candidate),
        datasets: [{
            label: chartData.title || "Election Data",
            data: chartData.data.map(item => parseFloat(item.percentage ?? item.votes) || 0),
            backgroundColor: chartData.colors || getRandomColors(chartData.data.length),
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
    };

    const chartStyle = { width: "400px", height: "250px" };

    switch (chartData.chart_type.toLowerCase()) {
        case "bar":
            return <div style={chartStyle}><Bar data={data} options={options} /></div>;
        case "pie":
            return <div style={chartStyle}><Pie data={data} options={options} /></div>;
        default:
            return <p>Unsupported chart type: {chartData.chart_type}</p>;
    }
};

const getRandomColors = (count) =>
    Array.from({ length: count }, () => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`);

export default MarkdownRenderer;