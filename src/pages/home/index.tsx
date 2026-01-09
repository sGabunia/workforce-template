import { Link } from 'react-router';

import { HomeModule } from '~/modules/home';

export function meta() {
  return [{ title: 'home' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return (
    <div>
      <Link to='/users'>users</Link>
      <HomeModule />
    </div>
  );
}
