import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: "#fff",
            },
        },
        tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
        },
    },
    scales: {
        y: {
            ticks: {
                color: "#ccc",
            },
            grid: {
                color: "rgba(255, 255, 255, 0.1)",
            },
        },
    },
};

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Sales",
            data: [120, 190, 300, 250, 320, 400],
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
            tension: 0.4,
            pointBorderColor: "#fff",
            pointBackgroundColor: "rgba(75,192,192,1)",
        },
    ],
};

const LineChart = () => {
    return (
        <div className="bg-[#18212d] p-6 rounded-2xl shadow-lg h-[600px] w-full">
            <Line options={options} data={data} />{" "}
        </div>
    );
};

export default LineChart;
