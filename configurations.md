# AIE portal — configuration guide

This document lists everything you need to configure so registration (Google Sheets + guest EmailJS) works. All environment variables use the `VITE_` prefix because this is a Vite SPA: **values are embedded in the browser bundle**. Do not treat them as server secrets; anyone can see them in DevTools. Protect your backend (Apps Script deployment settings, Sheet permissions) accordingly.

---

## 1. Local project setup

1. Install [Node.js](https://nodejs.org/) (LTS recommended).
2. In a terminal, go to the app folder:
   - `cd AIE` (from the repository root).
3. Install dependencies:
   - `npm install`
4. Copy the environment template and fill it in (see section 2):
   - Copy `.env.example` to `.env` in the **same folder** as `package.json` (`AIE/.env`).
5. Start the dev server:
   - `npm run dev`
6. Production build (optional):
   - `npm run build`
   - `npm run preview` to test the built files locally.

After changing `.env`, **restart** the dev server so Vite picks up new values.

---

## 2. Environment variables (`.env`)

Create `AIE/.env` with the following keys.

| Variable | Required for | Description |
|----------|----------------|-------------|
| `VITE_GOOGLE_SCRIPT_URL` | **Guest and participant** registration | Full URL of your Google Apps Script **Web app** (POST). |
| `VITE_EMAILJS_SERVICE_ID` | **Guest** registration only (badge email) | EmailJS service ID. |
| `VITE_EMAILJS_PUBLIC_KEY` | **Guest** registration only | EmailJS public key (safe to expose in the client). |
| `VITE_EMAILJS_TEMPLATE_ID_GUEST` | **Guest** registration only | EmailJS template ID for the guest badge email. |
| `VITE_EMAILJS_TEMPLATE_ID` | Optional fallback | Used only if `VITE_EMAILJS_TEMPLATE_ID_GUEST` is empty. |

**Placeholder values:** The app treats these as “not configured” and will block or error appropriately:

- Do **not** leave `VITE_GOOGLE_SCRIPT_URL` as `your_google_script_url`.
- Do **not** leave EmailJS `VITE_EMAILJS_SERVICE_ID` as `your_service_id`.

**Example `.env` shape (replace with your real values):**

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby.../exec
VITE_EMAILJS_SERVICE_ID=service_xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
VITE_EMAILJS_TEMPLATE_ID_GUEST=template_xxxx
```

---

## 3. Google Sheets via Google Apps Script

The site sends a **POST** whose body is a **JSON string**, but with **`Content-Type: text/plain`** (not `application/json`) so the request stays a “simple” request for CORS and avoids preflight issues. Apps Script still reads `e.postData.contents` and runs `JSON.parse(...)` on it. The response should be a normal HTTP success (`2xx`).

### 3.1 Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and create a spreadsheet (or use an existing one).
2. Add a header row with columns you want, for example:
   - `submittedAt`, `type`, `serialId`, `locale`, `fullName`, `email`, `mobile`, `country`, `company`, `position`, `fieldValue`, `fieldLabel`
   - You can use fewer columns if your script maps only the fields you need; the script below is one possible layout.

### 3.2 Create the script project

1. In the spreadsheet: **Extensions → Apps Script**.
2. Replace the default code with a handler that reads JSON from POST and appends a row.

Example script (adjust sheet name and columns to match your sheet):

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
    sheet.appendRow([
      data.submittedAt || '',
      data.type || '',
      data.serialId || '',
      data.locale || '',
      data.fullName || '',
      data.email || '',
      data.mobile || '',
      data.country || '',
      data.company || '',
      data.position || '',
      data.fieldValue || '',
      data.fieldLabel || '',
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Create a sheet tab named `Registrations` (or change `getSheetByName` to your tab name).

### 3.3 Deploy as a web app

1. In the Apps Script editor: **Deploy → New deployment**.
2. Type: **Web app**.
3. **Execute as:** your Google account (often “Me”).
4. **Who has access:**
   - For a public registration form from the internet, you typically need **Anyone** (Google may label this as anyone with the link / anonymous). Choose the option that matches your security policy.
5. Copy the **Web app URL** — this is your `VITE_GOOGLE_SCRIPT_URL`.

### 3.4 CORS

The browser calls your script with `fetch` using **CORS** (not `no-cors`). If you use `no-cors` in the client, the response is **opaque**: `response.ok` is always `false` even when Google saves the row, so users see a “could not save” error while data still appears in the sheet.

If you see CORS errors in the console after switching to CORS mode:

- Redeploy the Web App (Deploy → Manage deployments → Edit → New version) and confirm **Who has access** allows your scenario.
- Search for current Google guidance on “Apps Script doPost CORS” (behavior can change).
- As an alternative, proxy requests through your own small backend (not included in this repo).

### 3.5 JSON payloads the app sends

**Guest** (`type: "guest"`):

```json
{
  "type": "guest",
  "serialId": "G-000042",
  "fullName": "...",
  "email": "...",
  "mobile": "...",
  "country": "...",
  "locale": "ar",
  "submittedAt": "2026-04-05T12:00:00.000Z"
}
```

**Participant** (`type: "participant"`):

```json
{
  "type": "participant",
  "serialId": "P-000042",
  "fullName": "...",
  "email": "...",
  "mobile": "...",
  "company": "...",
  "position": "...",
  "fieldValue": "plastics",
  "fieldLabel": "...",
  "locale": "en",
  "submittedAt": "2026-04-05T12:00:00.000Z"
}
```

The app requires `res.ok` (HTTP 2xx). If your script returns 4xx/5xx or a network error, the user sees the Sheets error message from site copy in `data.js`.

---

## 4. EmailJS (guest badge only)

Participants are **not** emailed; only guests receive the badge email after a **successful** Sheet write.

### 4.1 Account and service

1. Sign up at [EmailJS](https://www.emailjs.com/).
2. Add an **email service** (Gmail, Outlook, etc.) and note the **Service ID**.

### 4.2 Template

1. Create an **email template** for guests.
2. Map template fields to the variables the app sends (variable names must match what you put in the template):

| EmailJS template variable | Source |
|---------------------------|--------|
| `user_email` | Guest’s email (used as **To** in template settings — see EmailJS docs) |
| `reply_to` | Same as guest email |
| `serial_id` | e.g. `G-123456` |
| `full_name` | Guest name |
| `country` | Resolved country label |
| `badge_html` | Full HTML of the entry badge |
| `message` | Duplicate of `badge_html` (some setups use `message` as the body) |

3. In the template body, you can use `{{{badge_html}}}` (triple braces) if your provider supports raw HTML; otherwise use EmailJS’s recommended syntax for HTML content.

4. Copy the **Template ID** into `VITE_EMAILJS_TEMPLATE_ID_GUEST`.

### 4.3 Public key

1. In EmailJS: **Account → API keys** (or General).
2. Copy the **Public Key** into `VITE_EMAILJS_PUBLIC_KEY`.

### 4.4 Allowed origins (production)

In the EmailJS dashboard, add your production site origin (e.g. `https://yourdomain.com`) to allowed domains / origins if EmailJS requires it for your plan.

---

## 5. Registration deadlines (no env vars)

Deadlines are **not** in `.env`. They are in [`data.js`](data.js) under `deadlines`:

- `participantEndsAtIso` — participant registration closes at this instant.
- `guestEndsAtIso` — after this, registration buttons are disabled and the modal cannot be opened for new registrations.

Edit those ISO strings (and the `timezoneIana` comment for documentation) when you need to change dates.

---

## 6. Quick verification checklist

- [ ] `npm install` completed without errors.
- [ ] `AIE/.env` exists and is **not** committed to git (keep `.env` in `.gitignore`).
- [ ] `VITE_GOOGLE_SCRIPT_URL` opens only the deployed **exec** URL from Apps Script.
- [ ] Submitting a **participant** row appears in the Sheet.
- [ ] Submitting a **guest** row appears in the Sheet **and** the guest receives the email (check spam).
- [ ] With EmailJS keys missing, guest flow should show an error after a successful Sheet write (by design).

---

## 7. Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| “Could not save” / Sheets error | Web app URL, deployment “who has access”, script errors (Apps Script **Executions** log), `doPost` parsing. |
| CORS error in browser console | Web app deployment type and Google’s CORS behavior; try redeploying; consider a server proxy. |
| Guest saved but email error | `VITE_EMAILJS_*` values, template variable names, EmailJS service connection, daily sending limits. |
| **412** + `Gmail_API: Invalid grant` (see browser Network response) | The Gmail account linked in EmailJS must be **reconnected**: EmailJS dashboard → Email Services → your Gmail service → reconnect / re-authorize OAuth. Token expired or revoked. |
| Env vars ignored | Restart `npm run dev`; variable names must start with `VITE_`; file must be `AIE/.env`. |

---

## 8. Files to reference in the codebase

| Topic | File |
|-------|------|
| Env template | `.env.example` |
| Sheet POST client | `src/lib/googleSheets.ts` |
| EmailJS guest send | `src/lib/sendRegistration.ts` |
| Badge HTML | `src/lib/badgeHtml.ts` |
| Payload construction | `src/components/RegistrationModal.tsx` |
| Deadlines | `data.js` → `deadlines` |
