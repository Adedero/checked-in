import { ulid } from 'ulid';

export default function useFormFields(form: Ref<Form>) {
  const getFieldIndex = (fieldOrId: FormField | string): number => {
    const index = form.value.fields.findIndex((field) => {
      return field.id === (typeof fieldOrId === 'string' ? fieldOrId : fieldOrId.id);
    });

    return index;
  };

  const append = (newField: FormField, targetField?: FormField | string): FormField => {
    if (targetField) {
      const index = getFieldIndex(targetField);

      form.value.fields.splice(index + 1, 0, newField);

      return newField;
    }

    form.value.fields.push(newField);
    return newField;
  };

  const prepend = (newField: FormField, targetField?: FormField | string): FormField => {
    if (targetField) {
      const index = getFieldIndex(targetField);

      form.value.fields.splice(index - 1, 0, newField);

      return newField;
    }

    form.value.fields.unshift(newField);
    return newField;
  };


  const replace = <T extends FormField>(newField: T, targetField: FormField | string): T => {
    const index = getFieldIndex(targetField);

    form.value.fields.splice(index, 1, newField);

    return newField;
  }

  const duplicate = (fieldOrId: FormField | string, position: 'prepend' | 'append' = 'append') => {
    const field = getField(fieldOrId);
    if (!field) {
      throw new Error('Form field not found');
    }
    const updatedField = { ...field, id: ulid() };
    return position === 'prepend'
      ? prepend(updatedField, fieldOrId)
      : append(updatedField, fieldOrId);
  };

  const remove = (fieldOrId: FormField | string) => {
    const field = getField(fieldOrId);
    const index = getFieldIndex(fieldOrId);
    form.value.fields.splice(index, 1);

    return { field, index };
  };

  const focus = (fieldOrId: FormField | string) => {
    form.value.fields.forEach((f) => {
      f.isFocused = f.id === (typeof fieldOrId === 'string' ? fieldOrId : fieldOrId.id);
    });
  };

  const convertFieldType = <Type extends FormField['type']>(
    newType: Type,
    oldField: FormField
  ): Extract<FormField, { type: Type }> => {
    // Common base data
    const base: Omit<BaseField & BaseLayoutField, 'label'> = {
      id: oldField.id,
      formId: oldField.formId,
      isFocused: oldField.isFocused
    };

    // Some fields share label/description/placeholder/required
    if ('label' in oldField) {
      Object.assign(base, {
        label: oldField.label,
        description: oldField.description,
        placeholder: oldField.placeholder,
        required: oldField.required
      });
    }

    // Construct new type baseline
    let newField: FormField;
    switch (newType) {
      case 'shorttext':
        newField = { label: '', ...base, type: 'shorttext', validations: [] };
        break;
      case 'longtext':
        newField = { label: '', ...base, type: 'longtext', validations: [] };
        break;
      case 'number':
        newField = { label: '', ...base, type: 'number', step: 1, validations: [] };
        break;
      case 'select':
        newField = { label: '', ...base, type: 'select', options: [] };
        break;
      case 'multiselect':
        newField = { label: '', ...base, type: 'multiselect', options: [], validations: [] };
        break;
      case 'radio':
        newField = { label: '', ...base, type: 'radio', options: [], layout: 'list' };
        break;
      case 'checkbox':
        newField = {
          label: '',
          ...base,
          type: 'checkbox',
          options: [],
          layout: 'list',
          validations: []
        };
        break;
      case 'date':
        newField = { label: '', ...base, type: 'date', validations: [] };
        break;
      case 'time':
        newField = { label: '', ...base, type: 'time', validations: [] };
        break;
      case 'divider':
        newField = { ...base, type: 'divider', style: 'solid', color: 'neutral' };
        break;
      case 'heading':
        newField = { ...base, type: 'heading', level: 2, text: 'Heading' };
        break;
      default:
        throw new Error(`Unsupported type: ${newType}`);
    }

    // Merge overlapping attributes from oldField
    for (const key in oldField) {
      if (key in newField && key !== 'type') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newField as any)[key] = (oldField as any)[key];
      }
    }
    //@ts-expect-error dynamic type
    return newField;
  };

  const getFieldById = (id: string) => {
    return getField(id);
  };

  function getField(fieldOrId: FormField | string): FormField | undefined {
    return form.value.fields.find(
      (field) => field.id === (typeof fieldOrId === 'string' ? fieldOrId : fieldOrId.id)
    );
  }

  return {
    append,
    prepend,
    replace,
    duplicate,
    remove,
    getFieldById,
    getFieldIndex,
    focus,
    convertFieldType
  };
}
