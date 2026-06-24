import SiteLayout from '@/components/SiteLayout';

export default function KontaktPage() {
  return (
    <SiteLayout>
      <article style={{ maxWidth: 480, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 28 }}>Kontakt</h1>

        <address style={{ fontStyle: 'normal', fontSize: 14, lineHeight: 2, color: '#333' }}>
          <strong>Cityplan AG</strong><br />
          Musterstrasse 12<br />
          8001 Zürich<br /><br />
          T <a href="tel:+41440000000">+41 44 000 00 00</a><br />
          <a href="mailto:info@cityplanag.ch">info@cityplanag.ch</a>
        </address>
      </article>
    </SiteLayout>
  );
}
