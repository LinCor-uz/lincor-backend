# LinCor Platform Backend

LinCor platformasining backend qismini ishga tushirish uchun quyidagi qadamlarni bajaring:

1. Avvalo, barcha kerakli bog'lanmalarni o'rnatish uchun quyidagi buyruqni bajarish kerak:

   ```bash
   npm i

2. **_.env faylarni sozlab olish esdan chiqmasin_**

3. Prisma modelini bazaga qo'llash uchun quyidagi buyruqni bajaring:

    ```bash
   npm run prisma-migrate

4. Serverni nodemon bilan ishga tushirish uchun quyidagi buyruqni bajarish kerak. Nodemon avtomatik ravishda serverni
   yangilaydi:

    ```bash 
   npm run dev

5. Agar serverni bir martalik ishga tushirishni xohlasangiz, quyidagi buyruqni bajarishingiz mumkin

    ```bash
   npm start

