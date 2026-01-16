import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Form, Link, useFetcher } from 'react-router';

import { HomeModule } from '~/modules/home';

import type { Route } from './+types/home';

export { homeAction as clientAction, homeLoader as clientLoader } from '~/modules/home';

export function meta() {
  return [{ title: 'home' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
      selectOption: ''
    },

    validate: {
      email: (value) => (/^\S[^\s@]*@\S+$/.test(value) ? null : 'Invalid email'),
      selectOption: (value) => (value ? null : 'Select an option')
    }
  });
  const submit = useFetcher();

  return (
    <div>
      <Link to='/users'>users</Link>
      {loaderData.res}
      <HomeModule />
      <Form
        onSubmit={form.onSubmit(async (values) => {
          submit.submit(values, { method: 'post' });
        })}
      >
        <TextInput
          withAsterisk
          key={form.key('email')}
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />

        <Checkbox
          key={form.key('termsOfService')}
          label='I agree to sell my privacy'
          mt='md'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Select
          key={form.key('selectOption')}
          data={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]}
          label='Select option'
          placeholder='Pick one'
          {...form.getInputProps('selectOption')}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </Form>
    </div>
  );
}
