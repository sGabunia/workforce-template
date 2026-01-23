import type { _TransformValues, UseFormInput } from '@mantine/form';
import type { FetcherWithComponents } from 'react-router';

import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { useActionData, useNavigation, useSubmit } from 'react-router';

export type UseRouterFormOptions<
  Values extends Record<string, any> = Record<string, any>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values
> = UseFormInput<Values, TransformValues> & {
  fetcher?: FetcherWithComponents<unknown>;
};

export const useRouterForm = <
  Values extends Record<string, any> = Record<string, any>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values
>(
  options: UseRouterFormOptions<Values, TransformValues>
) => {
  const actionSubmit = useSubmit();
  const actionData = useActionData();
  const submit = options.fetcher ? options.fetcher.submit : actionSubmit;
  const data = actionData;

  const form = useForm(options);

  const navigation = useNavigation();

  const isSubmittingForm = useMemo(
    () => navigation.state !== 'idle' && (navigation.formData ?? navigation.json) !== undefined,
    [navigation.state, navigation.formData, navigation.json]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    form.onSubmit((values) => {
      submit(values as Record<string, any>, {
        method: 'post',
        action: '/users'
      });
    })(e);
  };

  return {
    ...form,
    handleSubmit,
    isSubmittingForm,
    data
  };
};
