export type Form = {
  id: string;
  title?: string;
  description?: string;
  coverImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
  fields: FormField[];
};

// ============================================
// BASE FIELD (for fields that accept input)
// ============================================
export type BaseField = {
  id: string;
  formId: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  isFocused?: boolean;
};

// ============================================
// BASE LAYOUT FIELD (for non-input elements)
// ============================================
export type BaseLayoutField = {
  id: string;
  formId: string;
  isFocused?: boolean;
};

// ============================================
// TEXT FIELDS
// ============================================
export type ShortTextField = BaseField & {
  type: 'shorttext';
  validations?: ShortTextValidation[];
};

export type LongTextField = BaseField & {
  type: 'longtext';
  validations?: LongTextValidation[];
};

// ============================================
// NUMBER FIELD
// ============================================
export type NumberField = BaseField & {
  type: 'number';
  /* step?: number; */
  validations?: NumberValidation[];
};

// ============================================
// SELECTION FIELDS
// ============================================
export type SelectField = BaseField & {
  type: 'select';
  options: Array<{ id: string; value: string }>;
};

export type CheckboxField = BaseField & {
  type: 'checkbox';
  options: Array<{ id: string; value: string }>;
  validations?: CheckboxValidation[];
  layout?: 'list' | 'grid';
};

export type RadioField = BaseField & {
  type: 'radio';
  options: Array<{ id: string; value: string }>;
  /*  layout?: 'list' | 'grid'; */
};

// ============================================
// DATE & TIME FIELDS
// ============================================
export type DateField = BaseField & {
  type: 'date';
  validations?: DateValidation[];
};

export type TimeField = BaseField & {
  type: 'time';
  validations?: TimeValidation[];
};

// ============================================
// FILE FIELDS
// ============================================
export type ImageFileField = BaseField & {
  type: 'image';
  multiple?: boolean;
  validations?: BaseFileValidation<FormImageFileTypeExtension>[];
};

export type VideoFileField = BaseField & {
  type: 'video';
  multiple?: boolean;
  validations?: BaseFileValidation<FormVideoFileTypeExtension>[];
};

export type AudioFileField = BaseField & {
  type: 'audio';
  multiple?: boolean;
  validations?: BaseFileValidation<FormAudioFileTypeExtension>[];
};

export type DocumentFileField = BaseField & {
  type: 'document';
  multiple?: boolean;
  validations?: BaseFileValidation<FormDocumentFileTypeExtension>[];
};

// ============================================
// RATING & SCALE FIELDS
// ============================================
export type ScaleField = BaseField & {
  type: 'scale';
  steps: {
    value: number;
    label: string;
  }[];
  labels?: string[]; // Made optional - might not always have labels
};

export type RatingField = BaseField & {
  type: 'rating';
  from: number;
  to: number;
  icon?: 'star' | 'heart' | 'thumb';
};

// ============================================
// CONTACT FIELDS
// ============================================
export type PhoneField = BaseField & {
  type: 'phone';
  defaultCountry?: string;
  unique?: boolean;
};

export type AddressField = BaseField & {
  type: 'address';
  fields?: {
    street?: boolean;
    city?: boolean;
    state?: boolean;
    zip?: boolean;
    country?: boolean;
  };
};

// ============================================
// SIGNATURE FIELD
// ============================================
export type SignatureField = BaseField & {
  type: 'signature';
  backgroundColor?: string;
};

// ============================================
// LAYOUT FIELDS (non-input)
// ============================================
export type DividerField = BaseLayoutField & {
  type: 'divider';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  text?: string;
};

export type HeadingField = BaseLayoutField & {
  type: 'heading';
 /*  level?: 1 | 2 | 3 | 4 | 5 | 6; */
  text: string;
  description?: string;
};

// ============================================
// UNION TYPE
// ============================================
export type FormField =
  | ShortTextField
  | LongTextField
  | NumberField
  | SelectField
  | RadioField
  | CheckboxField
  | DateField
  | TimeField
  | ImageFileField
  | VideoFileField
  | AudioFileField
  | DocumentFileField
  | ScaleField
  | RatingField
  | PhoneField
  | AddressField
  | SignatureField
  | DividerField
  | HeadingField;

// ============================================
// HELPER TYPES
// ============================================
export type FormDate = {
  year: number;
  month: number;
  day: number;
};

export type FormTime = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  meridian?: 'a.m.' | 'p.m.';
};

export type FormFileSize = {
  value?: number;
  unit?: 'KB' | 'MB' | 'GB';
};

export type FormFileType = 'all' | 'image' | 'video' | 'audio' | 'document';
export type FormImageFileTypeExtension =
  | 'all'
  | 'jpg'
  | 'jpeg'
  | 'webp'
  | 'png'
  | 'svg'
  | 'gif'
  | 'avif';
export type FormVideoFileTypeExtension = 'all' | '3gp' | 'mp4' | 'mkv';
export type FormAudioFileTypeExtension = 'all' | 'mp3' | 'aac';
export type FormDocumentFileTypeExtension =
  | 'all'
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'ppt'
  | 'pptx'
  | 'xls'
  | 'xlsx'
  | 'rtf'
  | 'txt'
  | 'csv'
  | 'epub';

// ============================================
// VALIDATION RULES
// ============================================
export type ShortTextValidation =
  | { id: string; type: 'min_length'; value: number; message: string }
  | { id: string; type: 'max_length'; value: number; message: string }
  /* | { id: string; type: 'pattern'; value: string | RegExp; message: string } */
  | { id: string; type: 'contains'; value: string; message: string }
  | { id: string; type: 'not_contains'; value: string; message: string }
  | { id: string; type: 'starts_with'; value: string; message: string }
  | { id: string; type: 'ends_with'; value: string; message: string }
  | { id: string; type: 'email'; message: string }
  | { id: string; type: 'url'; message: string }
  | { id: string; type: 'unique'; message: string };

export type LongTextValidation =
  | { id: string; type: 'min_length'; value: number; message: string }
  | { id: string; type: 'max_length'; value: number; message: string };

export type NumberValidation =
  | { id: string; type: 'min'; value: number; message: string }
  | { id: string; type: 'max'; value: number; message: string }
  | { id: string; type: 'integer'; message: string }
  | { id: string; type: 'min_fraction_digits'; value: number; message: string }
  | { id: string; type: 'max_fraction_digits'; value: number; message: string }
  | { id: string; type: 'equal'; value: number; message: string }
  | { id: string; type: 'greater_than'; value: number; message: string }
  | { id: string; type: 'less_than'; value: number; message: string }
  | { id: string; type: 'greater_than_or_equal'; value: number; message: string }
  | { id: string; type: 'less_than_or_equal'; value: number; message: string }
  | { id: string; type: 'positive'; message: string }
  | { id: string; type: 'negative'; message: string }
  | { id: string; type: 'unique'; message: string };

export type CheckboxValidation =
  | { id: string; type: 'select_at_least'; value: number; message: string }
  | { id: string; type: 'select_at_most'; value: number; message: string }
  | { id: string; type: 'select_exactly'; value: number; message: string };

export type DateValidation =
  | { id: string; type: 'between'; value: [FormDate, FormDate]; message: string }
  | { id: string; type: 'before'; value: FormDate; message: string }
  | { id: string; type: 'after'; value: FormDate; message: string };

export type TimeValidation =
  | { id: string; type: 'between'; value: FormTime; message: string }
  | { id: string; type: 'before'; value: FormTime; message: string }
  | { id: string; type: 'after'; value: FormTime; message: string };

export type BaseFileValidation<ExtensionType> =
  | { id: string; type: 'max_size'; value: FormFileSize; message: string }
  | { id: string; type: 'allowed_extensions'; value: ExtensionType[]; message: string };
