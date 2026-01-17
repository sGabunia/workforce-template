import { Modal } from '@mantine/core';

import { useNavigateWithState } from '~/common/hooks/useNavigateWithState';
import { useRouteModal } from '~/common/hooks/useRouteModal';

import { UserCreateForm } from './user-create-form';

export function UserCreate() {
  const navigate = useNavigateWithState();
  const { opened, handleClose } = useRouteModal({
    onClose: () => navigate('/users')
  });
  return (
    <Modal onClose={handleClose} opened={opened}>
      <UserCreateForm />
    </Modal>
  );
}
