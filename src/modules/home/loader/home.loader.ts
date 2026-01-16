import type { Route } from '.react-router/types/src/app/pages/home/+types/home';

export async function homeLoader({ request }: Route.LoaderArgs) {
  console.warn(request);
  return {
    res: 'ok'
  };
}

export async function homeAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.warn({ formData });
}
