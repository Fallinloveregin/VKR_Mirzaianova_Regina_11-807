import { useMemo } from 'react'
import Chart from 'react-apexcharts'
import { useTheme } from '@mui/material/styles'
import { Box, Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'

import AverageGraph from './AverageGraphContainer'
import { SurveysEnum } from '../../../surveys/surveys'

export default function UserHome({ recommendations = [], overview = {} }) {
  const zamfir = useMemo(() => {
    if (!overview.zamfir) return undefined

    const { VM, VOM, VPM } = SurveysEnum.zamfir.getValue(overview.zamfir.result)
    return [
      { label: 'Показатель внутренней мотивации', short: 'ВМ', value: VM },
      { label: 'Показатель внешней положительной мотивации', short: 'ВПМ', value: VPM },
      { label: 'Показатель внешней отрицательной мотивации', short: 'ВОМ', value: VOM },
    ]
  }, [overview])

  const iljina = useMemo(() => {
    if (!overview.iljina) return undefined

    const { knowledge, diploma, profession } = SurveysEnum.iljina.getValue(overview.iljina.result)
    return [
      { label: 'Знания', short: 'Знания', value: knowledge },
      { label: 'Профессия', short: 'Профессия', value: profession },
      { label: 'Диплом', short: 'Диплом', value: diploma },
    ]
  }, [overview])

  const combo = useMemo(() => {
    if (!overview.elers || !overview.elers2 || !overview.shubert) return undefined

    return [
      {
        label: 'Мотивация к избеганию неудач',
        short: 'Неудачи',
        value: SurveysEnum.elers.getValue(overview.elers.result),
      },
      { label: 'Мотивация к успеху', short: 'Успех', value: SurveysEnum.elers2.getValue(overview.elers2.result) },
      {
        label: 'Степень готовности к риску',
        short: 'Риск',
        value: SurveysEnum.shubert.getValue(overview.shubert.result),
      },
    ]
  }, [overview])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <AverageGraph />
      <Grid container spacing={2} justifyContent="center">
        {!zamfir && !iljina && !combo && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
            <Typography variant="h5">Пожалуйста пройдите тесты для сбора аналитики</Typography>
          </Box>
        )}
        {zamfir && (
          <Grid item sm={12} md={6} lg={4}>
            <RadarChart title="Мотивация профессиональной деятельности" data={zamfir} />
          </Grid>
        )}
        {iljina && (
          <Grid item sm={12} md={6} lg={4}>
            <RadarChart title="Мотивация обучения в вузе" data={iljina} />
          </Grid>
        )}
        {combo && (
          <Grid item sm={12} md={6} lg={4}>
            <RadarChart title="Мотивация к успеху, избеганию неудач и степени готовности к риску" data={combo} />
          </Grid>
        )}
      </Grid>
      {recommendations.length && (
        <Box sx={{ py: 3 }}>
          <Typography variant="h6">Рекомендации:</Typography>
          <Typography variant="body2">{recommendations.join(', ')}</Typography>
        </Box>
      )}
    </Box>
  )
}

export const RadarChart = ({ title, data }) => {
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
      categories: data.map(i => i.short),
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 1,
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 2,
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  }

  const chartSeries = [{ name: 'Баллы', data: data.map(r => r.value) }]

  return (
    <Box>
      <Typography align="center" variant="h6" color="textPrimary" sx={{ minHeight: 50 }}>
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Chart height={400} options={chartOptions} series={chartSeries} type="radar" />
      <Divider />
      <Table>
        <TableBody>
          {data.map(({ label, value }) => (
            <TableRow key={label} sx={{ height: 80 }}>
              <TableCell>
                <Typography variant="subtitle2">{label}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="body2">
                  {value}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
