import { Button, Modal } from '@mantine/core';
import { Form } from 'react-router';

import { useIsSubmitting } from '~/common/hooks/useIsSubmitting';
import { useNavigateWithState } from '~/common/hooks/useNavigateWithState';
import { useRouteModal } from '~/common/hooks/useRouteModal';

export default function UserDelete() {
  const navigate = useNavigateWithState();
  const { opened, handleClose } = useRouteModal({
    onClose: () => navigate('/users')
  });

  const isSubmitting = useIsSubmitting();
  return (
    <Modal onClose={handleClose} opened={opened}>
      <div style={{ padding: '2rem' }}>
        <p>Your content here</p>
      </div>
      <Form method='post'>
        <Button type='submit' loading={isSubmitting}>
          Delete user?
        </Button>
      </Form>
    </Modal>
  );
}
