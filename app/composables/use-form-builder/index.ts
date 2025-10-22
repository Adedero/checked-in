import { ulid } from 'ulid';
import useFormFields from './use-form-fields';
import useFormHeader from './use-form-header';

export default function useFormBuilder(formState: FormState) {
  const { state: form, history, storage } = formState;

  const fields = useFormFields(form);
  const header = useFormHeader(form);

  function useFieldRef<T extends FormField>(fieldId: string) {
    return computed<T>({
      get() {
        return form.value.fields.find((f) => f.id === fieldId) as T;
      },
      set(newValue) {
        const index = form.value.fields.findIndex((f) => f.id === fieldId);
        if (index !== -1) Object.assign(form.value.fields[index]!, newValue);
      }
    });
  }

  return {
    ID: ulid,
    formId: form.value.id,
    form,
    history,
    storage,
    fields,
    header,
    useFieldRef
  };
}
