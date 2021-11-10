import { useCallback, useState, useReducer } from 'react';
import { Button } from 'reactstrap';
import {
  GenericModal,
  Breadcrumbs,
  Icon,
  LoadingSpinner,
} from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import breadcrumbsFromPathname from 'tapis-ui/_common/Breadcrumbs/breadcrumbsFromPathname';
import { FileListingTable } from 'tapis-ui/components/files/FileListing/FileListing';
import { FileExplorer } from '../_components';
import { ToolbarModalProps } from '../Toolbar';
import { useLocation } from 'react-router';
import { focusManager } from 'react-query';
import { useCreate, useList, useCancel } from 'tapis-hooks/files/transfers';
import { Files } from '@tapis/tapis-typescript';
import { Column } from 'react-table';
import styles from './TransferModal.module.scss';
import { useFilesSelect } from '../../FilesContext';

const TransferModal: React.FC<ToolbarModalProps> = ({
  toggle,
  systemId = '',
  path = '/',
}) => {
  const { pathname } = useLocation();
  const [destination, setDestination] = useState<{ systemId: string, path: string}>({ systemId, path });
  const { selectedFiles } = useFilesSelect();
  const { create, isLoading: createIsLoading, error: createError } = useCreate(); 

  const onNavigate = useCallback(
    (systemId: string | null, path: string | null) => {
      if (!!systemId && !!path) {
        setDestination({ systemId, path })
      }
    },
    [setDestination]
  );
  const onSubmit = useCallback(() => {
    // Create transfer
  }, [selectedFiles, create, destination]);

  const body = (
    <div className="row h-100">
      <div className="col-md-6 d-flex flex-column">
        {/* Table of selected files */}
        <div className={`${styles['col-header']}`}>
          Transfering {selectedFiles.length} files
        </div>
        <Breadcrumbs
          breadcrumbs={[
            ...breadcrumbsFromPathname(pathname)
              .splice(1)
              .map((fragment) => ({ text: fragment.text })),
          ]}
        />
        <div className={styles['nav-list']}>
          <FileListingTable
            files={selectedFiles}
            className={`${styles['file-list-origin']} `}
            fields={['size']}
          />
        </div>
      </div>
      <div className="col-md-6 d-flex flex-column">
        {/* Table of selected files */}
        <div className={`${styles['col-header']}`}>Destination</div>
        <FileExplorer systemId={systemId} path={path} onNavigate={onNavigate} />
      </div>
    </div>
  );

  return (
    <GenericModal
      toggle={toggle}
      title="Copy Files"
      size="xl"
      body={body}
    />
  );
};

export default TransferModal;
