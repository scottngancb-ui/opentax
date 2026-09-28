// Browser-safe Zod introspection shared by the return explorer (entry editor)
// and the forms atlas (field reference).
import { z } from "zod";

export enum FieldKind {
  Number = "number",
  Boolean = "boolean",
  Enum = "enum",
  Text = "text",
  Json = "json",
}

export type FieldSpec = {
  readonly key: string;
  readonly kind: FieldKind;
  readonly required: boolean;
  readonly options?: readonly string[];
  readonly description?: string;
  // An array field: one value (or one nested record) per entry.
  readonly list?: boolean;
  // Fields of a nested object, or of each item in a list of objects.
  readonly children?: readonly FieldSpec[];
};

function unwrap(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) return unwrap(schema.unwrap());
  if (schema instanceof z.ZodDefault) return unwrap(schema.removeDefault());
  if (schema instanceof z.ZodEffects) return unwrap(schema.innerType());
  return schema;
}

// .describe() may sit on the wrapper or on the inner schema.
function descriptionOf(schema: z.ZodTypeAny): string | undefined {
  if (schema.description) return schema.description;
  const inner = schema instanceof z.ZodOptional || schema instanceof z.ZodNullable
    ? schema.unwrap()
    : schema instanceof z.ZodDefault
    ? schema.removeDefault()
    : schema instanceof z.ZodEffects
    ? schema.innerType()
    : undefined;
  return inner ? descriptionOf(inner) : undefined;
}

function enumOptions(schema: z.ZodTypeAny): string[] | undefined {
  if (schema instanceof z.ZodEnum) return [...schema.options];
  if (schema instanceof z.ZodNativeEnum) {
    return Object.values(schema.enum as Record<string, unknown>).filter((v): v is string => typeof v === "string");
  }
  if (schema instanceof z.ZodLiteral && typeof schema.value === "string") return [schema.value];
  return undefined;
}

function scalarKind(schema: z.ZodTypeAny): FieldKind {
  if (schema instanceof z.ZodNumber) return FieldKind.Number;
  if (schema instanceof z.ZodBoolean) return FieldKind.Boolean;
  if (enumOptions(schema)) return FieldKind.Enum;
  if (schema instanceof z.ZodString) return FieldKind.Text;
  return FieldKind.Json;
}

// Nested records deeper than this are shown as a single JSON field.
const MAX_DEPTH = 2;

function fieldSpec(key: string, schema: z.ZodTypeAny, depth: number): FieldSpec {
  const inner = unwrap(schema);
  const description = descriptionOf(schema);
  const base = { key, required: !schema.isOptional(), ...(description ? { description } : {}) };
  if (inner instanceof z.ZodArray) {
    const item = unwrap(inner.element);
    const children = item instanceof z.ZodObject && depth < MAX_DEPTH ? objectFields(item, depth + 1) : undefined;
    const options = enumOptions(item);
    return {
      ...base,
      kind: children ? FieldKind.Json : scalarKind(item),
      list: true,
      ...(options ? { options } : {}),
      ...(children ? { children } : {}),
    };
  }
  if (inner instanceof z.ZodObject && depth < MAX_DEPTH) {
    return { ...base, kind: FieldKind.Json, children: objectFields(inner, depth + 1) };
  }
  const options = enumOptions(inner);
  return { ...base, kind: scalarKind(inner), ...(options ? { options } : {}) };
}

/** Lists the fields of an object schema (unwrapping optional/default/effects). */
export function objectFields(schema: z.ZodTypeAny, depth = 1): FieldSpec[] {
  const inner = unwrap(schema);
  if (!(inner instanceof z.ZodObject)) return [];
  const shape: Record<string, z.ZodTypeAny> = inner.shape;
  return Object.entries(shape).map(([key, value]) => fieldSpec(key, value, depth));
}

/** Every documentable path: top-level keys plus "parent.child" for nested records. */
export function fieldPaths(fields: readonly FieldSpec[], prefix = ""): string[] {
  return fields.flatMap((f) => [
    prefix + f.key,
    ...(f.children ? fieldPaths(f.children, prefix + f.key + ".") : []),
  ]);
}
