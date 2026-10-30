# ขอบเขตที่ตรวจสอบจากระบบจริง

Repository: `intasan/yuyenpensuk-website`
ฐาน source ที่ตรวจ: `cfd0714b778a1dd8090199cd1953cdb80d6be2b3`

**สถานะ: ทดสอบ security policy ผ่าน; CMS ยังไม่ตรวจรับ**

2 automated tests ผ่าน แต่ startup แบบ REQUIRE_EXISTING_DATA=1 หยุดเพราะไม่มีฐานข้อมูล CMS จริง; ไม่มี product JPG uploads จริงครบ และยังไม่ได้ทดสอบ admin flow

## แหล่งหลักฐาน

- [evidence/verification-2026-10-30.txt](../evidence/verification-2026-10-30.txt)
- [evidence/source-audit.json](../evidence/source-audit.json)
- [evidence/startup-attempt.txt](../evidence/startup-attempt.txt)
- [evidence/header-tests.txt](../evidence/header-tests.txt)

## Traceability จาก source

| ไฟล์ที่ตรวจ | ขอบเขตที่ยืนยันได้ |
|---|---|
| [routes/admin.js](../routes/admin.js) | พบ source ใน commit ข้างต้น; การมีไฟล์ไม่ใช่การทดสอบผ่าน |
| [routes/site.js](../routes/site.js) | พบ source ใน commit ข้างต้น; การมีไฟล์ไม่ใช่การทดสอบผ่าน |
| [server.js](../server.js) | พบ source ใน commit ข้างต้น; การมีไฟล์ไม่ใช่การทดสอบผ่าน |

## เกณฑ์ตรวจรับ BA / SA

| เกณฑ์ | หลักฐาน / สถานะ |
|---|---|
| ขอบเขตปัจจุบันตรงกับ source | ทดสอบ security policy ผ่าน; CMS ยังไม่ตรวจรับ |
| End-to-end ด้วยข้อมูลจริง | 2 automated tests ผ่าน แต่ startup แบบ REQUIRE_EXISTING_DATA=1 หยุดเพราะไม่มีฐานข้อมูล CMS จริง; ไม่มี product JPG uploads จริงครบ และยังไม่ได้ทดสอบ admin flow |
| ผลการทดสอบที่ทำซ้ำได้ | อ่าน command, stdout, exit code ใน evidence; syntax check ไม่ใช่ runtime test |
| ข้อมูลจริงและ provenance | เฉพาะราคาทองใน live-verification.txt ที่มี URL/เวลา publication; ไม่ใช้ fixture เป็นข้อมูลจริง |
| UAT โดยเจ้าของงานหรือผู้ใช้งาน | ยังไม่ได้ดำเนินการในรอบนี้ |

## ข้อจำกัดการแสดงผลงาน

ผล unit tests เป็นการตรวจ logic โดยมี fixture ตาม suite เดิม ไม่ใช่หลักฐานธุรกรรมจริง การฝึกโมเดลจริง การทำงานของอุปกรณ์จริง หรือการรับรองจากผู้ใช้ ไม่สร้างข้อมูลธุรกิจทดแทนข้อมูลที่ขาด และไม่อนุมานว่าไม่มีข้อมูลเท่ากับปลอดภัย
