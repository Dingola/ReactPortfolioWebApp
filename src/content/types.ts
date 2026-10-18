import type { Locale } from '@/i18n/locales';

/** Primary routes shown in the portfolio navigation. */
export type PortfolioRoute = '/' | '/work' | '/resume' | '/about' | '/contact';

/** A numbered entry in the primary portfolio navigation. */
export interface NavigationItem {
  readonly id: string;
  readonly index: number;
  readonly label: string;
  readonly path: PortfolioRoute;
}

/** Image metadata used by project cards and project detail pages. */
export interface PortfolioImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** Supported project group used by the work-page filters. */
export type ProjectCategory = 'web' | 'tool' | 'library' | 'game' | 'other';

/** A portfolio project with optional source, live, and image references. */
export interface PortfolioProject {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly categories: readonly ProjectCategory[];
  readonly technologies: readonly string[];
  readonly sourceUrl?: string;
  readonly liveUrl?: string;
  readonly images: readonly PortfolioImage[];
  readonly featured: boolean;
}

/** A professional position shown in reverse chronological order. */
export interface ExperienceEntry {
  readonly id: string;
  readonly organisation: string;
  readonly role: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly organisationUrl?: string;
}

/** A degree or other education entry shown on the resume page. */
export interface EducationEntry {
  readonly id: string;
  readonly institution: string;
  readonly qualification: string;
  readonly subject: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly details: readonly string[];
  readonly institutionUrl?: string;
}

/** The relative importance of a skill without an artificial numeric score. */
export type SkillEmphasis = 'primary' | 'supporting' | 'foundational';

/** A named skill grouped for the home and resume pages. */
export interface SkillItem {
  readonly id: string;
  readonly label: string;
  readonly emphasis: SkillEmphasis;
}

/** A thematic skill group. */
export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly skills: readonly SkillItem[];
}

/** A professional certificate. */
export interface CertificateEntry {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly year: number;
  readonly credentialUrl?: string;
}

/** Public contact destinations supported by the contact experience. */
export type ContactKind = 'email' | 'github' | 'linkedin';

/** A public contact option displayed as a link. */
export interface ContactLink {
  readonly id: string;
  readonly kind: ContactKind;
  readonly label: string;
  readonly href: string;
}

/** Localized portfolio content independent from its visual presentation. */
export interface PortfolioContent {
  readonly locale: Locale;
  readonly profile: {
    readonly name: string;
    readonly role: string;
    readonly location: string;
    readonly introduction: string;
  };
  readonly navigation: readonly NavigationItem[];
  readonly projects: readonly PortfolioProject[];
  readonly experience: readonly ExperienceEntry[];
  readonly education: readonly EducationEntry[];
  readonly skillGroups: readonly SkillGroup[];
  readonly certificates: readonly CertificateEntry[];
  readonly contactLinks: readonly ContactLink[];
}
