
interface LetterData {
  letterNumber?: string;
  villageHeadName: string;
  villageName: string;
  name: string;
  nik?: string;
  birthPlace?: string;
  birthDate?: string;
  gender?: string;
  address: string;
  districtName: string;
  purpose?: string;
  currentDate?: string;
}

const DomisiliTemplate = ({ data }: { data: LetterData }) => (
    <div className="p-4 border rounded-md">
      <header className="text-center mb-6">
        <h1 className="text-xl font-bold">SURAT KETERANGAN DOMISILI</h1>
        <p>Nomor: {data.letterNumber || '.../.../...'}</p>
      </header>
  
      <div className="mb-4">
        <p>Yang bertanda tangan di bawah ini:</p>
        <p className="ml-8">Nama    : {data.villageHeadName}</p>
        <p className="ml-8">Jabatan : Geuchik/Kepala Desa {data.villageName}</p>
        <p className="ml-8">Alamat  : Kantor Desa {data.villageName}</p>
      </div>
  
      <div className="mb-6">
        <p>Menerangkan dengan sebenarnya bahwa:</p>
        <p className="ml-8">Nama          : {data.name}</p>
        <p className="ml-8">NIK           : {data.nik || '-'}</p>
        <p className="ml-8">Tempat/Tgl Lahir : {data.birthPlace || '-'}, {data.birthDate || '-'}</p>
        <p className="ml-8">Jenis Kelamin   : {data.gender || '-'}</p>
        <p className="ml-8">Alamat        : {data.address}</p>
      </div>
  
      <div className="mb-6">
        <p>Adalah benar-benar berdomisili di wilayah Desa {data.villageName}, Kecamatan {data.districtName}.</p>
        <p>Surat keterangan ini diberikan untuk keperluan: {data.purpose || '-'}.</p>
      </div>
  
      <footer className="text-right mt-8">
        <p>{data.villageName}, {data.currentDate || new Date().toLocaleDateString('id-ID')}</p>
        <div className="mt-8">
          <p className="font-bold">{data.villageHeadName}</p>
          <p>Geuchik/Kepala Desa</p>
        </div>
      </footer>
    </div>
  )