import { Button, Checkbox, Group, Select, TextInput } from '@mantine/core';
import { Form, Link, useFetcher } from 'react-router';

import { useRouterForm } from '~/common/router-hook-form';
import { HomeModule } from '~/modules/home';

import type { Route } from './+types/home';

export { homeLoader as clientLoader } from '~/modules/home';

export function meta() {
  return [{ title: 'home' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export async function clientAction() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
  const parsedPosts = await posts.json();
  return {
    name: parsedPosts
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const fetcher2 = useFetcher();
  const form = useRouterForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
      selectOption: ''
    },
    validate: {
      email: (value) => (/^\S[^\s@]*@\S+$/.test(value) ? null : 'Invalid email'),
      selectOption: (value) => (value ? null : 'Select an option')
    },
    fetcher
  });

  return (
    <div>
      <Link to='/users'>users</Link>
      {loaderData.res}
      <HomeModule />
      <fetcher.Form onSubmit={form.handleSubmit}>
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
          <Button type='submit' loading={form.isSubmittingForm}>
            Submit
          </Button>
        </Group>
      </fetcher.Form>
      <fetcher2.Form method='post'>
        <TextInput name='email' />
        <Button type='submit'>submit</Button>
      </fetcher2.Form>
      <Form action='users'>
        <Button name='page' type='submit' value='2'>
          nav users
        </Button>
      </Form>
    </div>
  );
}
