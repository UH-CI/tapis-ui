import { act, fireEvent, screen } from '@testing-library/react';
import renderComponent from 'utils/testing';
import RenameModal from './RenameModal';
import { useMove } from 'tapis-hooks/files';
import { fileInfo } from 'fixtures/files.fixtures';
import { useFilesSelect } from 'tapis-app/Files/_components/FilesContext';

jest.mock('tapis-hooks/files/useMove');
jest.mock('tapis-app/Files/_components/FilesContext');

describe('RenameModal', () => {
  it('submits with valid inputs', async () => {
    const moveMock = jest.fn();
    const resetMock = jest.fn();
    (useMove as jest.Mock).mockReturnValue({
      move: moveMock,
      isLoading: false,
      error: null,
      isSuccess: false,
      reset: resetMock,
    });
    (useFilesSelect as jest.Mock).mockReturnValue({
      selectedFiles: [fileInfo],
    });

    renderComponent(
      <RenameModal toggle={() => {}} systemId={'system-id'} path={'/'} />
    );

    const input = screen.getByLabelText(/Name/);
    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: 'testdir',
        },
      });
    });

    const button = screen.getByLabelText('Submit');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(moveMock).toBeCalledTimes(1);
    expect(resetMock).toBeCalledTimes(1);
  });

  it('fails with invalid inputs', async () => {
    const moveMock = jest.fn();
    const resetMock = jest.fn();
    (useMove as jest.Mock).mockReturnValue({
      move: moveMock,
      isLoading: false,
      error: null,
      isSuccess: false,
      reset: resetMock,
    });
    (useFilesSelect as jest.Mock).mockReturnValue({
      selectedFiles: [fileInfo],
    });

    renderComponent(
      <RenameModal toggle={() => {}} systemId={'system-id'} path={'/'} />
    );
    const input = screen.getByLabelText(/Name/);
    await act(async () => {
      fireEvent.change(input, {
        target: {
          // * is an invalid value
          value: '*',
        },
      });
    });

    const button = screen.getByLabelText('Submit');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(moveMock).toBeCalledTimes(0);
    expect(resetMock).toBeCalledTimes(1);
  });
});
