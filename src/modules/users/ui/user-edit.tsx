import { Modal } from '@mantine/core';
import { Form } from 'react-router';

import { useNavigateWithState } from '~/common/hooks/useNavigateWithState';
import { useRouteModal } from '~/common/hooks/useRouteModal';

export default function UserEdit() {
  const navigate = useNavigateWithState();
  const { opened, handleClose } = useRouteModal({
    onClose: () => navigate('/users')
  });
  return (
    <Modal onClose={handleClose} opened={opened}>
      <div style={{ padding: '2rem' }}>
        <p>Your content here</p>
      </div>
      <Form method='post'>here must be edit form</Form>
    </Modal>
  );
}
