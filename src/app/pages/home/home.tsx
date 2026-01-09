import { Link } from 'react-router';

import { HomeModule } from '~/modules/home';

import type { Route } from './+types/home';

export { homeLoader as clientLoader } from '~/modules/home';

export function meta() {
  return [{ title: 'home' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Link to='/users'>users</Link>
      {loaderData.res}
      <HomeModule />
    </div>
  );
}
