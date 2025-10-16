type StringValidationType = 'email' | 'url' | 'none';

type StringType<T extends StringValidationType> = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
  unique?: boolean;
  placeholder?: string;
  validationType?: T;
};

type BaseField = {
  required?: boolean;
  label?: string;
  description?: string;
};

type StringField = StringType<'none'>;

type EmailField = StringType<'email'>;

type URLField = StringType<'url'>;

type NumberField = BaseField & {
  type: 'number';
  min?: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  unique?: boolean;
  step?: number;
  placeholder?: string;
};

type EnumField = BaseField & {
  type: 'enum';
  options: Array<{ label: string; value: string | number }>;
  multiple?: boolean;
};

type BooleanField = BaseField & {
  type: 'boolean';
  trueLabel?: string;
  falseLabel?: string;
};

type FileField = BaseField & {
  type: 'file';
  allowedMimeTypes?: string[];
  maxSizeInBytes?: number;
  multiple?: boolean;
  maxFiles?: number;
};

type DateField = BaseField & {
  type: 'date';
  min?: string; // ISO date string
  max?: string;
};

type ListField = BaseField & {
  type: 'list';
  itemType: 'string' | 'number' | 'enum';
  options?: string[];
  allowCustom?: boolean;
  minItems?: number;
  maxItems?: number;
};

export type FieldSchema =
  | StringField
  | EmailField
  | URLField
  | NumberField
  | EnumField
  | BooleanField
  | FileField
  | DateField
  | ListField;

export type FormSchema = Record<string, FieldSchema>;
