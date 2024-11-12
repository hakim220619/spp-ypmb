import { useState, useEffect, useCallback } from 'react'
import {
  Card,
  Grid,
  Divider,
  MenuItem,
  IconButton,
  CardHeader,
  CardContent,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment
} from '@mui/material'
import { DataGrid, GridCloseIcon, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'
import { fetchDataSiswa, deleteUserSiswa } from 'src/store/apps/siswa/index'
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import TableHeader from 'src/pages/ms/siswa/TableHeader'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import axiosConfig from '../../../configs/axiosConfig'
import urlImage from '../../../configs/url_image'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

interface CellType {
  row: UsersType
}

const statusObj: any = {
  ON: { title: 'ON', color: 'primary' },
  OFF: { title: 'OFF', color: 'error' }
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

const RowOptions = ({ uid }: { uid: any }) => {
  const data = localStorage.getItem('userData') as string
  const getDataLocal = JSON.parse(data)
  const [open, setOpen] = useState(false)
  const [school_id] = useState<number>(getDataLocal.school_id)
  const [value] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false) // Tambahkan state isLoading
  const [openPasswordModal, setOpenPasswordModal] = useState(false)

  const [values, setValues] = useState({
    newPassword: '',
    confirmNewPassword: '',
    showNewPassword: false,
    showConfirmNewPassword: false
  })
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleRowEditedClick = () => router.push('/ms/siswa/' + uid)

  const handleDelete = async () => {
    setIsLoading(true) // Set isLoading menjadi true saat mulai delete
    try {
      await dispatch(deleteUserSiswa(uid)).unwrap()
      await dispatch(fetchDataSiswa({ school_id, major: '', clas: '', unit_id: '', q: value }))
      toast.success('Successfully deleted!')
      setOpen(false)
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error('Failed to delete user. Please try again.')
    } finally {
      setIsLoading(false) // Set isLoading menjadi false setelah proses selesai
    }
  }

  const handleClickOpenDelete = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpenPasswordModal = () => setOpenPasswordModal(true)
  const handleClosePasswordModal = () => setOpenPasswordModal(false)

  const handleNewPasswordChange = (prop: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const SetNewPassword = async () => {
    if (values.newPassword !== values.confirmNewPassword) {
      toast.error('Password tidak sama!')

      return
    }

    try {
      // Ambil token dari local storage
      const token = localStorage.getItem('token')

      await axiosConfig.post(
        '/new-password-all',
        {
          password: values.newPassword,
          uid: uid // Sertakan uid jika perlu
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header dengan token
          }
        }
      )
      setValues({
        newPassword: '',
        confirmNewPassword: '',
        showNewPassword: false,
        showConfirmNewPassword: false
      })
      toast.success('Password berhasil diubah!')
      setOpenPasswordModal(false)
    } catch (error) {
      console.error('Error setting new password:', error)
      toast.error('Gagal mengubah password. Silakan coba lagi.')
    }
  }

  return (
    <>
      <IconButton size='small' color='warning' onClick={handleOpenPasswordModal}>
        <Icon icon='tabler:lock' />
      </IconButton>
      <IconButton size='small' color='success' onClick={handleRowEditedClick}>
        <Icon icon='tabler:edit' />
      </IconButton>
      <IconButton size='small' color='error' onClick={handleClickOpenDelete}>
        <Icon icon='tabler:trash' />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Are you sure you want to delete this user?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>You won't be able to revert this action!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button color='error' type='submit' disabled={isLoading} onClick={handleDelete}>
            {isLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPasswordModal}
        onClose={handleClosePasswordModal}
        aria-labelledby='form-dialog-title'
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id='form-dialog-title'>Reset Password</DialogTitle>
        <DialogContent>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              SetNewPassword()
            }}
          >
            <CustomTextField
              fullWidth
              autoFocus
              label='New Password'
              value={values.newPassword}
              placeholder='············'
              sx={{ display: 'flex', mb: 4 }}
              id='auth-reset-password-v2-new-password'
              onChange={handleNewPasswordChange('newPassword')}
              type={values.showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowNewPassword}
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                    >
                      <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <CustomTextField
              fullWidth
              label='Confirm Password'
              placeholder='············'
              sx={{ display: 'flex', mb: 4 }}
              value={values.confirmNewPassword}
              id='auth-reset-password-v2-confirm-password'
              type={values.showConfirmNewPassword ? 'text' : 'password'}
              onChange={handleNewPasswordChange('confirmNewPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmNewPassword}
                    >
                      <Icon fontSize='1.25rem' icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordModal} color='secondary'>
            Cancel
          </Button>
          <Button onClick={SetNewPassword} color='primary'>
            Set Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const columns: GridColDef[] = [
  { field: 'no', headerName: 'No', width: 70 },
  { field: 'unit_name', headerName: 'Unit', flex: 0.175, minWidth: 160 },
  { field: 'nisn', headerName: 'Nisn', flex: 0.175, minWidth: 130 },
  { field: 'full_name', headerName: 'Nama Lengkap', flex: 0.25, minWidth: 180 },
  { field: 'email', headerName: 'Email', flex: 0.25, minWidth: 200 },
  { field: 'phone', headerName: 'No. Wa', flex: 0.175, minWidth: 130 },
  { field: 'class_name', headerName: 'Kelas', flex: 0.175, minWidth: 140 },
  { field: 'major_name', headerName: 'Jurusan', flex: 0.175, minWidth: 140 },
  {
    field: 'date_of_birth',
    headerName: 'Tanggal Lahir',
    flex: 0.175,
    minWidth: 120,
    valueFormatter: params => {
      if (!params.value) return ''
      const date = new Date(params.value)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    }
  },
  {
    field: 'image',
    headerName: 'Gambar',
    flex: 0.175,
    minWidth: 70,
    renderCell: params => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          height: '100%' // Ensure the cell height is utilized
        }}
      >
        <img
          src={`${urlImage}uploads/school/siswa/${params.row.school_id}/${params.value}`}
          alt='image'
          style={{
            padding: 2,
            width: '40px', // Reduced width
            height: '40px', // Reduced height for a circular shape
            borderRadius: '50%', // Makes the image circular
            objectFit: 'cover' // Ensures the image covers the area without stretching
          }}
        />
      </div>
    )
  },

  {
    field: 'status',
    headerName: 'Status',
    flex: 0.175,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => {
      const status = statusObj[params.row.status]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status.color}
          label={status.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },
  {
    flex: 0,
    minWidth: 200,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions uid={row.uid} />
  }
]

interface Major {
  id: string
  major_name: string
  unit_id: string // Assuming each major has an associated unit_id
}
interface Clases {
  id: any
  class_name: string
}
interface Unit {
  id: string
  unit_name: string
}

const UserList = () => {
  const data = localStorage.getItem('userData') as string
  const getDataLocal = JSON.parse(data)
  const [school_id] = useState<number>(getDataLocal.school_id)
  const [clases, setClases] = useState<Clases[]>([])
  const [clas, setClas] = useState<string>('')
  const [filteredClasses, setFilteredClasses] = useState<Clases[]>([]) // New state for filtered classes
  const [value, setValue] = useState<string>('')
  const [major, setMajor] = useState<string>('')
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]) // New state for filtered majors
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [loading, setLoading] = useState<boolean>(true)
  const [majors, setMajors] = useState<any[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [unit, setUnit] = useState<string>('')

  const [openPdfPreview, setOpenPdfPreview] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const [loadinPdf, setLoadingPdf] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.siswa)
  const schoolId = getDataLocal.school_id

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token')

    setLoading(true)
    dispatch(fetchDataSiswa({ school_id, major, clas, unit_id: unit, q: value })).finally(() => {
      setLoading(false)
    })

    const fetchMajors = async () => {
      try {
        const response = await axiosConfig.get(`/getMajors/?schoolId=${schoolId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${storedToken}`
          }
        })
        setMajors(response.data)
      } catch (error) {
        console.error('Error fetching majors:', error)
      }
    }

    const fetchClases = async () => {
      try {
        const response = await axiosConfig.get(`/getClass/?schoolId=${schoolId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${storedToken}`
          }
        })
        setClases(response.data)
      } catch (error) {
        console.error('Error fetching classes:', error)
      }
    }
    const fetchUnits = async () => {
      try {
        const response = await axiosConfig.get('/getUnit', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${storedToken}`
          }
        })
        const filteredUnits = response.data.filter((unit: any) => unit.school_id === schoolId)
        setUnits(filteredUnits)
      } catch (error) {
        console.error('Failed to fetch units:', error)
        toast.error('Failed to load units')
      }
    }

    fetchMajors()
    fetchClases()
    fetchUnits()
  }, [dispatch, major, clas, unit, schoolId, school_id, value])

  useEffect(() => {
    const selectedUnitId = unit // Mengambil unit yang dipilih dari state
    const newFilteredMajors = selectedUnitId
      ? majors.filter((major: Major) => major.unit_id === selectedUnitId)
      : majors
    const newFilteredClasses = selectedUnitId ? clases.filter((cls: any) => cls.unit_id === selectedUnitId) : clases

    setFilteredMajors(newFilteredMajors)
    setFilteredClasses(newFilteredClasses)

    // Reset major dan class jika unit berubah
    if (!selectedUnitId) {
      setMajor('')
      setClas('')
    }
  }, [unit, majors, clases])

  const handleFilter = useCallback((val: string) => setValue(val), [])
  const handleMajorChange = useCallback((e: SelectChangeEvent<unknown>) => setMajor(e.target.value as string), [])
  const handleClasChange = useCallback((e: SelectChangeEvent<unknown>) => setClas(e.target.value as string), [])

  const createPdf = async () => {
    setLoadingPdf(true)
    const doc = new jsPDF('landscape') // Set to landscape orientation

    // Check if store.data has any items
    if (store.data && store.data.length > 0) {
      const pdfData: any = store.data[0] // Assuming you want to use the first item for the PDF

      const logoImageUrl = '/images/logo.png'

      const img = new Image()
      img.src = logoImageUrl

      img.onload = () => {
        // Add the logo
        doc.addImage(img, 'PNG', 10, 10, 20, 20)

        // Add school name and address
        doc.setFontSize(14)
        doc.setFont('verdana', 'arial', 'sans-serif')
        const schoolNameWidth = doc.getTextWidth(pdfData.school_name)
        const xSchoolNamePosition = (doc.internal.pageSize.getWidth() - schoolNameWidth) / 2

        doc.text(pdfData.school_name, xSchoolNamePosition, 20)
        doc.setFontSize(10)
        doc.setFont('verdana', 'arial', 'sans-serif')

        const addressWidth = doc.getTextWidth(pdfData.school_address)
        const xAddressPosition = (doc.internal.pageSize.getWidth() - addressWidth) / 2

        doc.text(pdfData.school_address, xAddressPosition, 26)

        // Draw a horizontal line
        doc.line(10, 32, doc.internal.pageSize.getWidth() - 10, 32)

        // Student Information
        const studentInfoY = 33 // Base Y position for student info

        // Draw another horizontal line below the student information

        // Initialize tableBody array
        const tableBody: any = []

        store.data.forEach((item: any) => {
          const formattedUpdatedAt = new Date(item.date_of_birth).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour12: false
          })

          tableBody.push([
            item.id,
            item.nisn,
            item.full_name,
            item.email,
            item.phone,
            item.class_name,
            item.major_name,

            formattedUpdatedAt // Assuming you have a created_at field
          ])
        })

        // Set up the table
        doc.autoTable({
          startY: studentInfoY + 2,
          head: [['ID', 'Nisn', 'Nama Lengkap', 'Email', 'No. Wa', 'Kelas', 'Jurusan', 'Tanggal Lahir']],
          margin: { left: 10 },
          body: tableBody,
          theme: 'grid',
          headStyles: {
            fillColor: [50, 50, 50],
            textColor: [255, 255, 255],
            fontSize: 10,
            font: 'verdana',
            fontStyle: 'bold'
          },
          styles: {
            fontSize: 8,
            font: 'verdana'
          },
          alternateRowStyles: {
            fillColor: [230, 230, 230] // Change this to your desired secondary color
          },
          columnStyles: {
            0: { cellWidth: 20 }, // ID column width
            1: { cellWidth: 30 }, // Pembayaran column width
            2: { cellWidth: 60 }, // Dibuat column width
            3: { cellWidth: 60 }, // Total Tagihan column width
            4: { cellWidth: 30 } // Total Tagihan column width
          }
        })

        // Create a Blob URL for the PDF
        const pdfOutput = doc.output('blob')
        const blobUrl = URL.createObjectURL(pdfOutput)
        setPdfUrl(blobUrl) // Set the URL for the dialog
        setOpenPdfPreview(true) // Open the dialog
      }

      img.onerror = () => {
        console.error('Failed to load image:', logoImageUrl)
      }
    } else {
      toast.error('Tidak ada data untuk membuat PDF.')
    }
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Data Siswa' />
          <CardContent>
            <Grid container spacing={12}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  value={unit}
                  label='Pilih Unit'
                  onChange={e => {
                    setUnit(e.target.value)
                    setMajor('') // Reset major ketika unit berubah
                    setClas('') // Reset class ketika unit berubah
                  }}
                  SelectProps={{
                    displayEmpty: true
                  }}
                >
                  <MenuItem value=''>Pilih Unit</MenuItem>
                  {units.map(data => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.unit_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Pilih Jurusan'
                  SelectProps={{
                    value: major,
                    displayEmpty: true,
                    onChange: handleMajorChange
                  }}
                >
                  <MenuItem value=''>Pilih Jurusan</MenuItem>
                  {filteredMajors.map(data => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.major_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Pilih Kelas'
                  SelectProps={{
                    value: clas,
                    displayEmpty: true,
                    onChange: handleClasChange
                  }}
                >
                  <MenuItem value=''>Pilih Kelas</MenuItem>
                  {filteredClasses.map(data => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.class_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} createPdf={createPdf} loading={loadinPdf} />
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
              <CircularProgress color='secondary' />
            </div>
          ) : (
            <DataGrid
              autoHeight
              rowHeight={50}
              rows={store.data}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[20, 40, 60, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={{
                '& .MuiDataGrid-cell': {
                  fontSize: '0.75rem'
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontSize: '0.75rem'
                }
              }}
            />
          )}
        </Card>
      </Grid>
      <Dialog
        open={openPdfPreview}
        onClose={() => {
          setOpenPdfPreview(false)
          setPdfUrl(null) // Clear the URL when closing
          setLoadingPdf(false)
        }}
        maxWidth='lg'
        fullWidth
        PaperProps={{
          style: {
            minHeight: '600px',
            backgroundColor: 'transparent', // Semi-transparent white

            boxShadow: 'none',

            position: 'relative' // Ini perlu ditambahkan untuk posisikan ikon close
          }
        }}
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setOpenPdfPreview(false)
              setPdfUrl(null) // Clear the URL when closing
              setLoadingPdf(false)
            }}
            sx={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              zIndex: 1
            }}
          >
            <GridCloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {pdfUrl && <iframe src={pdfUrl} width='100%' height='800px' title='PDF Preview' style={{ border: 'none' }} />}
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default UserList
