import { CategoryScale, ChartOptions, LinearScale, LineElement, PointElement } from "chart.js";
import { useEffect, useState } from "react";
import { Chart as ChartComponent } from "react-chartjs-2";
import { Chart } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const eventsApiHost = "https://events.intear.tech";
const eventsApiQuery = "query";
const wsEventsApiHost = "wss://ws-events.intear.tech";
const wsEventsApiEvents = "events";

const metrics = [
    { name: 'TPS', color: '#339966', axis: 'y-axis-2' },
    { name: 'TPB', color: '#11cc33', axis: 'y-axis-1' },
    { name: 'RPS', color: '#3333dd', axis: 'y-axis-2' },
    { name: 'RPB', color: '#7777ff', axis: 'y-axis-1' },
];

export default function TpsChart() {
    const [data, setData] = useState<any>({
        labels: [],
        datasets: metrics.map(metric => ({
            label: metric.name,
            data: [],
            borderColor: metric.color,
            tension: 0.1,
            yAxisID: metric.axis,
        }))
    });
    const [blockData, setBlockData] = useState<any[]>([]);
    const [options, setOptions] = useState<ChartOptions<'line'>>({
        responsive: true,
        animation: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const block_height = blockData[index].block_height;
                const nearblocks = "https://nearblocks.io";
                window.open(`${nearblocks}/?query=${block_height}`, '_blank');
            }
        },
        scales: {
            'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Per Block'
                }
            },
            'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Per Second'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Block Height'
                }
            }
        },
        plugins: {
            legend: {
                onClick: (evt, item, legend) => {
                    const index = legend.chart.data.datasets.findIndex(d => d.label === item.text);

                    const updatedVisibleMetrics = getVisibleMetrics();
                    if (updatedVisibleMetrics.includes(item.text)) {
                        updatedVisibleMetrics.splice(updatedVisibleMetrics.indexOf(item.text), 1);
                    } else {
                        updatedVisibleMetrics.push(item.text);
                    }
                    updateVisibleMetrics(updatedVisibleMetrics);

                    updateAxisVisibility();
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const blockIndex = context.dataIndex;
                        const block = blockData[blockIndex];
                        const value = context.parsed.y;
                        const metricName = context.dataset.label;
                        let blockTime = null;
                        let visibleMetrics = getVisibleMetrics();
                        visibleMetrics = metrics.filter(metric => visibleMetrics.includes(metric.name));
                        if (metricName == visibleMetrics[visibleMetrics.length - 1].name) {
                            const previousBlock = blockIndex > 0 ? blockData[blockIndex - 1] : null;
                            if (previousBlock) {
                                const currentTimestamp = parseInt(block.block_timestamp_nanosec) / 1e9;
                                const previousTimestamp = parseInt(previousBlock.block_timestamp_nanosec) / 1e9;
                                blockTime = currentTimestamp - previousTimestamp;
                                blockTime = blockTime.toFixed(2);
                            }
                        }
                        return blockTime
                            ? [`${metricName}: ${value}`, `Block Time: ${blockTime}s`]
                            : [`${metricName}: ${value}`];
                    }
                }
            }
        }
    });

    function getVisibleMetrics() {
        const storedMetrics = localStorage.getItem('visibleMetrics');
        if (storedMetrics) {
            return JSON.parse(storedMetrics);
        } else {
            const defaultMetrics = ['TPS'];
            updateVisibleMetrics(defaultMetrics);
            return defaultMetrics;
        }
    }

    function updateVisibleMetrics(visibleMetrics: any) {
        localStorage.setItem('visibleMetrics', JSON.stringify(visibleMetrics));
        for (let i = 0; i < data.datasets.length; i++) {
            data.datasets[i].hidden = !visibleMetrics.includes(data.datasets[i].label);
        }
        setData(data)
    }

    function updateAxisVisibility() {
        const visibleMetrics = getVisibleMetrics();
        const showPerBlock = visibleMetrics.includes('TPB') || visibleMetrics.includes('RPB');
        const showPerSecond = visibleMetrics.includes('TPS') || visibleMetrics.includes('RPS');

        options.scales!['y-axis-1']!.display = showPerBlock;
        options.scales!['y-axis-2']!.display = showPerSecond;
        setOptions(options);
    }

    useEffect(() => {
        fetchInitialData();
        const ws = connectWebSocket();
        updateVisibleMetrics(getVisibleMetrics());
        updateAxisVisibility();
        return () => ws.close();
    }, []);

    function calculateMetrics(currentBlock: any, previousBlock: any) {
        if (!previousBlock) {
            return {
                transactions: currentBlock.transaction_count,
                tps: currentBlock.transaction_count,
                receipts: currentBlock.receipt_count,
                rps: currentBlock.receipt_count
            };
        }

        const currentTimestamp = parseInt(currentBlock.block_timestamp_nanosec) / 1e9;
        const previousTimestamp = parseInt(previousBlock.block_timestamp_nanosec) / 1e9;
        const timeDiff = currentTimestamp - previousTimestamp;

        if (timeDiff <= 0) return { transactions: 0, tps: 0, receipts: 0, rps: 0 };

        const tps = currentBlock.transaction_count / timeDiff;
        const rps = currentBlock.receipt_count / timeDiff;

        return {
            transactions: currentBlock.transaction_count,
            tps: parseFloat(tps.toFixed(2)),
            receipts: currentBlock.receipt_count,
            rps: parseFloat(rps.toFixed(2))
        };
    }

    function updateChart(block: any) {
        const previousBlock = blockData.length > 0 ? blockData[blockData.length - 1] : null;

        blockData.push(block);
        if (blockData.length > 200) {
            blockData.shift();
        }
        setBlockData(blockData);

        data.labels = blockData.map(b => b.block_height);
        data.datasets[0].data = blockData.map((b, index) => calculateMetrics(b, index > 0 ? blockData[index - 1] : null).tps);
        data.datasets[1].data = blockData.map(b => b.transaction_count);
        data.datasets[2].data = blockData.map((b, index) => calculateMetrics(b, index > 0 ? blockData[index - 1] : null).rps);
        data.datasets[3].data = blockData.map(b => b.receipt_count);

        setData(data);
    }

    async function fetchInitialData() {
        const now = Date.now();
        const initialBlocks = 60;
        const response = await fetch(`${eventsApiHost}/${eventsApiQuery}/block_info?limit=${initialBlocks}&pagination_by=Newest`);
        setBlockData(await response.json().then(data => data.map((d: any) => d.event).reverse()));

        data.labels = blockData.map(b => b.block_height);
        data.datasets[0].data = blockData.map(b => b.transaction_count);
        data.datasets[1].data = blockData.map((b, index) => calculateMetrics(b, index > 0 ? blockData[index - 1] : null).tps);
        data.datasets[2].data = blockData.map(b => b.receipt_count);
        data.datasets[3].data = blockData.map((b, index) => calculateMetrics(b, index > 0 ? blockData[index - 1] : null).rps);

        setData(data);
    }

    function connectWebSocket(): WebSocket {
        const ws = new WebSocket(`${wsEventsApiHost}/${wsEventsApiEvents}/block_info`);

        ws.onopen = (event) => {
            ws.send(JSON.stringify({}))
        }

        ws.onmessage = (event) => {
            const block = JSON.parse(event.data);
            updateChart(block);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed. Reconnecting...');
            setTimeout(connectWebSocket, 5000);
        };

        return ws;
    }

    return (
        <ChartComponent type="line" data={data} options={options} />
    )
}
