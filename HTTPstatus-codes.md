### HTTP Status Kodlari

#### **1xx: Informational (Ma'lumot beruvchi)**
Bu status kodlar faqat ma'lumot uchun ishlatiladi va odatda kam ishlatiladi.

- **100 Continue**: Server so‘rovning bir qismini qabul qilgan va qolgan qismini kutmoqda.
- **101 Switching Protocols**: Server protokolni o‘zgartiradi (masalan, WebSocket'ga o‘tish).

---

#### **2xx: Success (Muvaffaqiyat)**
Bu kodlar so‘rov muvaffaqiyatli bajarilganini bildiradi.

- **200 OK**: So‘rov muvaffaqiyatli bajarildi (eng ko‘p ishlatiladigan kod).
  - Masalan, GET so‘rov muvaffaqiyatli ma‘lumot qaytardi.
- **201 Created**: Resurs yaratildi.
  - Masalan, POST orqali yangi foydalanuvchi qo‘shildi.
- **202 Accepted**: So‘rov qabul qilindi, lekin hali bajarilmagan (asenkron operatsiyalar uchun).
- **204 No Content**: Javobda hech qanday ma‘lumot yo‘q, lekin so‘rov muvaffaqiyatli bajarilgan.

---

#### **3xx: Redirection (Yo‘naltirish)**
Bu kodlar so‘rovni boshqa manzilga yo‘naltirishni bildiradi.

- **301 Moved Permanently**: Resurs doimiy ravishda boshqa joyga ko‘chirilgan.
- **302 Found**: Resurs vaqtinchalik boshqa joyga ko‘chirilgan.
- **304 Not Modified**: Resurs o‘zgarmagan (kechirilgan versiya qaytariladi).

---

#### **4xx: Client Errors (Foydalanuvchi xatolari)**
Bu kodlar foydalanuvchi so‘rovining noto‘g‘ri ekanini bildiradi.

- **400 Bad Request**: So‘rov noto‘g‘ri yoki yaroqsiz.
  - Masalan, so‘rov ma‘lumotlari formati noto‘g‘ri.
- **401 Unauthorized**: Foydalanuvchi autentifikatsiya qilinmagan.
  - Masalan, token yo‘q yoki noto‘g‘ri.
- **403 Forbidden**: Foydalanuvchiga resursga ruxsat berilmagan.
  - Masalan, admin sahifasiga kirishga urinish.
- **404 Not Found**: So‘ralgan resurs topilmadi.
  - Masalan, noto‘g‘ri URL kiritilgan.
- **409 Conflict**: So‘rov ziddiyatga sabab bo‘ldi.
  - Masalan, bir xil foydalanuvchi nomi bilan ro‘yxatdan o‘tishga urinish.
- **422 Unprocessable Entity**: So‘rov validatsiya xatolari sababli qayta ishlana olmadi.

---

#### **5xx: Server Errors (Server xatolari)**
Bu kodlar serverning ichki xatosi borligini bildiradi.

- **500 Internal Server Error**: Serverda kutilmagan xato yuz berdi.
- **501 Not Implemented**: Server so‘rovni bajarish imkoniyatiga ega emas.
- **502 Bad Gateway**: Server yuqori darajadagi serverdan noto‘g‘ri javob oldi.
- **503 Service Unavailable**: Server vaqtincha mavjud emas.
  - Masalan, texnik xizmat ko‘rsatish holati.
- **504 Gateway Timeout**: Server yuqori darajadagi serverdan vaqtida javob ololmadi.

---

### Qachon qaysi status kodni ishlatish kerak?

#### CRUD operatsiyalari uchun:
- **GET:**
  - **200 OK**: Muvaffaqiyatli ma‘lumot qaytarish.
  - **404 Not Found**: Resurs topilmasa.
- **POST:**
  - **201 Created**: Yangi resurs muvaffaqiyatli yaratildi.
  - **400 Bad Request**: Kiritilgan ma‘lumotlar noto‘g‘ri bo‘lsa.
- **PUT/PATCH:**
  - **200 OK**: Muvaffaqiyatli yangilandi.
  - **400 Bad Request**: Yaroqsiz ma‘lumotlar yuborilgan.
  - **404 Not Found**: Yangilash uchun resurs topilmasa.
- **DELETE:**
  - **200 OK**: Resurs muvaffaqiyatli o‘chirildi.
  - **404 Not Found**: O‘chirilishi kerak bo‘lgan resurs topilmasa.

