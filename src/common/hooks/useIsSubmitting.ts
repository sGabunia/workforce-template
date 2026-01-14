import { useFormAction, useNavigation } from 'react-router';

export function useIsSubmitting({
  formAction,
  formMethod = 'POST'
}: {
  formAction?: string;
  formMethod?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
} = {}) {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();
  return (
    navigation.state === 'submitting' &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod
  );
}
