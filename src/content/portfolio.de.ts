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
      sourceUrl: 'https://github.com/Dingola/Qt-LogViewer',
      images: [
        {
          src: '/images/projects/qt-log-viewer/log-view.png',
          alt: 'Qt Log Viewer mit geöffneter Logdatei, Filtern und Detailansicht',
          width: 2560,
          height: 1400,
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
      technologies: ['C++', 'Qt 6', 'CMake'],
      sourceUrl: 'https://github.com/Dingola/QtWidgetsCommonLib',
      images: [],
      featured: true,
    },
    {
      id: 'react-portfolio-web-app',
      slug: 'react-portfolio-web-app',
      title: 'React Portfolio Web App',
      summary:
        'Ein deutschsprachiges Developer-Portfolio mit typisierten Inhalten, automatisierten Qualitätsprüfungen und Vercel-Deployment.',
      categories: ['web'],
      technologies: ['React', 'TypeScript', 'Vite', 'Vitest', 'Playwright'],
      sourceUrl: 'https://github.com/Dingola/ReactPortfolioWebApp',
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
