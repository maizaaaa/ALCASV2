/**
 * Color mapping logic for appointment status badges across Admin screens.
 *
 * Mappings:
 * - Rejected:  text-red-600 / bg-red-100 (#DC2626)
 * - Cancelled: text-gray-500 / bg-gray-100 (#6B7280)
 * - Confirmed: text-blue-600 / bg-blue-100 (#2563EB)
 * - Completed: text-green-600 / bg-green-100 (#16A34A)
 * - Pending:   text-amber-600 / bg-amber-100 (#D97706)
 * - No-show:   text-violet-600 / bg-violet-100 (#7C3AED)
 */

export interface StatusStyleMapping {
  textClass: string;
  bgClass: string;
  combinedClass: string;
  textColorHex: string;
  bgColorHex: string;
}

export const ADMIN_STATUS_COLOR_MAP: Record<string, StatusStyleMapping> = {
  REJECTED: {
    textClass: 'text-red-600',
    bgClass: 'bg-red-100',
    combinedClass: 'text-red-600 bg-red-100',
    textColorHex: '#DC2626',
    bgColorHex: '#FEE2E2',
  },
  CANCELLED: {
    textClass: 'text-gray-500',
    bgClass: 'bg-gray-100',
    combinedClass: 'text-gray-500 bg-gray-100',
    textColorHex: '#6B7280',
    bgColorHex: '#F3F4F6',
  },
  CANCELED: {
    textClass: 'text-gray-500',
    bgClass: 'bg-gray-100',
    combinedClass: 'text-gray-500 bg-gray-100',
    textColorHex: '#6B7280',
    bgColorHex: '#F3F4F6',
  },
  CONFIRMED: {
    textClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
    combinedClass: 'text-blue-600 bg-blue-100',
    textColorHex: '#2563EB',
    bgColorHex: '#DBEAFE',
  },
  COMPLETED: {
    textClass: 'text-green-600',
    bgClass: 'bg-green-100',
    combinedClass: 'text-green-600 bg-green-100',
    textColorHex: '#16A34A',
    bgColorHex: '#DCFCE7',
  },
  PENDING: {
    textClass: 'text-amber-600',
    bgClass: 'bg-amber-100',
    combinedClass: 'text-amber-600 bg-amber-100',
    textColorHex: '#D97706',
    bgColorHex: '#FEF3C7',
  },
  RESCHEDULE_PENDING: {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
  },
  'RESCHEDULE-PENDING': {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
  },
  RESCHEDULE_REQUEST: {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
  },
  'RESCHEDULE-REQUEST': {
    textClass: 'text-teal-600',
    bgClass: 'bg-teal-100',
    combinedClass: 'text-teal-600 bg-teal-100',
    textColorHex: '#0F766E',
    bgColorHex: '#CCFBF1',
  },
  NO_SHOW: {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
  },
  'NO-SHOW': {
    textClass: 'text-violet-600',
    bgClass: 'bg-violet-100',
    combinedClass: 'text-violet-600 bg-violet-100',
    textColorHex: '#7C3AED',
    bgColorHex: '#EDE9FE',
  },
};

/**
 * Returns the Tailwind CSS text and background classes dynamically based on appointment status.
 */
export function getAdminStatusBadgeClass(status?: string): string {
  if (!status) return 'text-gray-500 bg-gray-100';
  const normalized = status.trim().toUpperCase();
  const mapping = ADMIN_STATUS_COLOR_MAP[normalized];
  return mapping ? mapping.combinedClass : 'text-gray-500 bg-gray-100';
}

/**
 * Returns inline CSS style object with exact hex codes.
 */
export function getAdminStatusBadgeStyle(status?: string): { color: string; backgroundColor: string } {
  if (!status) return { color: '#6B7280', backgroundColor: '#F3F4F6' };
  const normalized = status.trim().toUpperCase();
  const mapping = ADMIN_STATUS_COLOR_MAP[normalized];
  return mapping
    ? { color: mapping.textColorHex, backgroundColor: mapping.bgColorHex }
    : { color: '#6B7280', backgroundColor: '#F3F4F6' };
}
