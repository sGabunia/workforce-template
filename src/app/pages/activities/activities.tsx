import type { Route } from './+types/activities';

export function meta() {
  return [{ title: 'Activities' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export function clientLoader() {
  return {
    activities: [{ name: 'code' }, { name: 'design' }]
  };
}

export default function Activities({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      activities:
      {loaderData.activities.map((activity) => (
        <p key={activity.name}>{activity.name}</p>
      ))}
    </div>
  );
}
