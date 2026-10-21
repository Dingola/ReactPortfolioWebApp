import type { Locale } from '@/i18n/locales';
import type { SourceMessage } from '@/i18n/messages';

/** Primary routes shown in the portfolio navigation. */
export type PortfolioRoute = '/' | '/work' | '/resume' | '/about' | '/contact';

/** A numbered entry in the primary portfolio navigation. */
export interface NavigationItem {
  readonly id: string;
  readonly index: number;
  readonly label: SourceMessage;
  readonly path: PortfolioRoute;
}

/** Image metadata used by project cards and project detail pages. */
export interface PortfolioImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
  readonly sources?: readonly {
    readonly type: 'image/avif' | 'image/webp';
    readonly srcSet: string;
  }[];
}

/** A labeled repository belonging to a portfolio project. */
export interface ProjectRepositoryLink {
  readonly label: string;
  readonly href: string;
}

/** Public destinations belonging to a portfolio project. */
export interface ProjectLinks {
  readonly repository?: string;
  readonly repositories?: readonly ProjectRepositoryLink[];
  readonly documentation?: string;
  readonly live?: string;
}

/** Content used to explain a project beyond its overview card. */
export interface ProjectDetails {
  readonly goal: string;
  readonly problem: string;
  readonly solution: string;
  readonly features?: readonly string[];
  readonly technicalDecisions?: readonly string[];
  readonly qualityAssurance?: readonly string[];
}

/** Supported project group used by the work-page filters. */
export type ProjectCategory = 'web' | 'tool' | 'library' | 'game' | 'other';

/** A portfolio project with optional details, public links, and image references. */
export interface PortfolioProject {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly categories: readonly ProjectCategory[];
  readonly technologies: readonly string[];
  readonly details?: ProjectDetails;
  readonly links?: ProjectLinks;
  readonly images: readonly PortfolioImage[];
  readonly featured: boolean;
}

/** An optional external reference attached to a resume detail. */
export interface ContentLink {
  readonly label: string;
  readonly href: string;
}

/** A textual resume detail with an optional supporting public link. */
export interface ContentDetail {
  readonly text: string;
  readonly link?: ContentLink;
}

/** A professional position shown in reverse chronological order. */
export interface ExperienceEntry {
  readonly id: string;
  readonly organisation: string;
  readonly role: string;
  readonly description?: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly highlights: readonly ContentDetail[];
  readonly technologies: readonly string[];
  readonly organisationUrl?: string;
}

/** A degree or other education entry shown on the resume page. */
export interface EducationEntry {
  readonly id: string;
  readonly institution: string;
  readonly role?: string;
  readonly qualification: string;
  readonly subject?: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly details: readonly ContentDetail[];
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

/** A principle that describes how the portfolio owner approaches software development. */
export interface WorkingPrinciple {
  readonly id: string;
  readonly title: string;
  readonly description: string;
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
  readonly about: {
    readonly statement: string;
    readonly paragraphs: readonly string[];
    readonly workingPrinciples: readonly WorkingPrinciple[];
  };
  readonly legal: {
    readonly operatorName: string;
    readonly street: string;
    readonly postalCode: string;
    readonly city: string;
    readonly email: string;
  };
  readonly navigation: readonly NavigationItem[];
  readonly projects: readonly PortfolioProject[];
  readonly experience: readonly ExperienceEntry[];
  readonly education: readonly EducationEntry[];
  readonly skillGroups: readonly SkillGroup[];
  readonly certificates: readonly CertificateEntry[];
  readonly contactLinks: readonly ContactLink[];
}
