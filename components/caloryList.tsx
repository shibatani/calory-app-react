import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'

import { CaloryParams } from '../types/calory'

type Props = {
  calories: CaloryParams[]
}

export default function CaloryList(props: Props) {
  const router = useRouter()
  const columns: GridColDef[] = [
    { field: 'title', headerName: '名前', width: 200, sortable: false },
    { field: 'date', headerName: '日付', width: 200 },
    { field: 'kind', headerName: '種別', width: 150, sortable: false },
    { field: 'calory', headerName: 'カロリー(kcal)', width: 150 },
    {
      field: 'editBtn',
      headerName: '',
      sortable: false,
      width: 30,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              onEdit(event, params.row)
            }}
          >
            <EditIcon />
          </IconButton>
        )
      }
    },
    {
      field: ' deleteBtn',
      headerName: '',
      sortable: false,
      width: 30,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="edit"
            onClick={(event) => {
              onEdit(event, params.row)
            }}
          >
            <DeleteIcon />
          </IconButton>
        )
      }
    },
  ]

  const onEdit = (event, params: CaloryParams) => {
    event.stopPropagation()
    router.push(`/calories/${params.id}`)
  }

  return (
    <div style={{ height: 550, maxWidth: 800, margin: 'auto' }}>
      <DataGrid
        rows={props.calories}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[25, 50, 100]}
        disableSelectionOnClick
      />
    </div>
  )
}