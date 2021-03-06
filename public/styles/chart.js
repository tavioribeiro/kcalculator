import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from `chart.js`

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

export default Chart = new Chart(ctx, {
    type: 'line',
    // data: ...
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Chart Title'
            }
        },
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    }
})
