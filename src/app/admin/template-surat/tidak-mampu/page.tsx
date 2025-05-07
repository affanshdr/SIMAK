const TidakMampuTemplate = ({ data }: { data: LetterData }) => (
  <div className="p-4 border rounded-md">
    <header className="text-center mb-6">
      <h1 className="text-xl font-bold">SURAT KETERANGAN TIDAK MAMPU</h1>
      <p>Nomor: {data.letterNumber || '.../.../...'}</p>
    </header>

    <div className="mb-4">
      <p>Yang bertanda tangan di bawah ini:</p>
      <p className="ml-8">Nama    : {data.villageHeadName}</p>
      <p className="ml-8">Jabatan : Geuchik/Kepala Desa {data.villageName}</p>
    </div>

    <div className="mb-6">
      <p>Menerangkan bahwa:</p>
      <p className="ml-8">Nama          : {data.name}</p>
      <p className="ml-8">NIK           : {data.nik || '-'}</p>
      <p className="ml-8">Tempat/Tgl Lahir : {data.birthPlace || '-'}, {data.birthDate || '-'}</p>
      <p className="ml-8">Alamat        : {data.address}</p>
    </div>

    <div className="mb-6">
      <p>Adalah warga kami yang <strong>benar-benar tergolong keluarga kurang mampu</strong> berdasarkan data yang ada.</p>
      <p>Surat ini diberikan untuk keperluan: {data.purpose || 'pengajuan bantuan sosial'}.</p>
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