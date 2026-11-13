# LSE320 / ATELIER — Wix Velo Integration

งานชุดนี้เตรียม Backend และ Game Frontend สำหรับต่อเข้ากับ Wix Editor site `atelier.projectmedia` โดยคง CMS Collections เดิมไว้

## ไฟล์ที่ใช้จริง

- `wix-integration/site-code/backend/gameBackendNext.web.js` — Backend หลัก: โหลดบทเรียน, เปิดรอบเล่น, ตรวจคำตอบฝั่งเซิร์ฟเวอร์, บันทึกผล และคำนวณ Progress
- `wix-integration/site-code/pages/Practice-page-code.v2.example.js` — Page Code สำหรับ Practice page และ HTML Component `#html2`
- `js/game.js` — ตัวเกมที่เชื่อม Wix Backend แล้ว มี Matching, Scenario, Keyboard และหน้า Progress ภายในเกม
- `css/style.css` — รูปแบบการแสดงผล Progress
- `wix-integration/site-code/pages/Progress-page-code.example.js` — Page Code ตัวอย่างสำหรับหน้า `/progress` แยก
- `wix-integration/site-code/pages/progress-dashboard.html` — HTML dashboard สำหรับ HTML Component `#htmlProgress` บนหน้า `/progress`

ไฟล์เดิม `gameBackend.web.js` และ `Practice-page-code.example.js` เป็นรุ่นก่อนหน้า ให้ใช้ไฟล์ `Next` และ `v2` เป็นหลัก

## โครงสร้าง CMS ที่ตรวจพบ

- `GameChapters`: 6 chapters
- `Tasks`: 43 tasks
- `MatchingPairs`: 43 pairs
- `GameAttempts`: เก็บหนึ่ง record ต่อหนึ่งรอบการเล่น
- `AnswerRecords`: เก็บทุกคำตอบ รวมคำตอบผิด, จำนวนครั้งที่ลอง, เฉลย และเวลา
- `ChapterQuestionProgress`: ความคืบหน้าการจับคู่รายสมาชิก/รายบท
- `MemberProgress`: จำนวนบทที่เรียนครบและเวลาเรียนสะสม

Backend ใช้ Collections ที่มีอยู่แล้ว ไม่ได้สร้าง Collection ซ้ำหรือแก้ schema/permission โดยอัตโนมัติ

## สิ่งที่ Backend บันทึก

1. Matching — ตรวจคู่จาก `MatchingPairs` ใน Backend ก่อนบันทึก `AnswerRecords`; ไม่รับคะแนนหรือ `memberId` จาก iframe
2. Scenario — ส่งโจทย์พร้อมตัวเลือกโดยไม่ส่ง answer key; Backend ตรวจ `Tasks.correctAnswer` แล้วบันทึกผล
3. Keyboard — ตรวจชุดปุ่มจาก allowlist ฝั่ง Backend แล้วบันทึกผล
4. Progress — สรุปบทที่เรียนครบ, คะแนนตอบถูก, จำนวนรอบ, ความคืบหน้ารายบท และประวัติการเล่น

ตัวตนผู้เรียนมาจาก `currentMember.getMember()` เท่านั้น ทุกเมธอดที่อ่าน/เขียนผลผู้เรียนจำกัดไว้ที่ Site Member และ Backend ตรวจเจ้าของ Attempt ก่อนบันทึก

## สถานะเนื้อหาก่อนเปิดให้นักศึกษา

จากการอ่าน CMS เมื่อ 13 พฤศจิกายน 2026 พบว่า `GameChapters` ทั้ง 6 records ยังเป็น `draft` และ review notes ระบุให้ผู้สอนตรวจเนื้อหาก่อนเผยแพร่ ดังนั้น Backend สำหรับนักศึกษาจะอ่านเฉพาะ chapter ที่ `status = published` เท่านั้น

Admin สามารถเรียก `getChapterBundleForAdmin` และ `getScenarioBundleForAdmin` เพื่อ Preview เนื้อหา Draft ได้โดยไม่บันทึก Learning Records

อย่าเปลี่ยนสถานะ Draft เป็น Published เพื่อทดสอบระบบโดยไม่ผ่านการตรวจเนื้อหาจากผู้สอนก่อน

## ติดตั้งลง Wix Editor site

ไซต์เป้าหมายเป็น Wix Editor site ที่เปิด Velo แล้ว แต่โค้ดใน branch นี้ยังไม่ใช่ repository ที่ Wix Git Integration ผูกกับไซต์ และ Wix MCP ที่ใช้อยู่ไม่มีคำสั่งอัปโหลดไฟล์ Velo เข้า Code panel ของ Wix Editor โดยตรง

มี 2 วิธีติดตั้ง:

### วิธี A — Git Integration (แนะนำเมื่อจะพัฒนาต่อเป็นทีม)

1. เปิด Wix Editor ของ `atelier.projectmedia`
2. เปิด Code sidebar แล้วเลือก GitHub Integration → Connect to GitHub
3. ทำตามหน้าจอ Wix เพื่ออนุญาต Velo GitHub app และสร้าง repository ที่ Wix เชื่อมกับไซต์
4. เมื่อ repository ที่ Wix สร้างพร้อมแล้ว ให้ใช้โครงสร้างไฟล์ของ Wix site repo ตามหัวข้อด้านล่าง และนำโค้ดจาก branch นี้ไปใส่
5. ทดสอบด้วย Local Editor ก่อน จากนั้นจึง Publish ผ่าน Wix Editor หรือ Wix CLI

หมายเหตุ: repository `atelierproject-media/atelier-game-prototype` เป็น repository ของเกมต้นแบบ ไม่ใช่ Wix site repo ที่เชื่อมกับ Wix Editor อยู่ในขณะนี้

### วิธี B — เพิ่มผ่าน Velo Code panel

1. เพิ่ม Backend Web Module ชื่อ `gameBackendNext.web.js` แล้ววางเนื้อหาจากไฟล์ Backend ด้านบน
2. เปิด Page Code ของหน้า Practice แล้ว Merge handler จาก `Practice-page-code.v2.example.js` โดยคง handler เดิมที่ไม่เกี่ยวข้องไว้
3. ตรวจว่า HTML Component ของเกมบน Practice page มี ID เป็น `html2`
4. ตรวจว่า HTML Component `#html2` ชี้ไปยัง build/deployment ของเกมที่ใช้ `js/game.js` และ `css/style.css` เวอร์ชัน branch นี้
5. Preview ด้วย Admin เพื่อทดสอบเนื้อหา Draft โดยไม่เขียน Learning Records

## แสดง Progress บนหน้าเว็บไซต์

ตัวเกมมีปุ่ม `ดูความคืบหน้าของฉัน / View my progress` ในหน้า Home และหน้าเลือก Chapter อยู่แล้ว เมื่อเปิดใน Wix จะอ่านข้อมูลของสมาชิกที่ล็อกอินจาก Backend

หากต้องการให้หน้าเว็บไซต์ `/progress` แสดง dashboard แยกด้วย ให้เพิ่ม HTML Component บนหน้า Progress แล้วตั้ง ID เป็น `htmlProgress`, นำ `progress-dashboard.html` ไปใส่ใน HTML Component และ Merge `Progress-page-code.example.js` ลงใน Page Code ของหน้า Progress

## ทดสอบก่อนเปิดจริง

- ทดสอบใน Admin Preview: ตรวจการโหลด Draft และการเล่นโดยไม่มีการบันทึก
- หลังผู้สอนเผยแพร่บทเรียนที่ตรวจแล้ว: เข้าสู่ระบบด้วย Site Member test account
- เล่น Matching ให้มีทั้งคำตอบถูก, ผิด และเปิดเฉลยเมื่อครบ 3 ครั้ง
- เล่น Scenario และ Keyboard ให้ครบและตรวจว่ามี `AnswerRecords` แยกตาม prefix `scenario_` และ `keyboard_`
- ตรวจ `GameAttempts`, `AnswerRecords`, `ChapterQuestionProgress` และ `MemberProgress` ใน CMS
- ทดสอบสมาชิก 2 บัญชี เพื่อยืนยันว่าแต่ละบัญชีเห็นเฉพาะ Progress ของตัวเอง

## ขอบเขตที่ยังไม่ได้ทำใน Wix จริง

โค้ดและตัวอย่าง Page Code ถูกเตรียมและตรวจ syntax แล้วใน branch นี้ แต่ยังไม่ได้ใส่ลง Wix Editor Code panel, ไม่ได้ทดสอบการเชื่อมต่อ HTML Component บนไซต์จริง และไม่ได้ Publish การแก้ไขเว็บไซต์ เนื่องจาก Wix ต้องให้เจ้าของไซต์เชื่อม GitHub Integration หรือเพิ่มไฟล์ผ่าน Editor ก่อน

Branch: `feat/velo-learning-game-integration`