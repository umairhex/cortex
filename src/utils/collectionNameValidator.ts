export interface CollectionNameValidationResult {
  isValid: boolean;
  singular: string;
  plural: string;
  displayName: string;
  errors: string[];
}

const PLURAL_RULES: Record<string, string> = {
  person: "people",
  man: "men",
  woman: "women",
  child: "children",
  foot: "feet",
  tooth: "teeth",
  goose: "geese",
  mouse: "mice",

  ox: "oxen",
  sheep: "sheep",
  deer: "deer",
  fish: "fish",
  moose: "moose",
  species: "species",
  series: "series",
};

export const pluralize = (singular: string): string => {
  const lower = singular.toLowerCase();

  if (PLURAL_RULES[lower]) {
    return PLURAL_RULES[lower];
  }

  if (lower.endsWith("y")) {
    return `${lower.slice(0, -1)}ies`;
  }

  if (
    lower.endsWith("s") ||
    lower.endsWith("ss") ||
    lower.endsWith("x") ||
    lower.endsWith("z") ||
    lower.endsWith("ch") ||
    lower.endsWith("sh")
  ) {
    return `${lower}es`;
  }

  if (lower.endsWith("o")) {
    const voiceless = ["photo", "piano", "halo"];
    if (voiceless.some((word) => lower.endsWith(word))) {
      return `${lower}s`;
    }
    return `${lower}es`;
  }

  if (lower.endsWith("f")) {
    return `${lower.slice(0, -1)}ves`;
  }

  if (lower.endsWith("fe")) {
    return `${lower.slice(0, -2)}ves`;
  }

  return `${lower}s`;
};

export const normalizeCollectionName = (input: string): string => {
  return input
    .toLowerCase()
    .trim()

    .replace(/\s+/g, "-")

    .replace(/[^a-z0-9-]/g, "")

    .replace(/-+/g, "-")

    .replace(/^-+|-+$/g, "");
};

export const validateCollectionName = (
  normalized: string,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!normalized || normalized.length === 0) {
    errors.push("Collection name cannot be empty");
    return { isValid: false, errors };
  }

  if (normalized.length < 2) {
    errors.push("Collection name must be at least 2 characters");
  }

  if (normalized.length > 50) {
    errors.push("Collection name must be at most 50 characters");
  }

  if (!/^[a-z][a-z0-9-]*$/.test(normalized)) {
    errors.push(
      "Collection name must start with a letter and contain only lowercase letters, numbers, and hyphens",
    );
  }

  if (normalized.startsWith("-") || normalized.endsWith("-")) {
    errors.push("Collection name cannot start or end with a hyphen");
  }

  if (normalized.includes("--")) {
    errors.push("Collection name cannot contain consecutive hyphens");
  }

  if (/\.(com|org|net|json|xml|txt|sql|api|db|api|rest)$/i.test(normalized)) {
    errors.push("Collection name cannot contain file extensions");
  }

  const actionPatterns =
    /^(get|post|put|delete|create|edit|update|delete|remove|add|fetch|list|show|view|manage|build|make|set|do|run|execute|process|handle|perform|action|method|call|send|receive|export|import|download|upload|submit|process|validate|generate)/i;
  if (actionPatterns.test(normalized)) {
    errors.push(
      "Collection name should be a semantic, resource-based noun, not an action or verb",
    );
  }

  if (normalized.includes("/") || normalized.includes("\\")) {
    errors.push(
      "Collection name cannot contain path separators or hierarchical structures",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateAndNormalizeCollectionName = (
  userInput: string,
): CollectionNameValidationResult => {
  const normalized = normalizeCollectionName(userInput);
  const validation = validateCollectionName(normalized);

  const singular = normalized;
  const plural = validation.isValid ? pluralize(singular) : "";

  const displayName = singular
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    isValid: validation.isValid,
    singular,
    plural,
    displayName,
    errors: validation.errors,
  };
};

export const generateCollectionRoutes = (singular: string, plural: string) => {
  return {
    singularRoute: `/${singular}/:id`,
    pluralRoute: `/${plural}`,
    createRoute: `/${plural}/new`,
  };
};
