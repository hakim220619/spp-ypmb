// ** React Imports
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import axiosConfig from 'src/configs/axiosConfig'
import { useRouter } from 'next/router'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'

import urlImage from 'src/configs/url_image'
import { Box } from '@mui/system'


const TabAccount = () => {
  const router = useRouter()
  const { cs_id } = router.query
  const storedToken = window.localStorage.getItem('token')

  const [fullName, setFullName] = useState<string | null>('')
  const [kpsReceiver, setKpsReceiver] = useState('')
  console.log(kpsReceiver)

  const [nick_name, setNickName] = useState('')
  const [gender, setGender] = useState('')
  const [nik, setNik] = useState('')
  const [birth_place_date, setBirthPlaceDate] = useState('')
  const [school, setSchool] = useState('')
  const [nisn, setNisn] = useState('')
  const [birth_cert_no, setBirthCertNo] = useState('')
  const [religion, setReligion] = useState('')
  const [address, setAddress] = useState('')
  const [rt, setRt] = useState('')
  const [rw, setRw] = useState('')
  const [dusun, setDusun] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [transportation, setTransportation] = useState('')
  const [phone, setPhone] = useState('')
  const [birth_date, setDateOfBirth] = useState('')
  const [kpsNumber, setKpsNumber] = useState('')
  console.log(kpsNumber)

  const [fatherName, setFatherName] = useState('')
  const [fatherNik, setFatherNik] = useState('')
  const [fatherBirthYear, setFatherBirthYear] = useState('')
  const [fatherEducation, setFatherEducation] = useState('')
  const [fatherIncome, setFatherIncome] = useState('')
  const [fatherJob, setFatherJob] = useState('')

  const [motherName, setMotherName] = useState('')
  const [motherNik, setMotherNik] = useState('')
  const [motherBirthYear, setMotherBirthYear] = useState('')
  const [motherEducation, setMotherEducation] = useState('')
  const [motherJob, setMotherJob] = useState('')
  const [motherIncome, setMotherIncome] = useState('')

  const [guardianName, setGuardianName] = useState('')
  const [guardianNik, setGuardianNik] = useState('')
  const [guardianBirthYear, setGuardianBirthYear] = useState('')
  const [guardianEducation, setGuardianEducation] = useState('')
  const [guardianJob, setGuardianJob] = useState('')
  const [guardianIncome, setGuardianIncome] = useState('')

  const [homePhone, setHomePhone] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [email, setEmail] = useState('')

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [distanceToSchool, setDistanceToSchool] = useState('')
  const [distanceInKm, setDistanceInKm] = useState('')
  const [siblings, setSiblings] = useState('')
  const [travelHours, setTravelHours] = useState('')
  const [travelMinutes, setTravelMinutes] = useState('')

  const [kartuKeluarga, setKartuKeluarga] = useState<File | null>(null)

  const [akteLahir, setAkteLahir] = useState<File>()
  const [ktpOrangtua, setKtpOrangtua] = useState<File>()
  const [ijasah, setIjasah] = useState<File>()

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    axiosConfig
      .post(
        '/detailPpdbStudentDetailAdmin',
        { cs_id },
        { headers: { Accept: 'application/json', Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        console.log(response.data)

        const {
          full_name,
          nick_name,
          nik,
          gender,
          phone,
          email,
          date_of_birth,
          birth_place_date,
          school,
          nisn,
          birth_cert_no,
          religion,
          address,
          rt,
          rw,
          dusun,
          kecamatan,
          transportation,
          kps_receiver,
          kps_number,
          father_name,
          father_nik,
          father_birth_year,
          father_education,
          father_income,
          father_job,
          mother_name,
          mother_nik,
          mother_birth_year,
          mother_education,
          mother_job,
          mother_income,
          guardian_name,
          guardian_nik,
          guardian_birth_year,
          guardian_education,
          guardian_job,
          guardian_income,
          home_phone,
          mobile_phone,
          height,
          weight,
          distance_to_school,
          distance_in_km,
          siblings,
          travel_hours,
          travel_minutes,
          kartu_keluarga,
          akte_lahir,
          ktp_orangtua,
          ijasah
        } = response.data
        console.log(response.data)

        setFullName(full_name)
        setNickName(nick_name)
        setGender(gender)
        setNik(nik)
        setPhone(phone)
        setEmail(email)
        setDateOfBirth(date_of_birth)
        setBirthPlaceDate(birth_place_date)
        setSchool(school)
        setNisn(nisn)
        setBirthCertNo(birth_cert_no)
        setReligion(religion)
        setAddress(address)
        setRt(rt)
        setRw(rw)
        setDusun(dusun)
        setKecamatan(kecamatan)
        setTransportation(transportation)
        setKpsReceiver(kps_receiver)
        setKpsNumber(kps_number)

        // Set father's details
        setFatherName(father_name)
        setFatherNik(father_nik)
        setFatherBirthYear(father_birth_year)
        setFatherEducation(father_education)
        setFatherIncome(father_income)
        setFatherJob(father_job)

        // Set mother's details
        setMotherName(mother_name)
        setMotherNik(mother_nik)
        setMotherBirthYear(mother_birth_year)
        setMotherEducation(mother_education)
        setMotherJob(mother_job)
        setMotherIncome(mother_income)

        // Set guardian's details
        setGuardianName(guardian_name)
        setGuardianNik(guardian_nik)
        setGuardianBirthYear(guardian_birth_year)
        setGuardianEducation(guardian_education)
        setGuardianJob(guardian_job)
        setGuardianIncome(guardian_income)

        // Set additional fields
        setHomePhone(home_phone)
        setMobilePhone(mobile_phone)
        setHeight(height)
        setWeight(weight)
        setDistanceToSchool(distance_to_school)
        setDistanceInKm(distance_in_km)
        setSiblings(siblings)
        setTravelHours(travel_hours)
        setTravelMinutes(travel_minutes)
        setKartuKeluarga(kartu_keluarga)
        setAkteLahir(akte_lahir)
        setKtpOrangtua(ktp_orangtua)
        setIjasah(ijasah)
      })
      .catch(error => {
        console.error('Error fetching details:', error)
      })
  }, [cs_id, storedToken])

  const handleClickOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setSelectedImage(null)
  }

  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '').toString()
    const split = numberString.split(',')
    const sisa = split[0].length % 3
    let rupiah = split[0].substr(0, sisa)
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah

    return 'Rp ' + rupiah
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Bulan mulai dari 0 di JavaScript
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  const handleBack = () => {
    router.push('/ms/ppdb/')
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Details Siswa Baru' />

          <CardContent>
            <Grid spacing={2}>
              {/* Personal Data Section */}
              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                A. Data Pribadi
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Nama Lengkap</span>}
                    name='fullName'
                    value={fullName}
                    placeholder='ABDU KHOR'
                    required
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Nama Panggilan</span>}
                    name='nickName'
                    placeholder='Panggilan'
                    value={nick_name}
                    onChange={e => setNickName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Jenis Kelamin</span>}
                    name='gender'
                    placeholder='Jenis Kelamin'
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>NIK</span>}
                    name='nik'
                    value={nik}
                    placeholder='6301080809160001'
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Tempat dan Tanggal Lahir</span>}
                    name='birthPlaceDate'
                    placeholder='TANAH LAUT'
                    value={birth_place_date}
                    onChange={e => setBirthPlaceDate(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Asal Sekolah</span>}
                    name='school'
                    placeholder='Nama Sekolah'
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>NISN</span>}
                    name='nisn'
                    placeholder='0166235335'
                    value={nisn}
                    onChange={e => setNisn(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>No. Registrasi Akta Lahir</span>}
                    name='birthCertNo'
                    placeholder='1234512789'
                    value={birth_cert_no}
                    onChange={e => setBirthCertNo(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Agama</span>}
                    name='religion'
                    placeholder='Pilih Agama'
                    value={religion}
                    onChange={e => setReligion(e.target.value)}
                    required
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Alamat Tempat Tinggal</span>}
                    name='address'
                    placeholder='JL ABADI MAKMUR / GUNTUNG KEMINTING'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    fullWidth
                    label={<span>RT</span>}
                    name='rt'
                    placeholder='RT'
                    value={rt}
                    onInput={(e: any) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (!e.target.value.startsWith('RT')) {
                        e.target.value = 'RT '
                      } else {
                        e.target.value = `RT ${value}`
                      }
                      setRt(e.target.value) // Set the RT value
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    fullWidth
                    label={<span>RW</span>}
                    name='rw'
                    placeholder='RW'
                    value={rw}
                    onInput={(e: any) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (!e.target.value.startsWith('RW')) {
                        e.target.value = 'RW '
                      } else {
                        e.target.value = `RW ${value}`
                      }
                      setRw(e.target.value) // Set the RW value
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Nama Dusun</span>}
                    name='dusun'
                    placeholder='Dusun XYZ'
                    value={dusun}
                    onChange={e => setDusun(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Kecamatan</span>}
                    name='kecamatan'
                    placeholder='Kec. Banjarbaru Selatan'
                    value={kecamatan}
                    onChange={e => setKecamatan(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>Transportasi</span>}
                    name='transportation'
                    placeholder='Pilih Transportasi'
                    value={transportation}
                    onChange={e => setTransportation(e.target.value)}
                    required
                  ></CustomTextField>
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={<span>No. Telepon</span>}
                    name='phone'
                    placeholder='122-123-4512-7890'
                    value={phone}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tanggal Lahir'
                    value={formatDate(birth_date)}
                    placeholder='YYYY-MM-DD'
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                B. Data Ayah Kandung
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nama'
                    name='fatherName'
                    placeholder=''
                    required
                    value={fatherName}
                    onChange={e => setFatherName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='NIK Ayah'
                    name='fatherNik'
                    placeholder=''
                    required
                    value={fatherNik}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value.length <= 112) {
                        setFatherNik(value) // Update the state value
                      }
                    }}
                    inputProps={{ maxLength: 112 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tahun Lahir'
                    name='fatherBirthYear'
                    placeholder=''
                    required
                    value={fatherBirthYear}
                    onChange={e => {
                      const value = e.target.value
                      if (/^\d{0,4}$/.test(value)) {
                        setFatherBirthYear(value)
                      }
                    }}
                    inputProps={{ maxLength: 4 }} // Batas panjang maksimal 4 karakter
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pendidikan'
                    name='fatherEducation'
                    placeholder='Pilih Pendidikan'
                    required
                    value={fatherEducation}
                    onChange={e => setFatherEducation(e.target.value)}
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Penghasilan'
                    name='fatherIncome'
                    placeholder=''
                    required
                    value={fatherIncome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '')
                      setFatherIncome(formatRupiah(rawValue))
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pekerjaan'
                    name='fatherJob'
                    placeholder='Pilih Pekerjaan'
                    required
                    value={fatherJob}
                    onChange={e => setFatherJob(e.target.value)}
                  ></CustomTextField>
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                C. Data Ibu Kandung
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nama'
                    name='motherName'
                    placeholder='SHELA WATI'
                    value={motherName}
                    onChange={e => setMotherName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='NIK Ibu'
                    name='motherNik'
                    placeholder=''
                    value={motherNik}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value.length <= 112) {
                        setMotherNik(value)
                      }
                    }}
                    inputProps={{ maxLength: 112 }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tahun Lahir'
                    name='motherBirthYear'
                    placeholder='1994'
                    value={motherBirthYear}
                    onChange={e => {
                      const value = e.target.value
                      if (/^\d{0,4}$/.test(value)) {
                        setMotherBirthYear(value)
                      }
                    }}
                    inputProps={{ maxLength: 4 }} // Batas panjang maksimal 4 karakter
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pendidikan terakhir'
                    name='motherEducation'
                    placeholder='Pilih Pendidikan'
                    value={motherEducation}
                    onChange={e => setMotherEducation(e.target.value)}
                    required
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pekerjaan'
                    name='motherJob'
                    placeholder='Pilih Pekerjaan'
                    value={motherJob}
                    onChange={e => setMotherJob(e.target.value)}
                    required
                  ></CustomTextField>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Penghasilan Bulanan'
                    name='motherIncome'
                    placeholder='Tidak Berpenghasilan'
                    value={motherIncome}
                    onInput={(e: any) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '')
                      setMotherIncome(formatRupiah(rawValue))
                    }}
                    required
                  />
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                D. Data Wali
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                {/* Nama Wali */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nama'
                    name='guardianName'
                    placeholder='Masukkan Nama Wali'
                    value={guardianName}
                    onChange={e => setGuardianName(e.target.value)}
                  />
                </Grid>

                {/* NIK Wali */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='NIK Wali'
                    name='guardianNik'
                    placeholder='Masukkan NIK Wali'
                    value={guardianNik}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/[^0-9]/g, '')
                      if (value.length <= 112) {
                        setGuardianNik(value)
                      }
                    }}
                    inputProps={{ maxLength: 112 }}
                  />
                </Grid>

                {/* Tahun Lahir */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tahun Lahir'
                    name='guardianBirthYear'
                    placeholder='Masukkan Tahun Lahir'
                    value={guardianBirthYear}
                    onChange={e => {
                      const value = e.target.value
                      if (/^\d{0,4}$/.test(value)) {
                        setGuardianBirthYear(value)
                      }
                    }}
                    inputProps={{ maxLength: 4 }} // Batas panjang maksimal 4 karakter
                  />
                </Grid>

                {/* Pendidikan Terakhir */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pendidikan Terakhir'
                    name='guardianEducation'
                    placeholder='Pilih Pendidikan Terakhir'
                    value={guardianEducation}
                    onChange={e => setGuardianEducation(e.target.value)}
                  ></CustomTextField>
                </Grid>

                {/* Pekerjaan */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Pekerjaan'
                    name='guardianJob'
                    placeholder='Pilih Pekerjaan'
                    value={guardianJob}
                    onChange={e => setGuardianJob(e.target.value)}
                  ></CustomTextField>
                </Grid>

                {/* Penghasilan */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Penghasilan'
                    name='guardianIncome'
                    placeholder='Masukkan Penghasilan'
                    value={guardianIncome}
                    onInput={(e: any) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '')
                      setGuardianIncome(formatRupiah(rawValue))
                    }}
                  />
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                E. Kontak
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nomor Telepon Rumah'
                    name='homePhone'
                    placeholder=''
                    value={homePhone}
                    onInput={(e: any) => {
                      const value = e.target.value.replace(/[^0-9]/g, '') // Remove non-numeric characters
                      setHomePhone(value) // Update the state with the cleaned value
                    }}
                    required
                  />
                </Grid>

                {/* Nomor HP */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Nomor HP'
                    name='mobilePhone'
                    placeholder=''
                    value={mobilePhone}
                    onInput={(e: any) => {
                      let value = e.target.value.replace(/[^0-9]/g, '') // Remove non-numeric characters
                      if (!value.startsWith('62')) {
                        value = '62' + value // Set default to '62' if not starting with it
                      }
                      setMobilePhone(value) // Update the state with the cleaned and formatted value
                    }}
                    required
                  />
                </Grid>

                {/* E-mail */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='E-mail'
                    name='email'
                    placeholder=''
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                F. Data Pribadi
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tinggi Badan (cm)'
                    name='height'
                    placeholder='Masukkan tinggi badan dalam cm'
                    type='number'
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    required
                  />
                </Grid>

                {/* Berat Badan */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Berat Badan (kg)'
                    name='weight'
                    placeholder='Masukkan berat badan dalam kg'
                    type='number'
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    required
                  />
                </Grid>

                {/* Jarak rumah ke sekolah */}
                <Grid item xs={12}>
                  <Typography variant='body1'>Jarak rumah ke sekolah:</Typography>
                  <RadioGroup
                    row
                    name='distanceToSchool'
                    value={distanceToSchool}
                    onChange={e => setDistanceToSchool(e.target.value)}
                  >
                    <FormControlLabel value='kurang1km' control={<Radio />} label='Kurang dari 1 KM' />
                    <FormControlLabel value='lebih1km' control={<Radio />} label='Lebih dari 1 KM' />
                  </RadioGroup>
                </Grid>

                {/* Sebutkan dalam kilometer */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Sebutkan dalam kilometer'
                    name='distanceInKm'
                    placeholder='Masukkan jarak dalam km'
                    type='number'
                    value={distanceInKm}
                    onChange={e => setDistanceInKm(e.target.value)}
                    required
                  />
                </Grid>

                {/* Jumlah Saudara Kandung */}
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Jumlah Saudara Kandung'
                    name='siblings'
                    placeholder='Masukkan jumlah saudara kandung'
                    type='number'
                    value={siblings}
                    onChange={e => setSiblings(e.target.value)}
                    required
                  />
                </Grid>

                {/* Waktu Tempuh */}
                <Grid container spacing={2} item xs={12}>
                  <Typography variant='body1'>Waktu Tempuh:</Typography>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        label='Jam'
                        name='travelHours'
                        placeholder=''
                        type='number'
                        inputProps={{ min: 0, max: 23 }}
                        value={travelHours}
                        onInput={(e: any) => {
                          let value = parseInt(e.target.value, 10)
                          if (value < 0) value = 0
                          if (value > 23) value = 23
                          setTravelHours(value.toString())
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextField
                        fullWidth
                        label='Menit'
                        name='travelMinutes'
                        placeholder=''
                        type='number'
                        inputProps={{ min: 0, max: 59 }}
                        value={travelMinutes}
                        onInput={(e: any) => {
                          let value = parseInt(e.target.value, 10)
                          if (value < 0) value = 0
                          if (value > 59) value = 59
                          setTravelMinutes(value.toString())
                        }}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box m={1} display='inline'></Box>

              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                G. Upload Data
              </Typography>
              <Box m={1} display='inline'></Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                    Kartu Keluarga
                  </Typography>
                  <img
                    src={`${urlImage}${kartuKeluarga}`}
                    style={{ width: '100%', maxWidth: '100px', marginTop: '10px', cursor: 'pointer' }}
                    onClick={() => handleClickOpen(`${urlImage}${kartuKeluarga}`)}
                    alt='Kartu Keluarga'
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                    Akte Lahir
                  </Typography>
                  <img
                    src={`${urlImage}${akteLahir}`}
                    style={{ width: '100%', maxWidth: '100px', marginTop: '10px', cursor: 'pointer' }}
                    onClick={() => handleClickOpen(`${urlImage}${akteLahir}`)}
                    alt='Akte Lahir'
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                    KTP Orangtua
                  </Typography>
                  <img
                    src={`${urlImage}${ktpOrangtua}`}
                    style={{ width: '100%', maxWidth: '100px', marginTop: '10px', cursor: 'pointer' }}
                    onClick={() => handleClickOpen(`${urlImage}${ktpOrangtua}`)}
                    alt='KTP Orangtua'
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                    Ijazah
                  </Typography>
                  <img
                    src={`${urlImage}${ijasah}`}
                    style={{ width: '100%', maxWidth: '100px', marginTop: '10px', cursor: 'pointer' }}
                    onClick={() => handleClickOpen(`${urlImage}${ijasah}`)}
                    alt='Ijazah'
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                <Button type='reset' variant='tonal' color='secondary' onClick={handleBack}>
                  Kembali
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          {selectedImage && <img src={selectedImage} style={{ width: '100%' }} alt='Preview' />}
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default TabAccount
