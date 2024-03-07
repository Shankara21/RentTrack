# RentTrack

Aplikasi pemesanan kendaraan berbasis web yang memungkinkan pengguna untuk melakukan pemesanan, persetujuan, dan pelaporan. Aplikasi ini dibangun menggunakan Laravel sebagai backend dan Angular sebagai frontend untuk memastikan kehandalan, keamanan, dan antarmuka pengguna yang responsif.

## Persyaratan Sistem

Pastikan sistem anda memenuhi persyaratan berikut sebelum menjalankan aplikasi ini:

- Sudah terinstall PHP versi 7.3 atau lebih tinggi
- Sudah terinstall Composer
- Sudah terinstall Node.js versi 12 atau lebih tinggi
- Sudah terinstall Angular CLI
- Sudah terinstall MySQL
- Sudah terinstall Laravel
- Sudah terinstall Git

## Instalasi

Membuka terminal lalu
Clone repositori ini ke dalam direktori komputer anda dengan cara

```bash
https://github.com/Shankara21/RentTrack.git
```

### Backend

- `cd Backend`
- `composer install atau composer update`
- `cp .env.example .env`
- `php artisan key:generate`
- silahkan membuat database dengan nama RentTrackDB
- `php artisan migrate --seed`
- `php artisan serve`

### Frontend

- buka dengan beda terminal (cmd/powershell)
- `cd Frontend`
- `npm install -g @angular/cli`
- setelah install angular cli coba cek dengan
  `ng version`
- `npm install atau npm update`
- `ng serve --open`

## Daftar Username-Password

| Email                | Password | Role       |
| -------------------- | -------- | ---------- |
| admin@mail.com       | password | Admin      |
| manager@mail.com     | password | Manager    |
| supervisor@mail.com  | password | Supervisor |
| supervisor2@mail.com | password | Supervisor |
| staff@mail.com       | password | Staff      |

## Framework

RentTrack dibangun menggunakan kombinasi dari Laravel sebagai backend dan Angular sebagai frontend. Berikut adalah detail dari masing-masing framework:

### Backend (Laravel)

- Framework: Laravel
- Versi Laravel: 9

### Frontend (Angular)

- Framework: Angular
- Versi Angular: 15

## Fitur

Berikut adalah fitur yang tersedia pada RentTrack:

- Pemesanan Kendaraan
- Persetujuan Pemesanan
- Pelaporan Pemesanan
- Manajemen Kendaraan
- Manajemen Pengguna
- Manajemen Driver
- Manajemen Location
- Manajemen Rental Company

## Dokumentasi

- Penggunaan Aplikasi [RentTrack](https://youtu.be/PIa3Owl2Vjc)
- API Dokumentasi [http://localhost:8000/request-docs](http://localhost:8000/request-docs) (pastikan sudah menjalankan backend)
- Collection Postman dapat dilihat pada folder /additionals/postman/\*
- User Case Diagram <br/>
  <img src="./additionals/usecase.png">
- Struktur Database <br/>
<img src="./additionals/db.png">

