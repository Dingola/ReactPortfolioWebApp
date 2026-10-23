import type { PortfolioContent } from './types';

/** English source content for the portfolio. */
export const englishPortfolioContent = {
  locale: 'en',
  profile: {
    name: 'Adrian Helbig',
    role: 'C++ Software Developer',
    location: 'Berlin, Germany',
    introduction:
      'I develop desktop applications with C++ and Qt while also exploring additional technologies and building my own projects.',
  },
  about: {
    statement:
      'Translating complex requirements into clear, reliable software is at the core of my work.',
    paragraphs: [
      'My professional focus is on desktop applications built with C++ and Qt. I combine data models, business logic, and graphical user interfaces into modular applications designed for long-term maintainability.',
      'For me, quality does not begin at the end: clean code, automated tests, static and dynamic analysis, and reproducible build processes are integral to how I work.',
      'Since 2024, I have worked intensively with AI-assisted and agentic software development. I use Codex and GitHub Copilot in a structured way for implementing requirements, analysing code, refactoring, and quality assurance, while retaining full technical oversight.',
    ],
    workingPrinciples: [
      {
        id: 'robust-solutions',
        title: 'Robust solutions',
        description:
          'Software should remain reliable, understandable, and maintainable under real-world conditions.',
      },
      {
        id: 'modular-architecture',
        title: 'Modular architecture',
        description:
          'Clear responsibilities and reusable components make complex requirements manageable.',
      },
      {
        id: 'quality-process',
        title: 'Quality as a process',
        description:
          'Tests, analysis tools, and automated builds support the development process continuously.',
      },
      {
        id: 'direct-collaboration',
        title: 'Direct collaboration',
        description:
          'Short communication paths, technical exchange, and shared responsibility lead to better solutions.',
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
        'A Qt-based desktop application for opening, exploring, and filtering large log files with multiple views, sessions, and reusable parsing profiles.',
      categories: ['tool'],
      technologies: ['C++20', 'Qt 6', 'SQLite', 'CMake', 'GoogleTest'],
      details: {
        goal: 'Create a powerful desktop application for efficiently investigating large log files with different structures.',
        problem:
          'Large log files are difficult to analyse with basic text editors. Different formats, substantial data volumes, and connected workflows complicate searching, filtering, and resuming an analysis.',
        solution:
          'Qt Log Viewer combines asynchronous loading, persistent SQLite caches, and configurable parsing profiles with independent views, filters, and reusable sessions.',
        features: [
          'Multiple views with independent filters, search patterns, and page states',
          'Configurable parsing profiles with custom fields and an import preview',
          'Reusable sessions, recently opened files, and a structured file explorer',
          'Live updates for growing log files, including rotation detection',
        ],
        technicalDecisions: [
          'C++20 and Qt 6 for a native, cross-platform desktop application',
          'Persistent SQLite caches for fast repeated queries across large files',
          'Asynchronous loading and batched model construction for a responsive interface',
          'Separate models, presenters, controllers, and services with clear responsibilities',
        ],
        qualityAssurance: [
          'Extensive automated tests with GoogleTest',
          'Build and test workflows for Windows, Linux, and macOS',
          'Code coverage with Codecov and static analysis with Clang-Tidy',
          'Sanitizers and Valgrind for dynamic runtime analysis',
        ],
      },
      links: {
        repository: 'https://github.com/Dingola/Qt-LogViewer',
        documentation: 'https://github.com/Dingola/Qt-LogViewer#readme',
      },
      images: [
        {
          src: '/images/projects/qt-log-viewer/log-view.png',
          alt: 'Qt Log Viewer displaying an open log file, filters, and the details panel',
          caption: 'Log view with filters, search, and the details panel',
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
        {
          src: '/images/projects/qt-log-viewer/log-file-import.png',
          alt: 'Qt Log Viewer showing a parsing profile and preview while importing a log file',
          caption: 'Import preview with parsing profile, detected fields, and validation',
          width: 2560,
          height: 1400,
          sources: [
            {
              type: 'image/avif',
              srcSet:
                '/images/projects/qt-log-viewer/log-file-import-640.avif 640w, /images/projects/qt-log-viewer/log-file-import-1280.avif 1280w, /images/projects/qt-log-viewer/log-file-import-2560.avif 2560w',
            },
          ],
        },
        {
          src: '/images/projects/qt-log-viewer/start-page.png',
          alt: 'Qt Log Viewer start page with a recently opened file and a saved session',
          caption: 'Start page with recently opened files and saved sessions',
          width: 2560,
          height: 1400,
          sources: [
            {
              type: 'image/avif',
              srcSet:
                '/images/projects/qt-log-viewer/start-page-640.avif 640w, /images/projects/qt-log-viewer/start-page-1280.avif 1280w, /images/projects/qt-log-viewer/start-page-2560.avif 2560w',
            },
          ],
        },
        {
          src: '/images/projects/qt-log-viewer/start-page-empty.png',
          alt: 'Empty Qt Log Viewer start page with actions for opening files and sessions',
          caption: 'Empty initial state with direct actions for log files and sessions',
          width: 2560,
          height: 1400,
          sources: [
            {
              type: 'image/avif',
              srcSet:
                '/images/projects/qt-log-viewer/start-page-empty-640.avif 640w, /images/projects/qt-log-viewer/start-page-empty-1280.avif 1280w, /images/projects/qt-log-viewer/start-page-empty-2560.avif 2560w',
            },
          ],
        },
      ],
      featured: true,
    },
    {
      id: 'qt-record-parser',
      slug: 'qt-record-parser',
      title: 'QtRecordParser',
      summary:
        'A configurable Qt 6 library that converts structured text records into dynamically named and typed values.',
      categories: ['library'],
      technologies: ['C++20', 'Qt 6', 'CMake', 'GoogleTest', 'Codecov'],
      details: {
        goal: 'Reliably capture differently structured text records using reusable configurations and convert them directly into typed values.',
        problem:
          'Files, data streams, and imported records use different field formats. Hard-coded parser logic quickly leads to duplicated extraction, validation, and conversion code.',
        solution:
          'A serialisable configuration defines placeholders, regular expressions, and converters. The parser builds an anchored combined pattern, extracts fields, and returns either a typed record or structured error details.',
        features: [
          'Placeholder-based formats with configurable capture patterns',
          'Built-in converters for text, integers, floating-point numbers, Boolean values, and timestamps',
          'JSON serialisation of parser and field configurations',
          'Extensible converter registry for application-specific data types',
          'Structured error categories with field context and understandable messages',
        ],
        technicalDecisions: [
          'Separate responsibilities for configuration, field extraction, and value conversion',
          'Dynamically named results based on QVariant',
          'Stable converter IDs for serialisable configurations and custom extensions',
          'Explicit ParseResult return values instead of exception-based error handling',
        ],
        qualityAssurance: [
          'Extensive GoogleTest coverage for configurations, converters, error cases, and parser behaviour',
          'Automated build and test workflows for Windows, Linux, and macOS',
          'Code coverage reporting with Codecov',
          'Optional static analysis with Clang-Tidy and API documentation with Doxygen',
        ],
      },
      links: {
        repository: 'https://github.com/Dingola/QtRecordParser',
        documentation: 'https://github.com/Dingola/QtRecordParser#readme',
      },
      images: [],
      featured: true,
    },
    {
      id: 'simple-logger-libraries',
      slug: 'simple-logger-libraries',
      title: 'SimpleCppLogger & SimpleQtLogger',
      summary:
        'A connected family of C++20 logging libraries with a thread-safe core, flexible outputs, and focused Qt integration.',
      categories: ['library'],
      technologies: ['C++20', 'Qt 6', 'CMake', 'GoogleTest', 'Codecov'],
      details: {
        goal: 'Provide a lightweight logging foundation that remains usable in pure C++ and can be extended specifically for Qt applications.',
        problem:
          'A direct dependency on Qt limits reusability, while separate loggers for C++ and Qt projects would duplicate log levels, formatting, outputs, and synchronisation.',
        solution:
          'SimpleCppLogger provides the platform-independent, thread-safe core with interchangeable appenders and formatters. SimpleQtLogger builds on it with Qt message forwarding, Qt-based file output, and JSON and HTML formatting.',
        features: [
          'Thread-safe logger with multiple appenders and configurable log levels',
          'Stream and macro interfaces with automatic source-location capture',
          'Extensible appender and formatter interfaces with console output in the C++ core',
          'Forwarding from the global Qt message handler to the shared logger',
          'Qt-based file output with compact JSON and customisable HTML formatting',
        ],
        technicalDecisions: [
          'Clear separation between the Qt-independent core library and the Qt extension built on top of it',
          'Abstract appender and formatter interfaces for interchangeable outputs and representations',
          'Mutex-protected logger configuration and message output',
          'Shared log-level and message model across both libraries',
        ],
        qualityAssurance: [
          'GoogleTest coverage for the logger, log levels, streams, macros, appenders, and formatters',
          'Focused tests for Qt message forwarding, file output, and JSON and HTML results',
          'Automated build and test workflows for Windows, Linux, and macOS',
          'Code coverage with Codecov plus optional Clang-Tidy and sanitizer checks',
        ],
      },
      links: {
        repositories: [
          { label: 'SimpleCppLogger', href: 'https://github.com/Dingola/SimpleCppLogger' },
          { label: 'SimpleQtLogger', href: 'https://github.com/Dingola/SimpleQtLogger' },
        ],
      },
      images: [],
      featured: true,
    },
    {
      id: 'qt-widgets-common-lib',
      slug: 'qt-widgets-common-lib',
      title: 'Qt Widgets Common Library',
      summary:
        'A reusable foundation containing services, utilities, and UI components for Qt Widgets applications.',
      categories: ['library'],
      technologies: ['C++20', 'Qt 6', 'CMake', 'GoogleTest'],
      details: {
        goal: 'Provide recurring infrastructure and user-interface building blocks for Qt Widgets applications in one reusable library.',
        problem:
          'Application shells, window settings, translations, themes, and general UI utilities are often implemented repeatedly across desktop projects and consequently evolve inconsistently.',
        solution:
          'The library combines shared services, utilities, and widgets behind stable interfaces and can be integrated into other Qt projects as a static library.',
        features: [
          'Shared application windows and platform-specific title bars',
          'Persistence for window state and UI settings',
          'Theme, stylesheet, and translation infrastructure',
          'Reusable layouts, UI utilities, and formatting functions',
        ],
        technicalDecisions: [
          'C++20 and Qt 6 as the shared technical foundation',
          'Interfaces for theme, language, and UI settings to decouple consumers',
          'CMake-based integration as a static library',
        ],
        qualityAssurance: [
          'Automated tests with GoogleTest',
          'Build and test workflows for Windows, Linux, and macOS',
          'Code coverage with Codecov plus optional Clang and sanitizer checks',
          'Generated API documentation with Doxygen',
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
        'A modern developer portfolio with typed content, responsive presentation, and automated quality checks.',
      categories: ['web'],
      technologies: ['React', 'TypeScript', 'Vite', 'Vitest', 'Playwright'],
      details: {
        goal: 'Present professional experience, technical expertise, and personal software projects in a clear, modern, and accessible portfolio.',
        problem:
          'The previous portfolio website did not provide a sufficiently flexible foundation for detailed project presentations, consistent responsive layouts, and maintainable long-term development.',
        solution:
          'The application separates typed content, interface messages, reusable components, and page presentation while combining them through a responsive design system.',
        features: [
          'Responsive project, résumé, about, and contact pages',
          'Filterable project overview and structured career presentation',
          'Light and dark colour schemes with accessible keyboard operation',
          'Optimised responsive images and client-side page navigation',
        ],
        technicalDecisions: [
          'React and strict TypeScript for a component-based, type-safe implementation',
          'Central content models independent of their visual presentation',
          'CSS Modules and global design tokens for encapsulated, consistent styling',
          'Lazy-loaded routes and Vite for a streamlined development and build environment',
        ],
        qualityAssurance: [
          'Unit and component tests with Vitest and React Testing Library',
          'Browser and accessibility checks with Playwright and Axe',
          'ESLint, Stylelint, Prettier, and TypeScript as a complete local quality gate',
          'Automated verification through GitHub Actions',
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
  publicRepositories: [
    {
      id: 'qt-quick-common-lib',
      title: 'QtQuickCommonLib',
      summary:
        'Shared services, utilities, and UI building blocks for Qt Quick-based desktop applications.',
      technologies: ['C++20', 'Qt Quick', 'QML'],
      repository: 'https://github.com/Dingola/QtQuickCommonLib',
    },
    {
      id: 'qt-common-lib',
      title: 'QtCommonLib',
      summary:
        'UI-independent utilities for Qt 6 applications, including database and testing support.',
      technologies: ['C++20', 'Qt 6', 'GoogleTest'],
      repository: 'https://github.com/Dingola/QtCommonLib',
    },
    {
      id: 'common-lib',
      title: 'CommonLib',
      summary: 'A lightweight C++20 foundation with reusable classes, patterns, and utilities.',
      technologies: ['C++20', 'CMake', 'GoogleTest'],
      repository: 'https://github.com/Dingola/CommonLib',
    },
  ],
  projectTemplates: [
    {
      id: 'react-web-template',
      title: 'ReactWebTemplate',
      summary:
        'A Copier and GitHub template for React and TypeScript web applications with Vite, tests, documentation, and optional infrastructure.',
      technologies: ['React', 'TypeScript', 'Vite', 'Copier'],
      repository: 'https://github.com/Dingola/ReactWebTemplate',
    },
    {
      id: 'qt-widgets-template',
      title: 'QtWidgetsTemplate',
      summary:
        'A Copier and GitHub template for cross-platform Qt 6 Widgets applications and libraries.',
      technologies: ['C++20', 'Qt Widgets', 'CMake', 'Copier'],
      repository: 'https://github.com/Dingola/QtWidgetsTemplate',
    },
    {
      id: 'qt-quick-template',
      title: 'QtQuickTemplate',
      summary:
        'A Copier and GitHub template for cross-platform Qt 6 Quick/QML applications and libraries.',
      technologies: ['C++20', 'Qt Quick', 'QML', 'Copier'],
      repository: 'https://github.com/Dingola/QtQuickTemplate',
    },
    {
      id: 'cpp-template',
      title: 'CppTemplate',
      summary: 'A Copier and GitHub template for cross-platform C++20 applications and libraries.',
      technologies: ['C++20', 'CMake', 'GoogleTest', 'Copier'],
      repository: 'https://github.com/Dingola/CppTemplate',
    },
  ],
  experience: [
    {
      id: 'gfai',
      organisation: 'GFaI – Society for the Advancement of Applied Computer Science',
      role: 'Research Associate (C++/Qt Software Developer)',
      description: 'My responsibilities in the signal processing research group included:',
      startDate: '2017-09',
      endDate: '2020-10',
      highlights: [
        {
          text: 'Developing software components in C++14 using OpenGL 4.3, GLSL, and the Qt framework.',
        },
        {
          text: 'Developing and adapting graphical user interfaces for test-bench software used in an exterior noise test facility and a wind tunnel.',
        },
        {
          text: 'Developing a class for visualising directional information as parametrised arrows based on instanced rendering with OpenGL 3.3 and GLSL.',
          link: {
            label: 'DynaBeam – innovative 3D localisation of sound radiation',
            href: 'https://www.gfai.de/aktuelles/presse/news/artikel/dynabeam-innovative-3d-lokalisierung-von-schallabstrahlungen',
          },
        },
        { text: 'Developing a data model for reporting software.' },
        {
          text: 'Developing and adapting a graphical user interface for acoustic-map reporting software.',
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
      role: 'C++ Software Developer',
      startDate: '2016-09',
      endDate: '2016-11',
      highlights: [],
      technologies: ['C++'],
      organisationUrl: 'https://ghc-tech.de/',
    },
    {
      id: 'vivantes',
      organisation: 'VIVANTES Auguste-Viktoria Hospital',
      role: 'Civilian Service Volunteer',
      startDate: '2009-12',
      endDate: '2010-09',
      highlights: [
        {
          text: 'Civilian service on the neurology ward: preparing meal lists, preparing and serving meals and drinks, and supporting nursing staff in their daily work.',
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
      institution: 'Berlin University of Applied Sciences (HTW Berlin)',
      role: 'Student',
      qualification: 'Bachelor of Science (B.Sc.)',
      subject: 'Applied Computer Science, specialising in multimedia',
      startDate: '2010-10',
      endDate: '2016-04',
      details: [
        {
          text: 'Internship at IAV focused on developing an interface between Java and MATLAB.',
          link: { label: 'IAV', href: 'https://www.iav.com/' },
        },
        {
          text: 'Bachelor thesis: design and development of a measurement application for recording spectroscopic data.',
        },
      ],
      institutionUrl: 'https://www.htw-berlin.de/',
    },
    {
      id: 'osz-kim',
      institution: 'Upper Secondary Centre for Communication, Information, and Media Technology',
      role: 'Student',
      qualification: 'Advanced technical college entrance qualification',
      startDate: '2007-08',
      endDate: '2009-06',
      details: [],
      institutionUrl: 'https://www.oszkim.de/wp/',
    },
    {
      id: 'sankt-marien',
      institution: 'Sankt Marien Catholic School',
      role: 'Student',
      qualification: 'Intermediate school-leaving certificate',
      startDate: '2002-08',
      endDate: '2007-07',
      details: [],
      institutionUrl: 'https://marienschule-berlin.de/',
    },
  ],
  skillGroups: [
    {
      id: 'core-development',
      title: 'Core development',
      skills: [
        { id: 'cpp', label: 'C++', emphasis: 'primary' },
        { id: 'qt', label: 'Qt', emphasis: 'primary' },
        { id: 'opengl', label: 'OpenGL', emphasis: 'supporting' },
      ],
    },
    {
      id: 'build-quality',
      title: 'Build and quality',
      skills: [
        { id: 'cmake', label: 'CMake', emphasis: 'primary' },
        { id: 'msvc', label: 'MSVC', emphasis: 'primary' },
        { id: 'git', label: 'Git', emphasis: 'primary' },
        { id: 'clang-tools', label: 'Clang (Format / Tidy)', emphasis: 'primary' },
        { id: 'valgrind', label: 'Valgrind', emphasis: 'primary' },
        { id: 'sanitizers', label: 'Sanitizers', emphasis: 'supporting' },
      ],
    },
    {
      id: 'testing-documentation',
      title: 'Testing and documentation',
      skills: [
        { id: 'google-test', label: 'GoogleTest', emphasis: 'primary' },
        { id: 'doxygen', label: 'Doxygen', emphasis: 'primary' },
        { id: 'codecov', label: 'Codecov', emphasis: 'primary' },
      ],
    },
    {
      id: 'ci-cd-deployment',
      title: 'CI/CD and deployment',
      skills: [
        { id: 'github-actions', label: 'GitHub Actions', emphasis: 'primary' },
        { id: 'docker', label: 'Docker', emphasis: 'primary' },
        { id: 'deployment-scripting', label: 'Deployment scripts', emphasis: 'supporting' },
      ],
    },
    {
      id: 'development-tools',
      title: 'Development tools',
      skills: [
        { id: 'visual-studio', label: 'Visual Studio', emphasis: 'primary' },
        { id: 'vs-code', label: 'Visual Studio Code', emphasis: 'supporting' },
      ],
    },
    {
      id: 'web-development',
      title: 'Web development',
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
      title: 'Academic foundations',
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
    { id: 'github', kind: 'github', label: 'GitHub', href: 'https://github.com/Dingola' },
    {
      id: 'linkedin',
      kind: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/adrian-helbig',
    },
  ],
} as const satisfies PortfolioContent;
