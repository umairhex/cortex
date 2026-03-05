export const RESERVED_WORDS = new Set([
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
  "id",
  "type",
  "data",
  "value",
  "result",
  "error",
  "message",
  "status",
  "code",
  "response",
  "request",
  "meta",
  "config",
  "options",
  "params",
  "args",
  "props",
  "state",
]);

export const normalizeToCamelCase = (name: string): string => {
  return name
    .split(/[_\s-]+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export const validateFieldName = (name: string): string => {
  if (!name.trim()) return "Field name is required";
  const trimmed = name.trim();

  if (!/^[a-z][a-zA-Z0-9]*$/.test(trimmed)) {
    if (/\s/.test(trimmed))
      return "Field name cannot contain spaces. Use camelCase instead.";
    if (/^[0-9]/.test(trimmed))
      return "Field name must start with a lowercase letter, not a number.";
    if (/[^a-zA-Z0-9]/.test(trimmed))
      return "Field name can only contain letters and numbers. Use camelCase for multi-word names.";
  }

  if (!/^[a-z]/.test(trimmed))
    return "Field name must start with a lowercase letter.";
  if (trimmed.length < 2)
    return "Field name must be descriptive and at least 2 characters.";
  if (RESERVED_WORDS.has(trimmed))
    return `"${trimmed}" is a reserved word and cannot be used.`;

  return "";
};
