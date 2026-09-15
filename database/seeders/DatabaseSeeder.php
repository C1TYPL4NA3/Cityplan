<?php

namespace Database\Seeders;

use App\Models\ContactContent;
use App\Models\HomeContent;
use App\Models\JobPosting;
use App\Models\JobsPageContent;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\ProjectImage;
use App\Models\ProfileContent;
use App\Models\ProjectsPageContent;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

/**
 * Seeds the database with the real text/images taken directly from the
 * supplied HTML design mockups. Several project names and detail fields
 * (e.g. "20XX–20XX", "[Angabe Bauherrschaft]") are placeholders the
 * mockups themselves marked as provisional — they are seeded as-is and
 * should be replaced with real project data via the admin panel.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSiteSettings();
        $this->seedHomeContent();
        $this->seedProfileContent();
        $this->seedContactContent();
        $this->seedProjectsPageContent();
        $this->seedProjects();
        $this->seedJobsPageContent();
        $this->seedJobs();
    }

    private function seedSiteSettings(): void
    {
        SiteSetting::current()->update([
            'company_name' => 'Cityplan AG Zürich',
            'tagline' => 'Architektur & Generalunternehmung',
            'city' => 'Zürich',
            'phone' => '+41 44 218 93 11',
            'email' => 'info@cityplanag.ch',
            'website' => 'www.cityplanag.ch',
            'logo' => 'seed/logo/cityplan-logo.png',
            'footer_leistungen' => [
                ['label' => 'Planung'],
                ['label' => 'Umbau & Sanierung'],
                ['label' => 'Ausschreibung'],
                ['label' => 'Baumanagement'],
                ['label' => 'Bauherrenvertretung'],
            ],
            'seo_default_title' => 'Cityplan AG Zürich — Architektur & Generalunternehmung',
            'seo_default_description' => 'Seit über 25 Jahren begleiten wir Bauvorhaben in Zürich und Umgebung – von der ersten Analyse und Planung bis zur erfolgreichen Realisation und Übergabe.',
        ]);
    }

    private function seedHomeContent(): void
    {
        HomeContent::current()->update([
            'hero_eyebrow' => 'cityplan AG Zürich',
            'hero_heading_line1' => 'Architektur.',
            'hero_heading_line2' => 'Umbau.',
            'hero_heading_line3' => 'Realisation.',
            'hero_text' => 'Seit über 25 Jahren begleiten wir Bauvorhaben in Zürich und Umgebung – von der ersten Analyse und Planung bis zur erfolgreichen Realisation und Übergabe.',
            'hero_image' => 'seed/projects/wohnanlage.jpg',
            'hero_image_alt' => 'Architekturprojekt',
            'stats' => [
                ['value' => '25+', 'label' => 'Jahre Erfahrung in Planung und Realisation'],
                ['value' => 'Zürich', 'label' => 'Verankert im Herzen der Stadt'],
                ['value' => '360°', 'label' => 'Von der Machbarkeit bis zur Übergabe'],
                ['value' => 'Fokus', 'label' => 'Umbau, Sanierung und Bestandsbauten'],
            ],
            'section_heading' => 'Erfahrung im Bestand. Präzision in der Umsetzung.',
            'section_lead' => 'Wir verbinden Architektur, Planung und Baumanagement zu einem durchgängigen Prozess. Im Mittelpunkt stehen klare Abläufe, sorgfältige Details und eine zuverlässige Realisation.',
            'cards' => [
                ['number' => '01 · Planung', 'title' => 'Analyse & Entwicklung', 'text' => 'Machbarkeit, Projektentwicklung, Detailplanung, Studien und Sanierungskonzepte.'],
                ['number' => '02 · Ausschreibung', 'title' => 'Kosten & Submission', 'text' => 'Kostengrundlagen, Ausschreibungen, Unternehmer-Submissionen und Vergabe.'],
                ['number' => '03 · Realisation', 'title' => 'Bauausführung & Management', 'text' => 'Bauleitung, Koordination, Qualität, Termine, Abnahmen und Projektabschluss.'],
            ],
            'feature_heading' => 'Umbau und Sanierung mit Erfahrung.',
            'feature_text' => 'Bestehende Gebäude bringen ihre eigene Geschichte, Konstruktion und technische Ausgangslage mit. Wir entwickeln Lösungen, die vorhandene Qualitäten respektieren und neue Anforderungen präzise integrieren. Dabei arbeiten wir eng mit Bauherrschaften, Fachplanern, Spezialisten und ausführenden Unternehmen zusammen.',
            'feature_image' => 'seed/projects/wohnliegenschaft-sanierung.jpg',
            'feature_image_alt' => 'Modernes Bauprojekt',
            'cta_heading' => 'Sie planen ein Bauvorhaben?',
            'cta_text' => 'Gerne besprechen wir die Ausgangslage und die nächsten Schritte für Ihr Projekt.',
            'cta_button_label' => 'Projekt besprechen',
            'cta_button_link' => '/kontakt',
        ]);
    }

    private function seedProfileContent(): void
    {
        ProfileContent::current()->update([
            'overview_heading' => 'Architektur und Generalunternehmung mit Weitblick.',
            'overview_lead' => 'Wir planen und realisieren Neubauten, Umbauten und Sanierungen mit einem klaren Anspruch an Qualität, Funktionalität und gestalterische Präzision.',
            'overview_text' => 'Seit über 25 Jahren begleitet die Cityplan AG Zürich private und institutionelle Auftraggeber durch sämtliche relevanten Projektphasen – von der Analyse und Projektentwicklung über Ausschreibung und Koordination bis zur erfolgreichen Umsetzung. Unsere Erfahrung reicht von Wohn- und Gewerbebauten bis zu komplexen Aufgaben im Bestand.',
            'overview_image' => 'seed/profile/profil-overview-hero.png',
            'overview_image_alt' => 'Moderner Wohn- und Gewerbebau mit begrüntem Hof',
            'metrics' => [
                ['label' => 'Leistungsfeld 01', 'title' => 'Neubau', 'text' => 'Entwicklung, Planung und Realisation von Wohn-, Gewerbe- und Industriebauten.'],
                ['label' => 'Leistungsfeld 02', 'title' => 'Umbau & Sanierung', 'text' => 'Weiterbauen im Bestand mit Respekt für Substanz, Nutzung und architektonischen Charakter.'],
                ['label' => 'Leistungsfeld 03', 'title' => 'Ausschreibung & Vergabe', 'text' => 'Professionelle Submissionen, klare Kostengrundlagen und saubere Vergabeprozesse.'],
                ['label' => 'Leistungsfeld 04', 'title' => 'Realisierung', 'text' => 'Bauleitung, Koordination und zuverlässige Umsetzung bis zur Übergabe.'],
            ],
            'about_heading' => 'Erfahrung in Neubau und Bestand. Präzision in der Umsetzung.',
            'about_paragraphs' => [
                ['text' => 'Die Cityplan AG ist ein Architektur- und Generalunternehmungsunternehmen mit Sitz im Herzen von Zürich. Seit über 25 Jahren planen und realisieren wir Wohn-, Gewerbe- und Industriebauten und begleiten unsere Auftraggeber durch sämtliche relevanten Projektphasen.'],
                ['text' => 'Unsere Tätigkeit umfasst Neubauten ebenso wie den Umbau und die Sanierung von Geschäftsliegenschaften, Wohnbauten und Einzelwohnungen. Dabei verbinden wir den respektvollen Umgang mit bestehender Bausubstanz mit zeitgemässen Anforderungen an Funktion, Technik, Wirtschaftlichkeit und Gestaltung.'],
                ['text' => 'Unsere Erfahrung mit Altbauten und denkmalpflegerischen Rahmenbedingungen erlaubt uns, bestehende Qualitäten zu erkennen und gezielt weiterzuentwickeln. Handwerkliche Details, Materialität und der individuelle Charakter eines Gebäudes spielen dabei eine zentrale Rolle.'],
            ],
            'quote_text' => 'Gute Architektur entsteht für uns dort, wo Bestand, Funktion, Gestaltung und eine sorgfältige Realisation zusammenfinden.',
            'mini_cards' => [
                ['title' => 'Unsere Auftraggeber', 'text' => 'Institutionelle Bauherrschaften, Unternehmen, Generalunternehmer, private Auftraggeber und Gemeinden.'],
                ['title' => 'Unser Fokus', 'text' => 'Neubauten, Umbauten und Sanierungen – von einzelnen Nutzungseinheiten bis zu komplexen Geschäfts- und Wohnliegenschaften.'],
                ['title' => 'Unser Anspruch', 'text' => 'Klare Prozesse, verlässliche Kommunikation und eine Realisation mit Blick auf Termine, Kosten und Qualität.'],
            ],
            'services' => [
                ['number' => '01 · Planung', 'title' => 'Analyse & Entwicklung', 'items' => [
                    ['item' => 'Planung und Projektentwicklung'], ['item' => 'Machbarkeitsstudien'], ['item' => 'Schätzungen und Grundlagen'],
                    ['item' => 'Detailplanung'], ['item' => 'Studien und Expertisen'], ['item' => 'Unterhalts- und Sanierungskonzepte'], ['item' => 'Architekturwettbewerbe'],
                ]],
                ['number' => '02 · Ausschreibung', 'title' => 'Kosten & Submission', 'items' => [
                    ['item' => 'Kostenkalkulation und Kostenvoranschläge'], ['item' => 'Ausschreibungen sämtlicher Arbeitsgattungen'],
                    ['item' => 'Unternehmer-Submissionen'], ['item' => 'Offertvergleich und Vergabegrundlagen'],
                    ['item' => 'Koordination mit Fachplanern'], ['item' => 'Projektbezogene Entscheidungsgrundlagen'],
                ]],
                ['number' => '03 · Realisation', 'title' => 'Bauausführung & Management', 'items' => [
                    ['item' => 'Realisation und Bauleitung'], ['item' => 'Bauausführung und Baumanagement'], ['item' => 'Bauherrenvertretung'],
                    ['item' => 'Koordination der beteiligten Unternehmen'], ['item' => 'Termin-, Kosten- und Qualitätssteuerung'], ['item' => 'Abnahmen und Projektabschluss'],
                ]],
            ],
            'feature_heading' => 'Bestehendes verstehen. Gezielt weiterentwickeln.',
            'feature_text' => 'Umbauen bedeutet für uns mehr als Erneuern: Wir analysieren Geschichte, Konstruktion und Ausgangslage jeder Liegenschaft und entwickeln Lösungen, die Bestand und neue Anforderungen sinnvoll verbinden.',
            'feature_image' => 'seed/profile/profil-feature-green.png',
            'feature_image_alt' => 'Sanierte Bestandsarchitektur',
            'feature_points' => [
                ['point' => 'Geschäftsliegenschaften'], ['point' => 'Wohnbauten & Wohnungen'], ['point' => 'Altbausubstanz'],
                ['point' => 'Denkmalpflegerische Aspekte'], ['point' => 'Nutzungsanpassungen'], ['point' => 'Technische Modernisierung'],
            ],
            'tech_heading' => 'Erfahrung mit technisch komplexen Projekten',
            'tech_text' => 'Neben klassischen Wohn- und Gewerbeprojekten verfügen wir über Erfahrung mit Bauten und Umbauten, bei denen technische Anlagen und betriebliche Anforderungen eine zentrale Rolle spielen. Planung, Fachkoordination und Bauausführung werden dabei von Beginn an aufeinander abgestimmt.',
            'tech_image' => 'seed/projects/octavo-ii-gesamtanlage.jpg',
            'tech_image_alt' => 'Architekturplanung und Baupläne',
            'tags' => [
                ['tag' => 'Gastroküchen'], ['tag' => 'Industrieanlagen'], ['tag' => 'Biolabore'], ['tag' => 'Liftanlagen'],
                ['tag' => 'Ladenumbauten'], ['tag' => 'Haustechnikanlagen'], ['tag' => 'Technische Sanierungen'],
            ],
            'clients_heading' => 'Für unterschiedliche Bauherrschaften. Mit einem klaren Ziel.',
            'clients_text' => 'Unterschiedliche Auftraggeber bringen unterschiedliche Anforderungen mit sich. Unsere Aufgabe ist es, diese früh zu verstehen, strukturiert in die Planung zu übersetzen und bis zur Realisation konsequent weiterzuführen.',
            'clients_list' => [
                ['client' => 'Institutionelle Bauherrschaften'], ['client' => 'Privatunternehmen'], ['client' => 'Generalunternehmer'],
                ['client' => 'Private Auftraggeber'], ['client' => 'Gemeinden & öffentliche Auftraggeber'], ['client' => 'Eigentümer & Immobilienorganisationen'],
            ],
            'process_steps' => [
                ['num' => '01', 'title' => 'Analyse', 'text' => 'Bestand, Bedürfnisse, Rahmenbedingungen und Machbarkeit.'],
                ['num' => '02', 'title' => 'Planung', 'text' => 'Konzept, Kosten, Fachkoordination und Detailentwicklung.'],
                ['num' => '03', 'title' => 'Ausschreibung', 'text' => 'Submission, Offerten, Vergabe und Vorbereitung der Ausführung.'],
                ['num' => '04', 'title' => 'Realisation', 'text' => 'Bauleitung, Koordination, Qualität, Termine und Kosten.'],
                ['num' => '05', 'title' => 'Übergabe', 'text' => 'Abnahmen, Abschluss und geordnete Übergabe des Projekts.'],
            ],
            'cta_heading' => 'Sie planen einen Umbau oder ein neues Bauvorhaben?',
            'cta_text' => 'Gerne besprechen wir mit Ihnen die Ausgangslage, mögliche Vorgehensweisen und die nächsten Schritte für Ihr Projekt.',
        ]);
    }

    private function seedContactContent(): void
    {
        ContactContent::current()->update([
            'hero_heading' => 'Kontakt.',
            'hero_lead' => 'Haben Sie eine Frage zu unseren Dienstleistungen oder wünschen Sie eine persönliche Beratung? Dann rufen Sie uns an oder senden Sie uns eine Nachricht.',
            'info_cards' => [
                ['number' => '01 · Projektanfrage', 'title' => 'Von der ersten Idee an.', 'text' => 'Gerne klären wir mit Ihnen Projektumfang, Rahmenbedingungen und die sinnvollsten nächsten Schritte.'],
                ['number' => '02 · Direkter Kontakt', 'title' => 'Persönlich und unkompliziert.', 'text' => 'Sie erreichen uns telefonisch oder per E-Mail. Wir melden uns persönlich bei Ihnen zurück.'],
                ['number' => '03 · Zürich', 'title' => 'Mitten in der Stadt.', 'text' => 'Unser Büro befindet sich in Zürich und ist gut erreichbar.'],
            ],
            'closing_heading' => 'Architektur beginnt mit einer Idee. Und einem guten Gespräch.',
        ]);
    }

    private function seedProjectsPageContent(): void
    {
        ProjectsPageContent::current()->update([
            'hero_eyebrow' => 'Ausgewählte Arbeiten',
            'hero_heading' => 'Projekte.',
            'hero_lead' => 'Architektur zeigt sich am stärksten im Gebauten. Eine Auswahl aus Neubau, Umbau und Sanierung – reduziert präsentiert, damit die Projekte selbst im Mittelpunkt stehen.',
            'statement_small' => 'Cityplan Projekte',
            'statement_heading' => 'Bestand weiterdenken. Neues präzise entwickeln.',
            'statement_text' => 'Grosse Bilder, wechselnde Formate und wenig Text schaffen eine ruhige, editoriale Wirkung.',
        ]);
    }

    private function seedProjects(): void
    {
        $neubau = ProjectCategory::firstOrCreate(['slug' => 'neubau'], ['name' => 'Neubau', 'order' => 1]);
        $umbau = ProjectCategory::firstOrCreate(['slug' => 'umbau-sanierung'], ['name' => 'Umbau & Sanierung', 'order' => 2]);
        $wohnen = ProjectCategory::firstOrCreate(['slug' => 'wohnen'], ['name' => 'Wohnen', 'order' => 3]);
        $gewerbe = ProjectCategory::firstOrCreate(['slug' => 'gewerbe'], ['name' => 'Gewerbe', 'order' => 4]);

        $projects = [
            [
                'name' => 'Bahnhofstrasse 44, Zürich',
                'slug' => 'bahnhofstrasse-44-zuerich',
                'location' => 'Zürich',
                'type' => 'Geschäftsliegenschaft',
                'category_id' => $umbau->id,
                'short_description' => 'Geschäftsliegenschaft',
                'main_image' => 'seed/projects/bahnhofstrasse-44-hero.jpg',
                'layout_type' => 'feature',
                'order' => 1,
            ],
            [
                'name' => 'Fritz-Fleiner-Weg, Zürich',
                'slug' => 'fritz-fleiner-weg-zuerich',
                'location' => 'Zürich',
                'type' => 'Wohnbau',
                'category_id' => $neubau->id,
                'short_description' => 'Neubau · Wohnen',
                'main_image' => 'seed/projects/fritz-fleiner-weg.jpg',
                'layout_type' => 'two',
                'order' => 2,
            ],
            [
                'name' => 'Wohnhaus, Zürich',
                'slug' => 'wohnhaus-zuerich',
                'location' => 'Zürich',
                'type' => 'Bestand',
                'category_id' => $umbau->id,
                'short_description' => 'Umbau & Sanierung',
                'main_image' => 'seed/projects/wohnhaus-zuerich.jpg',
                'layout_type' => 'two',
                'order' => 3,
            ],
            [
                'name' => 'Bahnhofstrasse 69, Zürich',
                'slug' => 'bahnhofstrasse-69-zuerich',
                'location' => 'Zürich',
                'type' => 'Fassade & Bestand',
                'category_id' => $umbau->id,
                'short_description' => 'Umbau · Geschäftsliegenschaft',
                'main_image' => 'seed/projects/bahnhofstrasse-69.jpg',
                'layout_type' => 'gallery',
                'order' => 4,
            ],
            [
                'name' => 'Bahnhofstrasse 69 – Innenausbau',
                'slug' => 'bahnhofstrasse-69-innenausbau',
                'location' => 'Zürich',
                'type' => 'Umbau & Sanierung',
                'category_id' => $umbau->id,
                'short_description' => 'Innenraum',
                'main_image' => 'seed/projects/bahnhofstrasse-69-innenausbau.jpg',
                'layout_type' => 'gallery',
                'order' => 5,
            ],
            [
                'name' => 'Octavo II',
                'slug' => 'octavo-ii-zuerich-oerlikon',
                'location' => 'Zürich-Oerlikon',
                'type' => 'Geschäftsliegenschaft',
                'category_id' => $umbau->id,
                'short_description' => 'Eine ruhige, bildstarke Projektdetailseite mit den wichtigsten Angaben zum Bauobjekt.',
                'main_image' => 'seed/projects/octavo-ii-hero.jpg',
                'layout_type' => 'wide',
                'order' => 6,
                'realisation' => '20XX–20XX',
                'bauherrschaft' => '[Angabe Bauherrschaft]',
                'objekt' => '[Angabe zum Bauobjekt]',
                'leistungen' => '[Leistungen Cityplan]',
                'description' => 'Hier steht später eine kurze Projektbeschreibung mit ungefähr 5–8 Zeilen: Ausgangslage, architektonische Idee, besondere Anforderungen und die Rolle von Cityplan. Der Text bleibt bewusst kompakt, damit die Bilder und das Bauwerk im Mittelpunkt stehen.',
                'projektgedanke_heading' => 'Farbe, Freiraum und klare Architektur.',
                'projektgedanke_text' => 'Dieser Zwischenblock kann entweder einen prägnanten Projektgedanken aufnehmen oder ganz entfallen. Er gibt der Seite denselben editorialen Rhythmus wie der Projektübersicht und schafft zwischen den Fotografien bewusst Ruhe.',
                'images' => [
                    'seed/projects/octavo-ii-innenhof.jpg',
                    'seed/projects/octavo-ii-gesamtanlage.jpg',
                    'seed/projects/octavo-ii-abend.jpg',
                ],
            ],
            [
                'name' => 'Wohnüberbauung',
                'slug' => 'wohnueberbauung',
                'location' => 'Zürich',
                'type' => 'Neubau',
                'category_id' => $neubau->id,
                'short_description' => 'Wohnen',
                'main_image' => 'seed/projects/wohnueberbauung.jpg',
                'layout_type' => 'two',
                'order' => 7,
            ],
            [
                'name' => 'Wohnliegenschaft',
                'slug' => 'wohnliegenschaft',
                'location' => 'Zürich',
                'type' => 'Sanierung',
                'category_id' => $umbau->id,
                'short_description' => 'Bestand',
                'main_image' => 'seed/projects/wohnliegenschaft-sanierung.jpg',
                'layout_type' => 'two',
                'order' => 8,
            ],
            [
                'name' => 'Wohnanlage',
                'slug' => 'wohnanlage',
                'location' => 'Zürich',
                'type' => 'Neubau',
                'category_id' => $neubau->id,
                'short_description' => 'Wohnbau',
                'main_image' => 'seed/projects/wohnanlage.jpg',
                'layout_type' => 'final_grid',
                'order' => 9,
            ],
            [
                'name' => 'NeuAltwil',
                'slug' => 'neualtwil',
                'location' => 'Zürich',
                'type' => 'Visualisierung',
                'category_id' => $neubau->id,
                'short_description' => 'Projektentwicklung',
                'main_image' => 'seed/projects/neualtwil.jpg',
                'layout_type' => 'final_grid',
                'order' => 10,
            ],
        ];

        foreach ($projects as $data) {
            $images = $data['images'] ?? [];
            unset($data['images']);
            $categoryId = $data['category_id'];
            unset($data['category_id']);

            $project = Project::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, [
                    'project_category_id' => $categoryId,
                    'status' => 'published',
                    'main_image_alt' => $data['name'],
                    'seo_title' => $data['name'] . ' — Cityplan AG Zürich',
                    'seo_description' => $data['short_description'],
                ])
            );

            foreach ($images as $i => $imagePath) {
                ProjectImage::updateOrCreate(
                    ['project_id' => $project->id, 'order' => $i],
                    ['image' => $imagePath, 'alt' => $project->name]
                );
            }
        }
    }

    private function seedJobsPageContent(): void
    {
        JobsPageContent::current()->update([
            'hero_kicker' => 'Architektur & Generalunternehmung',
            'hero_slogan_line1' => 'Wir planen.',
            'hero_slogan_line2' => 'Wir bauen.',
            'hero_slogan_line3' => 'Wir realisieren.',
            'hero_intro' => 'cityplan AG Zürich steht für Architektur und Generalunternehmung mit Anspruch. Wir realisieren Hochbauprojekte in Zürich und Umgebung – von der ersten Idee bis zur erfolgreichen Übergabe.',
            'hero_image' => 'seed/jobs/bauleiter-hochhaus.png',
            'hero_image_alt' => 'Modernes Hochbauprojekt',
            'empty_state_text' => 'Aktuell sind keine offenen Stellen ausgeschrieben. Interessierte dürfen sich gerne initiativ bewerben.',
        ]);
    }

    private function seedJobs(): void
    {
        JobPosting::updateOrCreate(
            ['title' => 'Bauleiter Hochbau (m/w/d)'],
            [
                'employment_type' => 'Festanstellung',
                'pensum' => 'Teilzeit 60–80 %',
                'location' => 'Zürich, zentrale Lage',
                'start_text' => 'Nach Vereinbarung',
                'lead' => 'Bei uns erwarten Sie vielseitige und interessante Bauprojekte, ein hoher Grad an Eigenverantwortung sowie ein kollegiales und wertschätzendes Arbeitsumfeld im Herzen von Zürich.',
                'tasks' => [
                    ['item' => 'Selbstständige Leitung und Steuerung von Hochbauprojekten über alle Phasen – von der Kostenplanung bis zur Schlussabrechnung'],
                    ['item' => 'Koordination und Überwachung der Bauausführung sowie der gesamten Baustellenorganisation'],
                    ['item' => 'Sicherstellung der Projektziele hinsichtlich Kosten, Qualität und Termine'],
                    ['item' => 'Erstellung und Bearbeitung von Submissionsunterlagen, Terminplänen, Kostenvoranschlägen, Vergabeanträgen und Werkverträgen'],
                    ['item' => 'Durchführung und Leitung von Bau- und Unternehmerbesprechungen'],
                    ['item' => 'Bauleitung und Qualitätskontrolle vor Ort'],
                    ['item' => 'Koordination und aktive Steuerung der beteiligten Unternehmer und Fachplaner'],
                    ['item' => 'Prüfung von Offerten, Ausmassen, Rechnungen und Nachträgen'],
                    ['item' => 'Begleitung von Abnahmen, Mängelbehebung und Projektabschluss'],
                    ['item' => 'Professionelle Kommunikation und Abstimmung mit Bauherrschaften, Fachplanern, Unternehmern und Behörden'],
                ],
                'profile_items' => [
                    ['item' => 'Abgeschlossene Ausbildung als Hochbauzeichner/in, Techniker/in HF Hochbau oder eine vergleichbare Qualifikation'],
                    ['item' => 'Mehrjährige Erfahrung in der Bauleitung von Hochbauprojekten in der Schweiz'],
                    ['item' => 'Fundierte Kenntnisse der SIA-Normen sowie der schweizerischen Bau- und Planungsprozesse'],
                    ['item' => 'Erfahrung in Ausschreibung, Vergabe, Terminplanung und Bauadministration'],
                    ['item' => 'Sicheres Auftreten gegenüber Unternehmern, Fachplanern und Auftraggebern'],
                    ['item' => 'Durchsetzungsvermögen, Verhandlungsgeschick und organisatorische Stärke'],
                    ['item' => 'Selbstständige, strukturierte und lösungsorientierte Arbeitsweise'],
                    ['item' => 'Teamorientierte und kommunikative Persönlichkeit'],
                    ['item' => 'Hohe Verantwortungs- und Qualitätsansprüche'],
                ],
                'benefits' => [
                    ['title' => 'Bauprojekte', 'text' => 'Spannende und abwechslungsreiche Projekte mit grossem Gestaltungsspielraum'],
                    ['title' => 'Arbeitsplatz', 'text' => 'Moderner Arbeitsplatz an zentraler Lage in Zürich'],
                    ['title' => 'Eigenverantwortung', 'text' => 'Kurze Entscheidungswege und selbstständiges Arbeiten'],
                    ['title' => 'Arbeitsbedingungen', 'text' => '25 Ferientage pro Jahr und Teilzeitpensum 60–80 %'],
                ],
                'application_info' => 'Sie sind ein erfahrener Bauleiter und suchen eine neue Herausforderung? Dann freuen wir uns auf Ihre vollständigen Bewerbungsunterlagen.',
                'status' => 'published',
                'order' => 1,
            ]
        );
    }
}
