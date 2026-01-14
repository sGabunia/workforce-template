import { Modal } from '@mantine/core';
import { useState } from 'react';

import { useNavigateWithState } from '~/common/hooks/useNavigateWithState';
import { useRouteModal } from '~/common/hooks/useRouteModal';

import type { Route } from './+types/users-edit';

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {
    id: params.id
  };
}

export default function UserEdit({ params }: Route.ComponentProps) {
  const navigate = useNavigateWithState();
  const { opened, handleClose } = useRouteModal({
    onClose: () => navigate('/users')
  });
  const [count, setCount] = useState(0);

  return (
    <>
      hello
      <Modal onClose={handleClose} opened={opened}>
        <div style={{ padding: '2rem' }}>
          <h3>Popup Content {params.id}</h3>
          <p>Your content here</p>
        </div>
        {count}
        <button type='button' onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
      </Modal>
    </>
  );
}
