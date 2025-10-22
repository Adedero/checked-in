import { useLocalStorage, type UseRefHistoryOptions, useDebouncedRefHistory } from '@vueuse/core';
/* 
export type UseFormHistoryStateOptions = {
  storageKey: string;
} & UseRefHistoryOptions<Form, string>; */

export type UseFormHistoryStateOptions = {
  storageKey: string;
} & Omit<UseRefHistoryOptions<Form, string>, 'eventFilter'> & {
    debounce?: MaybeRefOrGetter<number>;
  };

export function useFormState(initial: Form, options: UseFormHistoryStateOptions) {
  const { storageKey = 'form-state', dump = JSON.stringify, parse = JSON.parse, ...rest } = options;

  const state = ref<Form>(initial);

  const history = useDebouncedRefHistory(state, {
    dump,
    parse,
    ...rest
  });

  const storage = useLocalStorage(storageKey, JSON.stringify(initial));

  onMounted(() => {
    if (storage.value) {
      // restore previous session value
      state.value = parse(storage.value);
      history.clear();
    }
  });

  watch(history.last, () => {
    // save last committed snapshot
    const { snapshot } = history.last.value;
    storage.value = snapshot;
  });

  return { state, history, storage };
}

export type FormState = ReturnType<typeof useFormState>;
