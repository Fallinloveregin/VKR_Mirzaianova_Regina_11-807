import React from 'react'
import { Avatar as AvatarMui } from '@mui/material'

export default function Avatar({ label, sx = {}, ...props }) {
  return <AvatarMui alt={label} {...stringAvatar(label, sx)} {...props} />
}

const stringAvatar = (name, sx = {}) => ({
  sx: {
    bgcolor: stringToColor(name),
    '& .MuiAvatar-root': {
      flex: '1 0 0',
    },
    ...sx,
  },
  children: `${name.split(' ')[0][0]}`,
})

function stringToColor(string) {
  let i
  let hash = 0
  let color = '#'

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }

  return color
}
