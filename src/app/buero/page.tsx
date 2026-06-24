import SiteLayout from '@/components/SiteLayout';

export default function BueroPage() {
  return (
    <SiteLayout>
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Portrait</h1>

        <p style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 20, color: '#333' }}>
          Die Cityplan AG wurde in Zürich gegründet. Als Architekturbüro und Generalunternehmung
          begleiten wir unsere Bauherrschaften von der ersten Idee bis zur schlüsselfertigen Übergabe.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 20, color: '#333' }}>
          Unsere Projekte haben einen starken Bezug zum Ort und seinem Umfeld. Der sparsame Umgang
          mit Ressourcen, der richtige Einsatz von Materialien, Licht und Farbe sind bestimmende
          Faktoren in unserer Arbeit.
        </p>

        <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 40, marginBottom: 12 }}>Organisation</h2>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: '#333' }}>
          Die Cityplan AG ist inhabergeführt. Die schlanke Organisationsstruktur garantiert eine
          verlässliche Partnerschaft und direkte Kommunikation mit der Bauherrschaft.
        </p>
      </article>
    </SiteLayout>
  );
}
