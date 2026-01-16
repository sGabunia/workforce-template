import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Form, useSubmit } from 'react-router';

export function UserCreate() {
  const submit = useSubmit();

  const form = useForm({
    initialValues: {
      name: '',
      user: '',
      role: '',
      group: '',
      shift: '',
      status: ''
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? 'Name is required' : null),
      user: (value) => (value.trim().length === 0 ? 'User is required' : null),
      role: (value) => (value.trim().length === 0 ? 'Role is required' : null),
      group: (value) => (value.trim().length === 0 ? 'Group is required' : null),
      shift: (value) => (value.trim().length === 0 ? 'Shift is required' : null),
      status: (value) => (value.trim().length === 0 ? 'Status is required' : null)
    }
  });

  return (
    <Form
      onSubmit={form.onSubmit(async (values) => {
        submit(values, { method: 'post' });
      })}
    >
      <Stack gap='md'>
        <TextInput required label='Name' placeholder='Enter name' {...form.getInputProps('name')} />

        <TextInput
          required
          label='User'
          placeholder='Enter username'
          {...form.getInputProps('user')}
        />

        <Select
          required
          data={['Admin', 'Manager', 'Employee', 'Viewer']}
          label='Role'
          placeholder='Select role'
          {...form.getInputProps('role')}
        />

        <Select
          required
          data={['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5']}
          label='User group'
          placeholder='Select group'
          {...form.getInputProps('group')}
        />

        <Select
          required
          data={['Morning', 'Afternoon', 'Night']}
          label='Shift bag'
          placeholder='Select shift'
          {...form.getInputProps('shift')}
        />

        <Select
          required
          data={['Active', 'Inactive']}
          label='Status'
          placeholder='Select status'
          {...form.getInputProps('status')}
        />

        <Button type='submit'>Create User</Button>
      </Stack>
    </Form>
  );
}
