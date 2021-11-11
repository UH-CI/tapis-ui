import { Files } from '@tapis/tapis-typescript';

export { default as useList } from './useList';
export { default as useMkdir } from './useMkdir';
export { default as useMove } from './useMove';
export { default as useCopy } from './useCopy';
export { default as useUpload } from './useUpload';
export { default as useStat } from './useStat';
export { default as usePermissions } from './usePermissions';
export { default as useNativeOp } from './useNativeOp';
export { default as useDelete } from './useDelete';
export { default as useDownload } from './useDownload';

export type MoveCopyHookParams = {
  systemId: string;
  path: string;
  newPath: string;
};

export type NativeOpParams = {
  systemId: string;
  path: string;
  recursive?: boolean;
  operation: Files.NativeLinuxOpRequestOperationEnum;
  argument?: string;
};
