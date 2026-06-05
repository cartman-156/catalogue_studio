/**
 * ID Generator utility for creating unique product IDs
 */

interface IdPattern {
  prefix: string;
  separator: string;
  numberLength: number;
}

/**
 * Detect ID pattern and generate next ID
 * Examples:
 *   kf001 -> kf002
 *   prod_123 -> prod_124
 *   SKU-001 -> SKU-002
 */
export const detectAndGenerateNextId = (
  existingIds: (string | undefined)[],
  templateId?: string
): string => {
  const validIds: string[] = existingIds.filter(
    (id): id is string => typeof id === "string" && id.length > 0
  );

  if (validIds.length === 0) {
    return generateId();
  }

  // If template provided, use it as pattern
  if (templateId) {
    const pattern = extractIdPattern(templateId);
    if (pattern) {
      const nextNumber = getNextNumber(validIds, pattern);
      return buildId(pattern, nextNumber);
    }
  }

  // Find valid patterns safely (remove nulls with type guard)
  const patterns: IdPattern[] = validIds
    .map(extractIdPattern)
    .filter((p): p is IdPattern => p !== null);

  if (patterns.length === 0) {
    return generateId();
  }

  // Use first valid pattern safely
  const pattern: IdPattern = patterns[0];

  const nextNumber = getNextNumber(validIds, pattern);
  return buildId(pattern, nextNumber);
};

/**
 * Extract pattern from an ID string
 * Returns { prefix, separator, numberLength }
 */
function extractIdPattern(id: string): IdPattern | null {
  // Match patterns like: prefix123, prefix-123, prefix_123
  const match = id.match(/^([a-zA-Z]+)([^0-9]*)(\d+)$/);
  if (match) {
    const [, prefix, separator, number] = match;
    return {
      prefix,
      separator,
      numberLength: number.length,
    };
  }

  // Try numeric-first patterns like: 123prefix
  const match2 = id.match(/^(\d+)([a-zA-Z]*)$/);
  if (match2) {
    const [, number, suffix] = match2;
    return {
      prefix: suffix,
      separator: "",
      numberLength: number.length,
    };
  }

  return null;
}

/**
 * Get the next number based on existing IDs and pattern
 */
function getNextNumber(ids: string[], pattern: IdPattern): number {
  let maxNumber = 0;

  for (const id of ids) {
    const regex = new RegExp(
      `^${escapeRegex(pattern.prefix)}${escapeRegex(pattern.separator)}(\\d+)$`
    );

    const match = id.match(regex);

    if (match) {
      const num = Number.parseInt(match[1], 10);
      if (!Number.isNaN(num)) {
        maxNumber = Math.max(maxNumber, num);
      }
    }
  }

  return maxNumber + 1;
}

/**
 * Build an ID from pattern and number
 */
function buildId(pattern: IdPattern, number: number): string {
  const paddedNumber = String(number).padStart(pattern.numberLength, "0");
  return `${pattern.prefix}${pattern.separator}${paddedNumber}`;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Generate a unique timestamp-based ID
 */
export const generateId = (): string => {
  return `product_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Check if a string is a valid product ID
 */
export const isValidId = (id: unknown): boolean => {
  return typeof id === "string" && id.length > 0;
};

/**
 * Check if ID exists in collection
 */
export const idExists = (
  id: string,
  ids: (string | undefined)[]
): boolean => {
  return ids.some((existingId) => existingId === id);
};

/**
 * Make sure ID is unique in collection
 */
export const ensureUniqueId = (
  id: string,
  existingIds: (string | undefined)[]
): string => {
  if (!idExists(id, existingIds)) {
    return id;
  }

  let counter = 1;
  while (idExists(`${id}_${counter}`, existingIds)) {
    counter++;
  }

  return `${id}_${counter}`;
};
