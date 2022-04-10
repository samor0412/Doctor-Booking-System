import React, { ReactElement } from 'react';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import DoctorList from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockDoctors from './__mocks__/mockDoctors.json';
import { BrowserRouter } from 'react-router-dom';

jest.mock('api/getDoctors', () => async () => await mockDoctors);

const queryClient = new QueryClient();
const render = (element: ReactElement) =>
  rtlRender(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
    </BrowserRouter>
  );

describe('DoctorList', () => {
  it('snapshot', async () => {
    const { asFragment } = render(<DoctorList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a list of doctors', async () => {
    render(<DoctorList />);
    await waitFor(() => {
      expect(screen.queryByText('KWOK KWAN MAN')).toBeInTheDocument();
    });
  });
});
