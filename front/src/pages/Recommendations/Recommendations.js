import { useState } from 'react'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

import RecommendationForm from './RecommendationForm'
import { mapJStoString } from './util'

export default function Recommendations({ data = [], onAdd, onRemove, onEdit }) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState()

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h4">Рекомендации</Typography>
      <Box sx={{ py: 2 }}>
        <RecommendationForm open={adding} setOpen={setAdding} onSubmit={onAdd} />
      </Box>
      <List>
        {data.map(recommendation => {
          if (editing === recommendation._id) {
            return (
              <RecommendationForm
                open={editing === recommendation._id}
                recommendation={recommendation}
                setOpen={v => setEditing(v ? recommendation._id : undefined)}
                onSubmit={({ name, value }) => onEdit({ id: recommendation._id, name, value })}
              />
            )
          }
          return (
            <ListItem
              key={recommendation._id}
              divider
              sx={{ pr: 14 }}
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton color="primary" component="span" onClick={() => setEditing(recommendation._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" component="span" onClick={() => onRemove(recommendation._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText primary={recommendation.name} secondary={mapJStoString(recommendation.value)} />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
