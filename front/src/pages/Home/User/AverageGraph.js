import { useMemo } from 'react'
import Chart from 'react-apexcharts'
import { DelimitedArrayParam, withDefault } from 'use-query-params'

import { Box, Checkbox, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

import useFiltering from '../../../utils/useFiltering'
import { SurveysEnum } from '../../../surveys/surveys'

export const useGraphFiltering = () => {
  return useFiltering({
    params: {
      tests: withDefault(DelimitedArrayParam, []),
    },
  })
}

const AllTests = Object.entries(SurveysEnum).map(([key, survey]) => ({
  key,
  name: survey.shortName,
  color: survey.color,
}))

export const AverageGraph = ({ data }) => {
  const theme = useTheme()
  const [{ tests }, updateFilters] = useGraphFiltering()

  const handleChange = (event, name) => {
    if (!event.target.checked) {
      updateFilters({ tests: tests.filter(item => item !== name) })
    } else {
      updateFilters({ tests: [...tests, name] })
    }
  }

  const { series, categories } = useMemo(() => {
    if (!data) return { series: [], categories: [] }

    const categories = {}

    Object.values(data).forEach(years => {
      Object.keys(years).forEach(year => {
        categories[year] = undefined
      })
    })

    const result = {}
    Object.entries(data).forEach(([test, years]) => {
      result[test] = Object.keys(categories).reduce((acc, year) => [...acc, years[year] ?? undefined], [])
    })

    const series = []
    Object.entries(result).forEach(([test, values]) => {
      const { shortName: name, color, getValue } = SurveysEnum[test]
      const valuesMapped = values.map(getValue)

      if (test === 'zamfir') {
        series.push({ data: valuesMapped.map(v => v.VM), color, name: `${name} (ВМ)` })
        series.push({ data: valuesMapped.map(v => v.VPM), color, name: `${name} (ВПМ)` })
        series.push({ data: valuesMapped.map(v => v.VOM), color, name: `${name} (ВОМ)` })
      } else if (test === 'iljina') {
        series.push({ data: valuesMapped.map(v => v.knowledge), color, name: `${name} (Знания)` })
        series.push({ data: valuesMapped.map(v => v.profession), color, name: `${name} (Профессия)` })
        series.push({ data: valuesMapped.map(v => v.diploma), color, name: `${name} (Диплом)` })
      } else {
        series.push({ data: valuesMapped, color, name })
      }
    })
    return { series, categories: Object.keys(categories) }
  }, [data])

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
      min: 0,
      max: 100,
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
            <Checkbox
              checked={tests.some(visibleItem => visibleItem === item.key)}
              onChange={event => handleChange(event, item.key)}
            />
            <Box
              sx={{
                border: 3,
                borderColor: tests.some(visibleItem => visibleItem === item.key) ? item.color : alpha(item.color, 0.4),
                borderRadius: '50%',
                height: 16,
                mr: 1,
                width: 16,
              }}
            />
            <Typography
              sx={{
                color: tests.some(visibleItem => visibleItem === item.key)
                  ? 'textPrimary'
                  : alpha(theme.palette.text.primary, 0.4),
              }}
              variant="subtitle2"
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Chart type="line" height={500} series={series} options={options} />
    </Box>
  )
}
