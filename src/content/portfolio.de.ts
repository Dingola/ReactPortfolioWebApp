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
  experience: [],
  education: [],
  skillGroups: [
    {
      id: 'core-development',
      title: 'Schwerpunkt',
      skills: [
        { id: 'cpp', label: 'C++', emphasis: 'primary' },
        { id: 'qt', label: 'Qt', emphasis: 'primary' },
      ],
    },
    {
      id: 'build-quality',
      title: 'Build und Qualität',
      skills: [
        { id: 'cmake', label: 'CMake', emphasis: 'primary' },
        { id: 'msvc', label: 'MSVC', emphasis: 'supporting' },
        { id: 'git', label: 'Git', emphasis: 'primary' },
        { id: 'clang-tidy', label: 'Clang-Tidy', emphasis: 'supporting' },
        { id: 'valgrind', label: 'Valgrind', emphasis: 'supporting' },
        { id: 'sanitizers', label: 'Sanitizer', emphasis: 'supporting' },
      ],
    },
    {
      id: 'testing-documentation',
      title: 'Testing und Dokumentation',
      skills: [
        { id: 'google-test', label: 'GoogleTest', emphasis: 'primary' },
        { id: 'doxygen', label: 'Doxygen', emphasis: 'supporting' },
        { id: 'codecov', label: 'Codecov', emphasis: 'supporting' },
      ],
    },
    {
      id: 'ci-cd-deployment',
      title: 'CI/CD und Deployment',
      skills: [
        { id: 'github-actions', label: 'GitHub Actions', emphasis: 'primary' },
        { id: 'docker', label: 'Docker', emphasis: 'supporting' },
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
        { id: 'visual-studio', label: 'Visual Studio', emphasis: 'supporting' },
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
