import Chart from 'react-apexcharts'
import { useTheme } from '@mui/material/styles'

export const StatsChart = () => {
  const theme = useTheme()

  const chartOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: ['Мотивация', 'Культивация', 'Ликвидация', 'Дезактивация', 'Расконсервация'],
    },
    theme: {
      mode: theme.palette.mode,
    },
  }
  const chartSeries = [{ name: 'Кол-во', data: [83, 100, 40, 71, 30] }]

  return <Chart height={400} options={chartOptions} series={chartSeries} type="radar" />
}
