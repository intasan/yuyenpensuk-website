# อยู่เย็นเป็นสุข วิศวกรรม — Production Final

เว็บบริษัท + CMS สำหรับใช้งานจริงด้วย Docker

## Production entry point

```bash
npm start
```

Docker Compose ใช้ `deploy-server.js` เป็น entry point เดียว โดยแยกเว็บลูกค้าและ `/admin` ตาม hostname เช่น `admin.yourdomain`.

## Persistent data

ข้อมูล CMS และไฟล์ที่อัปโหลดต้องเก็บนอก container:

```text
/opt/yuyenpensuk/data    -> /app/data
/opt/yuyenpensuk/uploads -> /app/uploads
```

ห้ามลบหรือแทนที่สองโฟลเดอร์นี้ตอน deploy code ใหม่

## Security

- Multer 2.4.0
- จำกัดขนาดและจำนวน multipart fields/files พร้อม fieldArrayIndexLimit
- ตรวจ magic bytes ของไฟล์ก่อนยอมรับ
- CSRF token สำหรับ POST ของ Admin
- Session cookie: HttpOnly, SameSite=Lax, Secure ใน production
- Session regeneration หลัง login/2FA
- Login/OTP rate limit
- bcrypt password hashing
- Content-Security-Policy และ security headers
- Docker รันด้วย user `node`, drop capabilities และ `no-new-privileges`
- container filesystem เป็น read-only ยกเว้น persistent mounts และ `/tmp`

## Product images

runtime ใช้รูปสินค้าจากพื้นที่ uploads ภายนอก repository และไม่ดาวน์โหลดรูปจากเว็บไซต์ภายนอก ชุด JPG ไม่ได้รวมใน GitHub checkout นี้ จึงต้องเตรียมไฟล์จริงใน persistent uploads ก่อนตรวจแกลเลอรี จำนวนรูปในระบบที่ใช้งานจริงต้องตรวจจาก volume นั้นโดยตรง

## First production setup

1. คัดลอก `.env.example` เป็น `.env`
2. ตั้ง `SESSION_SECRET` เป็นค่าสุ่มยาวอย่างน้อย 32 ตัวอักษร
3. ตั้ง `INITIAL_ADMIN_PASSWORD` อย่างน้อย 12 ตัวอักษร
4. เตรียม `/opt/yuyenpensuk/data` และ `/opt/yuyenpensuk/uploads`
5. รัน:

```bash
docker compose up -d --build
```

ตรวจ:

```bash
docker compose ps
docker compose logs --tail=100 web
curl http://127.0.0.1:3000/healthz
```

## Deploy code ใหม่

อัปเดตเฉพาะ code ใน `/opt/yuyenpensuk/app` แล้วรัน:

```bash
docker compose up -d --build
```

อย่าลบ `/opt/yuyenpensuk/data` หรือ `/opt/yuyenpensuk/uploads`

## Local portfolio preview and checks

```bash
npm install
npm run dev -- --port 3000
npm test
```

The local preview serves only the public website, not the admin application. It displays a visible notice that seed CMS records are test content, not proof of actual installation jobs, customers or the state of the production server. Do not present seed project descriptions or stock imagery as delivered client work. Production continues to use `npm start`.

On 30 October 2026 browser inspection found development HTTP assets being upgraded to HTTPS by CSP, preventing styles from loading. `upgrade-insecure-requests` is now production-only; HSTS and production CSP are preserved. Two automated header checks passed. The browser connection failed before a post-fix visual capture could be completed, so no screenshot or successful full browser QA is claimed for this fix. Original public checkout lacks product-upload files; client-specific files and production data were not accessed.

## เอกสารวิเคราะห์ระบบ

[Requirement และเอกสารออกแบบระบบ](docs/analysis/README.md) · [HTML ฉบับอ่าน](docs/analysis/analysis.html) · [SVG และ Mermaid ที่แก้ไขได้](docs/analysis/diagrams/)

ชุดเอกสารจัดทำใหม่จาก source baseline วันที่ 30 ตุลาคม 2026 มี Functional Requirements, Business Rules, Context Diagram, DFD, Workflow, Data Model, Data Dictionary และ UAT traceability แยกสถานะที่พบในโค้ดออกจากสิ่งที่ผ่านการทดสอบและสิ่งที่ยังต้องยืนยันกับผู้ใช้ ไม่ใช่บันทึกสัมภาษณ์หรือเอกสารรับรองย้อนหลัง
