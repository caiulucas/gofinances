import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'ts-jest/utils';
import { startAsync } from 'expo-auth-session';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

const mockedUser = JSON.stringify({
  id: 'any-id',
  given_name: 'John Doe',
  email: 'any@email.com',
  picture: 'any.png',
});

const mockedGoogleAuth = mocked(startAsync as any);

fetchMock.enableMocks();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  it('should be able to sign in with an existing Google account', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    mockedGoogleAuth.mockReturnValueOnce({
      type: 'success',
      params: { access_token: 'any-token' },
    });

    fetchMock.mockResponseOnce(mockedUser);

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user.email).toBe('any@email.com');
  });

  it('should not connect if the user cancels authentication with Google account', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    mockedGoogleAuth.mockReturnValueOnce({
      type: 'cancel',
    });
    fetchMock.mockResponseOnce('');

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user.email).not.toHaveProperty('id');
  });
});
