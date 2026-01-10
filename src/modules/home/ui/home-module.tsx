import { useLoaderData } from 'react-router';

import { TestButton } from '~/common/ui/TestButton';

export const HomeModule = () => {
  const invoices = useLoaderData<{ res: string }>();
  return (
    <p>
      Home Module{invoices.res}
      <TestButton />
    </p>
  );
};
