import { useParams } from 'react-router';

export default function User() {
  const user = useParams();
  return <p>user {user.id}</p>;
}
