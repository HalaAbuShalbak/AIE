export type BadgePayload = {
  fullName: string;
  company: string;
  jobTitle: string;
  sector: string;
  exhibitionDates: string;
  sloganAr: string;
  sloganEn: string;
};

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch] ?? ch);
}

/** HTML للبريد الإلكتروني وبطاقة التحميل — بدون QR حسب المواصفات */
export function buildIndustrialPassHtml(p: BadgePayload): string {
  const name = escapeHtml(p.fullName);
  const company = escapeHtml(p.company);
  const job = escapeHtml(p.jobTitle);
  const sector = escapeHtml(p.sector);
  const dates = escapeHtml(p.exhibitionDates);

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AIE — Industrial Pass</title>
</head>
<body style="margin:0;padding:24px;background:#F9FAFB;font-family:Tahoma,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:360px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <tr>
      <td style="background:#1A4A8B;color:#ffffff;padding:20px 16px;text-align:center;">
        <div style="font-size:18px;font-weight:700;letter-spacing:0.06em;">AIE</div>
        <div style="font-size:11px;opacity:0.95;margin-top:6px;">المعرض العربي الدولي للصناعات البلاستيكية</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 20px 20px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:#1A4A8B;line-height:1.3;">${name}</div>
        <div style="font-size:15px;color:#707070;margin-top:10px;">${company}</div>
        <div style="font-size:13px;color:#707070;margin-top:14px;border-top:1px solid #e5e7eb;padding-top:14px;">
          <div>${job}</div>
          <div style="margin-top:6px;">${sector}</div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#F9FAFB;padding:16px;text-align:center;font-size:12px;color:#707070;line-height:1.6;border-top:1px solid #e5e7eb;">
        <div>${dates}</div>
        <div style="margin-top:8px;">${escapeHtml(p.sloganAr)} — ${escapeHtml(p.sloganEn)}</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function downloadBadgeFile(html: string, filename = 'aie-industrial-pass.html') {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
