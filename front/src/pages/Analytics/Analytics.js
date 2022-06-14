import { useMemo } from 'react'
import { mean, round, sortBy } from 'lodash'
import { StringParam, withDefault } from 'use-query-params'
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

import useFiltering from '../../utils/useFiltering'
import { SurveysEnum } from '../../surveys/surveys'
import Chart from 'react-apexcharts'

export const useAnalyticsFiltering = () => {
  return useFiltering({
    params: {
      test: withDefault(StringParam, 'elers'),
    },
  })
}

const AllTests = Object.entries(SurveysEnum).map(([key, survey]) => ({
  key,
  name: survey.shortName,
  color: survey.color,
}))

export default function Analytics({ data }) {
  const theme = useTheme()

  const [{ test }, updateFilters] = useAnalyticsFiltering()

  const mappedData = useMemo(() => {
    if (!data) return

    const sortedData = sortBy(data, 'year').reverse()

    const avg1 = SurveysEnum[test].getValue(sortedData[3].value, 2)
    const avg2 = SurveysEnum[test].getValue(sortedData[2].value, 2)
    const avg3 = SurveysEnum[test].getValue(sortedData[1].value, 2)
    const avg4 = SurveysEnum[test].getValue(sortedData[0].value, 2)

    return {
      avg: [avg1, avg2, avg3, avg4],
      grow1: [0, (avg2 / avg1) * 100, (avg3 / avg2) * 100, (avg4 / avg3) * 100],
      grow2: [0, (avg2 / avg1) * 100 - 100, (avg3 / avg2) * 100 - 100, (avg4 / avg3) * 100 - 100],
      grow3: [0, avg2 - avg1, avg3 - avg2, avg4 - avg3],
    }
  }, [data, test])

  const { series, categories } = useMemo(() => {
    if (!mappedData) return { series: [], categories: [] }

    return {
      categories: ['1 курс', '2 курс', '3 курс', '4 курс'],
      series: [
        { data: mappedData.avg.map(v => round(v, 2)), name: 'Среднее значение', color: '#4CAF50' },
        { data: mappedData.grow1.map(v => round(v, 2)), name: 'Темп роста', color: '#d50c23' },
        { data: mappedData.grow2.map(v => round(v, 2)), name: 'Темп прироста', color: '#0C7CD5' },
        { data: mappedData.grow3.map(v => round(v, 2)), name: 'Абсолютный прирост', color: '#ba0cd5' },
      ],
    }
  }, [mappedData])

  const options = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: series.map(item => item.color),
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: 'circle',
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      tickAmount: 10,
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {AllTests.map(item => (
          <Box key={item.name} sx={{ alignItems: 'center', display: 'flex', mr: 2 }}>
            <Checkbox checked={test === item.key} onChange={() => updateFilters({ test: item.key })} />
            <Box
              sx={{
                border: 3,
                borderColor: test === item.key ? item.color : alpha(item.color, 0.4),
                borderRadius: '50%',
                height: 16,
                mr: 1,
                width: 16,
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{ color: test === item.key ? 'textPrimary' : alpha(theme.palette.text.primary, 0.4) }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      {mappedData && (
        <>
          <Typography variant="body2" sx={{ mt: 2, p: 1 }}>
            Среднее значение за 4 периода: <b>{mean(mappedData.avg).toFixed(2)} %</b>
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '200px' }}>Период</TableCell>
                <TableCell align="center">1 курс</TableCell>
                <TableCell align="center">2 курс</TableCell>
                <TableCell align="center">3 курс</TableCell>
                <TableCell align="center">4 курс</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: '200px' }}>Среднее значение</TableCell>
                {mappedData.avg.map(v => (
                  <TableCell key={v} align="center">
                    {v.toFixed(2)} %
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '200px' }}>Темп роста</TableCell>
                {mappedData.grow1.map(v => (
                  <TableCell key={v} align="center">
                    {v.toFixed(2)} %
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '200px' }}>Темп прироста</TableCell>
                {mappedData.grow2.map(v => (
                  <TableCell key={v} align="center">
                    {v.toFixed(2)} %
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: '200px' }}>Абсолютный прирост</TableCell>
                {mappedData.grow3.map(v => (
                  <TableCell key={v} align="center">
                    {v.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
          <Chart type="line" height={500} series={series} options={options} />
        </>
      )}
    </Box>
  )
}
