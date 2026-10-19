import type { PortfolioContent } from './types';

/** German source content for the portfolio. */
export const germanPortfolioContent = {
  locale: 'de',
  profile: {
    name: 'Adrian Helbig',
    role: 'C++-Softwareentwickler',
    location: 'Berlin, Deutschland',
    introduction:
      'Ich entwickle Desktop-Anwendungen mit C++ und Qt und beschäftige mich daneben mit weiteren Technologien und eigenen Projekten.',
  },
  about: {
    statement:
      'Komplexe Anforderungen in verständliche, belastbare Software zu übersetzen, ist der Kern meiner Arbeit.',
    paragraphs: [
      'Mein fachlicher Schwerpunkt liegt auf Desktop-Anwendungen mit C++ und Qt. Dabei verbinde ich Datenmodelle, Geschäftslogik und grafische Benutzeroberflächen zu modularen Anwendungen, die langfristig wartbar bleiben.',
      'Qualität entsteht für mich nicht erst am Ende: Clean Code, automatisierte Tests, statische und dynamische Analyse sowie reproduzierbare Build-Prozesse gehören zu meiner Arbeitsweise.',
      'Seit 2024 beschäftige ich mich intensiv mit KI-gestützter und agentischer Softwareentwicklung. Codex und GitHub Copilot nutze ich strukturiert für die Umsetzung von Anforderungen, Codeanalyse, Refactoring und Qualitätssicherung. Die fachliche Kontrolle bleibt dabei ein fester Bestandteil.',
    ],
    workingPrinciples: [
      {
        id: 'robust-solutions',
        title: 'Robuste Lösungen',
        description:
          'Software soll auch unter realen Bedingungen zuverlässig, nachvollziehbar und wartbar bleiben.',
      },
      {
        id: 'modular-architecture',
        title: 'Modulare Architektur',
        description:
          'Klare Verantwortlichkeiten und wiederverwendbare Komponenten machen komplexe Anforderungen beherrschbar.',
      },
      {
        id: 'quality-process',
        title: 'Qualität als Prozess',
        description:
          'Tests, Analysewerkzeuge und automatisierte Builds begleiten die Entwicklung kontinuierlich.',
      },
      {
        id: 'direct-collaboration',
        title: 'Direkter Austausch',
        description:
          'Kurze Abstimmungswege, fachlicher Austausch und gemeinsame Verantwortung führen zu besseren Lösungen.',
      },
    ],
  },
  legal: {
    operatorName: 'Adrian Helbig',
    street: 'Buschrosensteig 9',
    postalCode: '12347',
    city: 'Berlin',
    email: 'email@adrianhelbig.de',
  },
  navigation: [
    { id: 'home', index: 1, label: 'Home', path: '/' },
    { id: 'work', index: 2, label: 'Work', path: '/work' },
    { id: 'resume', index: 3, label: 'Resume', path: '/resume' },
    { id: 'about', index: 4, label: 'About', path: '/about' },
    { id: 'contact', index: 5, label: 'Contact', path: '/contact' },
  ],
  projects: [
    {
      id: 'qt-log-viewer',
      slug: 'qt-log-viewer',
      title: 'Qt Log Viewer',
      summary:
        'Eine Qt-basierte Desktop-Anwendung zum Öffnen, Durchsuchen und Filtern großer Logdateien mit mehreren Ansichten, Sitzungen und wiederverwendbaren Parsing-Profilen.',
      categories: ['tool'],
      technologies: ['C++20', 'Qt 6', 'SQLite', 'CMake', 'GoogleTest'],
      details: {
        goal: 'Eine leistungsfähige Desktop-Anwendung schaffen, mit der sich umfangreiche und unterschiedlich strukturierte Logdateien effizient untersuchen lassen.',
        problem:
          'Große Logdateien sind mit einfachen Texteditoren nur schwer auszuwerten. Unterschiedliche Formate, große Datenmengen und zusammengehörige Arbeitsschritte erschweren Suche, Filterung und Wiederaufnahme einer Analyse.',
        solution:
          'Der Qt Log Viewer kombiniert asynchrones Laden, persistente SQLite-Caches und konfigurierbare Parsing-Profile mit unabhängigen Ansichten, Filtern und speicherbaren Sitzungen.',
        features: [
          'Mehrere Ansichten mit eigenen Filtern, Suchmustern und Seitenzuständen',
          'Konfigurierbare Parsing-Profile mit benutzerdefinierten Feldern und Importvorschau',
          'Speicherbare Sitzungen, zuletzt verwendete Dateien und strukturierter Datei-Explorer',
          'Live-Aktualisierung wachsender Logdateien einschließlich Rotationserkennung',
        ],
        technicalDecisions: [
          'C++20 und Qt 6 für eine native, plattformübergreifende Desktop-Anwendung',
          'Persistente SQLite-Caches für schnelle wiederholte Abfragen großer Dateien',
          'Asynchrone Ladeprozesse und stapelweiser Modellaufbau für eine reaktionsfähige Oberfläche',
          'Getrennte Modelle, Presenter, Controller und Services mit klaren Verantwortlichkeiten',
        ],
        qualityAssurance: [
          'Umfangreiche automatisierte Tests mit GoogleTest',
          'Build- und Test-Workflows für Windows, Linux und macOS',
          'Code Coverage mit Codecov sowie statische Analyse mit Clang-Tidy',
          'Sanitizer und Valgrind für die dynamische Laufzeitanalyse',
        ],
      },
      links: {
        repository: 'https://github.com/Dingola/Qt-LogViewer',
        documentation: 'https://github.com/Dingola/Qt-LogViewer#readme',
      },
      images: [
        {
          src: '/images/projects/qt-log-viewer/log-view.png',
          alt: 'Qt Log Viewer mit geöffneter Logdatei, Filtern und Detailansicht',
          caption: 'Logansicht mit Filtern, Suche und Detailbereich',
          width: 2560,
          height: 1400,
          sources: [
            {
              type: 'image/avif',
              srcSet:
                '/images/projects/qt-log-viewer/log-view-640.avif 640w, /images/projects/qt-log-viewer/log-view-1280.avif 1280w, /images/projects/qt-log-viewer/log-view-2560.avif 2560w',
            },
          ],
        },
      ],
      featured: true,
    },
    {
      id: 'qt-widgets-common-lib',
      slug: 'qt-widgets-common-lib',
      title: 'Qt Widgets Common Library',
      summary:
        'Eine wiederverwendbare Basisbibliothek mit Services, Hilfsfunktionen und UI-Komponenten für Qt-Widgets-Anwendungen.',
      categories: ['library'],
      technologies: ['C++20', 'Qt 6', 'CMake', 'GoogleTest'],
      details: {
        goal: 'Wiederkehrende Infrastruktur und Oberflächenbausteine für Qt-Widgets-Anwendungen zentral und wiederverwendbar bereitstellen.',
        problem:
          'Anwendungsrahmen, Fenstereinstellungen, Übersetzungen, Themes und allgemeine UI-Hilfen werden in Desktop-Projekten häufig mehrfach implementiert und entwickeln sich dadurch uneinheitlich weiter.',
        solution:
          'Die Bibliothek bündelt gemeinsame Services, Hilfsfunktionen und Widgets hinter stabilen Schnittstellen und lässt sich als statische Bibliothek in weitere Qt-Projekte integrieren.',
        features: [
          'Gemeinsame Anwendungsfenster und plattformspezifische Titelleisten',
          'Persistenz von Fensterzustand und UI-Einstellungen',
          'Theme-, Stylesheet- und Übersetzungsinfrastruktur',
          'Wiederverwendbare Layouts, UI-Hilfen und Formatierungsfunktionen',
        ],
        technicalDecisions: [
          'C++20 und Qt 6 als gemeinsame technische Basis',
          'Schnittstellen für Theme-, Sprach- und UI-Einstellungen zur Entkopplung der Verbraucher',
          'CMake-basierte Einbindung als statische Bibliothek',
        ],
        qualityAssurance: [
          'Automatisierte Tests mit GoogleTest',
          'Build- und Test-Workflows für Windows, Linux und macOS',
          'Code Coverage mit Codecov sowie optionale Clang- und Sanitizer-Prüfungen',
          'Generierbare API-Dokumentation mit Doxygen',
        ],
      },
      links: {
        repository: 'https://github.com/Dingola/QtWidgetsCommonLib',
        documentation: 'https://github.com/Dingola/QtWidgetsCommonLib#readme',
      },
      images: [],
      featured: true,
    },
    {
      id: 'react-portfolio-web-app',
      slug: 'react-portfolio-web-app',
      title: 'React Portfolio Web App',
      summary:
        'Ein modernes Developer-Portfolio mit typisierten Inhalten, responsiver Darstellung und automatisierten Qualitätsprüfungen.',
      categories: ['web'],
      technologies: ['React', 'TypeScript', 'Vite', 'Vitest', 'Playwright'],
      details: {
        goal: 'Berufserfahrung, technische Schwerpunkte und eigene Softwareprojekte in einem modernen, zugänglichen Portfolio nachvollziehbar präsentieren.',
        problem:
          'Die bisherige Portfolio-Webseite bot keine ausreichend flexible Grundlage für ausführliche Projektvorstellungen, eine konsistente responsive Darstellung und eine langfristig wartbare Weiterentwicklung.',
        solution:
          'Die Anwendung trennt typisierte Inhalte, UI-Texte, wiederverwendbare Komponenten und Seitendarstellung und verbindet sie mit einem responsiven Designsystem.',
        features: [
          'Responsive Projekt-, Lebenslauf-, Über-mich- und Kontaktseiten',
          'Filterbare Projektübersicht und strukturierte Lebenslaufdarstellung',
          'Helles und dunkles Farbschema mit zugänglicher Tastaturbedienung',
          'Optimierte responsive Bilder und clientseitige Seitennavigation',
        ],
        technicalDecisions: [
          'React und striktes TypeScript für eine komponentenbasierte, typsichere Umsetzung',
          'Zentrale Inhaltsmodelle unabhängig von ihrer visuellen Darstellung',
          'CSS Modules und globale Design-Tokens für gekapselte, konsistente Gestaltung',
          'Lazy geladene Routen und Vite für eine schlanke Entwicklungs- und Build-Umgebung',
        ],
        qualityAssurance: [
          'Unit- und Komponententests mit Vitest und React Testing Library',
          'Browser- und Barrierefreiheitsprüfungen mit Playwright und Axe',
          'ESLint, Stylelint, Prettier und TypeScript als vollständige lokale Qualitätsprüfung',
          'Automatisierte Prüfung über GitHub Actions',
        ],
      },
      links: {
        repository: 'https://github.com/Dingola/ReactPortfolioWebApp',
        documentation: 'https://github.com/Dingola/ReactPortfolioWebApp#readme',
      },
      images: [],
      featured: true,
    },
  ],
  experience: [
    {
      id: 'gfai',
      organisation: 'GFaI – Gesellschaft zur Förderung angewandter Informatik e. V.',
      role: 'Wissenschaftlicher Mitarbeiter (C++-/Qt-Softwareentwickler)',
      description:
        'Im Forschungsbereich Signalverarbeitung umfasste mein Aufgabengebiet folgende Tätigkeiten:',
      startDate: '2017-09',
      endDate: '2020-10',
      highlights: [
        {
          text: 'Entwicklung von Softwarebausteinen in C++14 unter Verwendung von OpenGL 4.3, GLSL und dem Qt-Framework.',
        },
        {
          text: 'Entwicklung und Anpassung grafischer Benutzeroberflächen für Prüfstandssoftware eines Außengeräuschprüfstands und eines Windkanals.',
        },
        {
          text: 'Entwicklung einer Klasse zur Visualisierung von Richtungsinformationen als parametrisierbare Pfeile auf Basis von Instanced Rendering mit OpenGL 3.3 und GLSL.',
          link: {
            label: 'DynaBeam – innovative 3D-Lokalisierung von Schallabstrahlungen',
            href: 'https://www.gfai.de/aktuelles/presse/news/artikel/dynabeam-innovative-3d-lokalisierung-von-schallabstrahlungen',
          },
        },
        {
          text: 'Entwicklung eines Datenmodells für eine Reporting-Software.',
        },
        {
          text: 'Entwicklung und Anpassung einer grafischen Benutzeroberfläche für eine Reporting-Software für akustische Karten.',
          link: {
            label: 'NoiseImage Conclusions',
            href: 'https://www.gfaitech.com/de/produkte/akustische-kamera/software-noiseimage/noiseimage-conclusions',
          },
        },
      ],
      technologies: ['C++14', 'Qt', 'OpenGL', 'GLSL'],
      organisationUrl: 'https://www.gfai.de/',
    },
    {
      id: 'ghc',
      organisation: 'GHC – Global Health Care GmbH',
      role: 'C++-Softwareentwickler',
      startDate: '2016-09',
      endDate: '2016-11',
      highlights: [],
      technologies: ['C++'],
      organisationUrl: 'https://ghc-tech.de/',
    },
    {
      id: 'vivantes',
      organisation: 'VIVANTES Auguste-Viktoria-Klinikum',
      role: 'Zivildienstleistender',
      startDate: '2009-12',
      endDate: '2010-09',
      highlights: [
        {
          text: 'Zivildienst auf der Station für Neurologie: Erstellung von Speiselisten, Vorbereitung und Ausgabe von Mahlzeiten und Getränken sowie Unterstützung des Pflegepersonals im Arbeitsablauf.',
        },
      ],
      technologies: [],
      organisationUrl:
        'https://www.vivantes.de/auguste-viktoria-klinikum/neurologie-mit-stroke-unit',
    },
  ],
  education: [
    {
      id: 'htw-berlin',
      institution: 'Hochschule für Technik und Wirtschaft Berlin (HTW Berlin)',
      role: 'Student',
      qualification: 'Bachelor of Science (B. Sc.)',
      subject: 'Angewandte Informatik, Schwerpunkt Multimedia',
      startDate: '2010-10',
      endDate: '2016-04',
      details: [
        {
          text: 'Praktikum bei der IAV mit dem Schwerpunkt auf der Entwicklung einer Schnittstelle zwischen Java und MATLAB.',
          link: { label: 'IAV', href: 'https://www.iav.com/' },
        },
        {
          text: 'Bachelorarbeit: Konzeption und Entwicklung eines Messprogramms zur Aufnahme spektroskopischer Daten.',
        },
      ],
      institutionUrl: 'https://www.htw-berlin.de/',
    },
    {
      id: 'osz-kim',
      institution: 'Oberstufenzentrum Kommunikations-, Informations- und Medientechnik',
      role: 'Schüler',
      qualification: 'Allgemeine Fachhochschulreife (FOS)',
      startDate: '2007-08',
      endDate: '2009-06',
      details: [],
      institutionUrl: 'https://www.oszkim.de/wp/',
    },
    {
      id: 'sankt-marien',
      institution: 'Katholische Schule Sankt Marien',
      role: 'Schüler',
      qualification: 'Mittlerer Schulabschluss (MSA)',
      startDate: '2002-08',
      endDate: '2007-07',
      details: [],
      institutionUrl: 'https://marienschule-berlin.de/',
    },
  ],
  skillGroups: [
    {
      id: 'core-development',
      title: 'Schwerpunkt',
      skills: [
        { id: 'cpp', label: 'C++', emphasis: 'primary' },
        { id: 'qt', label: 'Qt', emphasis: 'primary' },
        { id: 'opengl', label: 'OpenGL', emphasis: 'supporting' },
      ],
    },
    {
      id: 'build-quality',
      title: 'Build und Qualität',
      skills: [
        { id: 'cmake', label: 'CMake', emphasis: 'primary' },
        { id: 'msvc', label: 'MSVC', emphasis: 'primary' },
        { id: 'git', label: 'Git', emphasis: 'primary' },
        { id: 'clang-tools', label: 'Clang (Format / Tidy)', emphasis: 'primary' },
        { id: 'valgrind', label: 'Valgrind', emphasis: 'primary' },
        { id: 'sanitizers', label: 'Sanitizer', emphasis: 'supporting' },
      ],
    },
    {
      id: 'testing-documentation',
      title: 'Testing und Dokumentation',
      skills: [
        { id: 'google-test', label: 'GoogleTest', emphasis: 'primary' },
        { id: 'doxygen', label: 'Doxygen', emphasis: 'primary' },
        { id: 'codecov', label: 'Codecov', emphasis: 'primary' },
      ],
    },
    {
      id: 'ci-cd-deployment',
      title: 'CI/CD und Deployment',
      skills: [
        { id: 'github-actions', label: 'GitHub Actions', emphasis: 'primary' },
        { id: 'docker', label: 'Docker', emphasis: 'primary' },
        {
          id: 'deployment-scripting',
          label: 'Deployment-Skripte',
          emphasis: 'supporting',
        },
      ],
    },
    {
      id: 'development-tools',
      title: 'Entwicklungswerkzeuge',
      skills: [
        { id: 'visual-studio', label: 'Visual Studio', emphasis: 'primary' },
        { id: 'vs-code', label: 'Visual Studio Code', emphasis: 'supporting' },
      ],
    },
    {
      id: 'web-development',
      title: 'Webentwicklung',
      skills: [
        { id: 'typescript', label: 'TypeScript', emphasis: 'supporting' },
        { id: 'javascript', label: 'JavaScript', emphasis: 'supporting' },
        { id: 'react', label: 'React', emphasis: 'supporting' },
        { id: 'node-js', label: 'Node.js', emphasis: 'supporting' },
        { id: 'html', label: 'HTML', emphasis: 'supporting' },
        { id: 'css', label: 'CSS', emphasis: 'supporting' },
      ],
    },
    {
      id: 'academic-foundations',
      title: 'Akademische Grundlagen',
      skills: [
        { id: 'c', label: 'C', emphasis: 'foundational' },
        { id: 'java', label: 'Java', emphasis: 'foundational' },
        { id: 'erlang', label: 'Erlang', emphasis: 'foundational' },
        { id: 'prolog', label: 'Prolog', emphasis: 'foundational' },
        { id: 'labview', label: 'LabVIEW (G)', emphasis: 'foundational' },
      ],
    },
  ],
  certificates: [],
  contactLinks: [
    {
      id: 'email',
      kind: 'email',
      label: 'email@adrianhelbig.de',
      href: 'mailto:email@adrianhelbig.de',
    },
    {
      id: 'github',
      kind: 'github',
      label: 'GitHub',
      href: 'https://github.com/Dingola',
    },
    {
      id: 'linkedin',
      kind: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adrian-helbig',
    },
  ],
} as const satisfies PortfolioContent;
