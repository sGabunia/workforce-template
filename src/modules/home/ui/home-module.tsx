import { useLoaderData } from 'react-router';

export const HomeModule = () => {
  const invoices = useLoaderData<{ res: string }>();
  return <p>Home Module{invoices.res}</p>;
};
