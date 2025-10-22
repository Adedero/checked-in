import { ulid as ID } from 'ulid';

const formId = ID();

export const defaultForm: Form = {
  id: formId,
  title: 'Untitled Form',
  description: 'Form description',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  fields: []
};

export interface FormFieldSelectItem {
  label: string;
  value: FormField['type'];
  icon: string;
}

export const formFieldSelectItems: FormFieldSelectItem[] = [
  {
    label: 'Short text',
    value: 'shorttext',
    icon: 'lucide:text-cursor-input'
  },
  {
    label: 'Long text',
    value: 'longtext',
    icon: 'lucide:text'
  },
  {
    label: 'Number',
    value: 'number',
    icon: 'lucide:hash'
  },
  {
    label: 'Dropdown',
    value: 'select',
    icon: 'lucide:chevron-down'
  },
  {
    label: 'Multi select',
    value: 'multiselect',
    icon: 'lucide:list-checks'
  },
  {
    label: 'Radio Group',
    value: 'radio',
    icon: 'lucide:circle-dot'
  },
  {
    label: 'Checkbox',
    value: 'checkbox',
    icon: 'lucide:check-square'
  },
  {
    label: 'Date',
    value: 'date',
    icon: 'lucide:calendar'
  },
  {
    label: 'Time',
    value: 'time',
    icon: 'lucide:clock'
  },
  {
    label: 'Image',
    value: 'image',
    icon: 'lucide:image'
  },
  {
    label: 'Video',
    value: 'video',
    icon: 'lucide:video'
  },
  {
    label: 'Audio',
    value: 'audio',
    icon: 'lucide:audio-lines'
  },
  {
    label: 'Document',
    value: 'document',
    icon: 'lucide:file-text'
  },
  {
    label: 'Scale',
    value: 'scale',
    icon: 'lucide:sliders-horizontal'
  },
  {
    label: 'Rating',
    value: 'rating',
    icon: 'lucide:star'
  },
  {
    label: 'Phone',
    value: 'phone',
    icon: 'lucide:phone'
  },
  {
    label: 'Address',
    value: 'address',
    icon: 'lucide:map-pin'
  },
  {
    label: 'Signature',
    value: 'signature',
    icon: 'lucide:pen-line'
  },
  {
    label: 'Divider',
    value: 'divider',
    icon: 'lucide:minus'
  },
  {
    label: 'Heading',
    value: 'heading',
    icon: 'lucide:heading'
  }
];
