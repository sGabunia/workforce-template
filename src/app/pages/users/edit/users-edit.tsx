import { Popup } from 'master-components-react-ts';
import { useState } from 'react';

import { useNavigation } from '~/common/hooks/useNavigateWithParams';

import type { Route } from './+types/users-edit';

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {
    id: params.id
  };
}

export default function UserEdit({ params }: Route.ComponentProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigation();

  const [count, setCount] = useState(0);
  return (
    <>
      hello
      <Popup
        visible={visible}
        mode='modal'
        onClickOutside={() => {
          setVisible(false);
          navigate('/users');
        }}
        onClose={() => {
          setVisible(false);
          navigate('/users');
        }}
      >
        <div style={{ padding: '2rem' }}>
          <h3>Popup Content {params.id}</h3>
          <p>Your content here</p>
        </div>
        {count}
        <button type='button' onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
      </Popup>
      ;
    </>
  );
}
