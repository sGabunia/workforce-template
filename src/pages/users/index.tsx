import { Link, Outlet } from 'react-router';

export default function Users() {
  return (
    <div>
      users
      <Link to='/users/45'>Go to Some Path</Link>
      <Link to='/'>home</Link>
      <Outlet />
    </div>
  );
}
