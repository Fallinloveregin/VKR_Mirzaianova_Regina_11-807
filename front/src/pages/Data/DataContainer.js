import { useCallback, useEffect } from 'react'
import { random } from 'lodash'
import useAxios from 'axios-hooks'
import dayjs from 'dayjs'

export default function DataContainer() {
  const [{}, signup] = useAxios({ method: 'POST', url: '/auth/signup' }, { manual: true })
  const [{}, signin] = useAxios({ method: 'POST', url: '/auth/signin' }, { manual: true })
  const [{}, sendResult] = useAxios({ method: 'POST', url: '/test/result' }, { manual: true })

  const startMigration = useCallback(async () => {
    // year
    for (let y = 0; y <= 1; y++) {
      // group
      for (let g = 1; g <= 4; g++) {
        const studentsCount = random(10, 20)
        // student
        for (let s = 1; s <= studentsCount; s++) {
          const group = `11-${8 + y}0${g}`
          const name = `Студент ${group} ${s}`
          const username = `student_${group}_${s}`
          const password = '12345678'
          const birth = dayjs.between(`${1999 + y}-01-01`, `${2001 + y}-01-01`).format('YYYY-MM-DD')
          const sex = random(0, 1) ? 'М' : 'Ж'

          await signup({ data: { username, name, group, sex, birth, password } })
          const token = (await signin({ data: { username, password } })).data.accessToken

          for (let ty = 0; ty < 4; ty++) {
            await sendResult({
              headers: { 'x-access-token': token },
              data: {
                name: 'elers2',
                result: random((4 - ty) * 2, 32),
                duration: random(30, 300),
                dateTime: dayjs.between(`${2022 - ty}-05-01`, `${2022 - ty}-06-01`),
              },
            })
            await sendResult({
              headers: { 'x-access-token': token },
              data: {
                name: 'elers',
                result: random((4 - ty) * 2, 30),
                duration: random(30, 300),
                dateTime: dayjs.between(`${2022 - ty}-05-01`, `${2022 - ty}-06-01`),
              },
            })
            await sendResult({
              headers: { 'x-access-token': token },
              data: {
                name: 'shubert',
                result: random(-50 + (4 - ty) * 2, 50),
                duration: random(30, 300),
                dateTime: dayjs.between(`${2022 - ty}-05-01`, `${2022 - ty}-06-01`),
              },
            })
            await sendResult({
              headers: { 'x-access-token': token },
              data: {
                name: 'zamfir',
                result: {
                  VM: random((4 - ty) / 2, 5, true),
                  VPM: random((4 - ty) / 2, 5, true),
                  VOM: random((4 - ty) / 2, 5, true),
                },
                duration: random(30, 300),
                dateTime: dayjs.between(`${2022 - ty}-05-01`, `${2022 - ty}-06-01`),
              },
            })
            await sendResult({
              headers: { 'x-access-token': token },
              data: {
                name: 'iljina',
                result: {
                  knowledge: random(4 - ty, 12.6, true),
                  profession: random(4 - ty, 10, true),
                  diploma: random(4 - ty, 10, true),
                },
                duration: random(30, 300),
                dateTime: dayjs.between(`${2022 - ty}-05-01`, `${2022 - ty}-06-01`),
              },
            })
          }
        }
      }
    }
  }, [sendResult, signin, signup])

  useEffect(() => {
    startMigration()
  }, [startMigration])

  return null
}
