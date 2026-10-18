/**
 * Color mapping logic for appointment status badges across Student screens.
 *
 * Requirements:
 * - Rejected:           text-red-600 / bg-red-100 (#DC2626)
 * - Cancelled:          text-gray-500 / bg-gray-100 (#6B7280)
 * - Confirmed:          text-blue-600 / bg-blue-100 (#2563EB)
 * - Completed:          text-green-600 / bg-green-100 (#16A34A)
 * - Pending:            text-amber-600 / bg-amber-100 (#D97706)
 * - No-show:            text-violet-600 / bg-violet-100 (#7C3AED)
 * - Reschedule Pending: remain in teal color (text-teal-600 / bg-teal-100 / #0F766E)
 */

export interface StatusStyleMapping {
  textClass: string;
  bgClass: string;
  combinedClass: string;
  badgeClass: string;
  textColorHex: string;
  bgColorHex: string;
  borderColorHex: string;
}

export const STUDENT_STATUS_COLOR_MAP: Record<string, StatusStyleMapping> = {
  REJECTED: {
    textClass: 'text-red-600',
    bgClass: 'bg-red-100',
    combinedClass: 'text-red-600 bg-red-100',
    badgeClass: 'bg-red-100 text-red-600 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/60',
    textColorHex: '#DC2626',
    bgColorHex: '#FEE2E2',
    borderColorHex: '#FDA4AF',
  },
  CANCELLED: {
    textClass: 'text-gray-500',
    bgClass: 'bg-gray-100',
    combinedClass: 'text-gray-500 bg-gray-100',
    badgeClass: 'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-900/70 dark:text-gray-400 dark:border-gray-800',
    textColorHex: '#6B7280',
    bgColorHex: '#F3F4F6',
    borderColorHex: '#E5E7EB',
  },
  CANCELED: {
    textClass: 'text-gray-500',
    bgClass: 'bg-gray-100',
    combinedClass: 'text-gray-500 bg-gray-100',
    badgeClass: 'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-900/70 dark:text-gray-400 dark:border-gray-800',
    textColorHex: '#6B7280',
    bgColorHex: '#F3F4F6',
    borderColorHex: '#E5E7EB',
  },
  CONFIRMED: {
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
    combinedClass: 'text-blue-600 bg-blue-100',
    badgeClass: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/60',
    textColorHex: '#2563EB',
    bgColorHex: '#DBEAFE',
    borderColorHex: '#93C5FD',
  },
  UPCOMING: {
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
    combinedClass: 'text-blue-600 bg-blue-100',
    badgeClass: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/60',
    textColorHex: '#2563EB',
    bgColorHex: '#DBEAFE',
    borderColorHex: '#93C5FD',
  },
  COMPLETED: {
    textClass: 'text-green-600',
    bgClass: 'bg-green-100',
    combinedClass: 'text-green-600 bg-green-100',
    badgeClass: 'bg-green-100 text-green-600 border-green-200 dark:bg-green-950/60 dark:text-green-300 dark:border-green-900/60',
    textColorHex: '#16A34A',
    bgColorHex: '#DCFCE7',
    borderColorHex: '#86EFAC',
  },
  PENDING: {
    textClass: 'text-amber-600',
    bgClass: 'bg-amber-100',
    combinedClass: 'text-amber-600 bg-amber-100',
    badgeClass: 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900/60',
    textColorHex: '#D97706',
    bgColorHex: '#FEF3C7',
    borderColorHex: '#FCD34D',
  },
  NO_SHOW: {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    badgeClass: 'bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/60',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
    borderColorHex: '#C4B5FD',
  },
  'NO-SHOW': {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    badgeClass: 'bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/60',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
    borderColorHex: '#C4B5FD',
  },
  LECTURER_NO_SHOW: {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    badgeClass: 'bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/60',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
    borderColorHex: '#C4B5FD',
  },
  'LECTURER-NO-SHOW': {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    badgeClass: 'bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-900/60',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
    borderColorHex: '#C4B5FD',
  },
  RESCHEDULE_PENDING: {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
  'RESCHEDULE-PENDING': {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
  RESCHEDULE_PROPOSED: {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
  'RESCHEDULE-PROPOSED': {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
  RESCHEDULE_REQUEST: {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
  'RESCHEDULE-REQUEST': {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    badgeClass: 'bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-900/60',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
    borderColorHex: '#5EEAD4',
  },
};

/**
 * Returns dynamic Tailwind CSS text and background classes based on appointment status.
 */
export function getStudentStatusBadgeClass(status?: string): string {
  if (!status) return 'text-gray-500 bg-gray-100 border border-gray-300';
  const normalized = status.trim().toUpperCase();
  const mapping = STUDENT_STATUS_COLOR_MAP[normalized];
  return mapping ? `${mapping.combinedClass} border` : 'text-gray-500 bg-gray-100 border border-gray-300';
}

/**
 * Returns full styled badge classes with dark mode and borders.
 */
export function getStudentStatusPillClass(status?: string): string {
  if (!status) return 'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800';
  const normalized = status.trim().toUpperCase();
  const mapping = STUDENT_STATUS_COLOR_MAP[normalized];
  return mapping ? mapping.badgeClass : 'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800';
}

/**
 * Returns inline CSS style object with exact hex codes.
 */
export function getStudentStatusBadgeStyle(status?: string): { color: string; backgroundColor: string; borderColor?: string } {
  if (!status) return { color: '#6B7280', backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' };
  const normalized = status.trim().toUpperCase();
  const mapping = STUDENT_STATUS_COLOR_MAP[normalized];
  return mapping
    ? { color: mapping.textColorHex, backgroundColor: mapping.bgColorHex, borderColor: mapping.borderColorHex }
    : { color: '#6B7280', backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' };
}
