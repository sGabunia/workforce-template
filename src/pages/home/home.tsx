import { HomeModule } from '~/modules/home/home-module';

export function meta() {
  return [{ title: 'home' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return <HomeModule />;
}
