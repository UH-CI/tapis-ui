import { Button } from 'reactstrap';
import { Pods } from '@tapis/tapis-typescript';
import { GenericModal } from '@tapis/tapisui-common';
import { SubmitWrapper } from '@tapis/tapisui-common';
import { ToolbarModalProps } from '../../PodFunctionBar/PodFunctionBar';
import { Form, Formik } from 'formik';
import { FormikSelect } from '@tapis/tapisui-common';
import { useEffect, useCallback } from 'react';
import styles from './GetPodSecretsModal.module.scss';
import * as Yup from 'yup';
import { useQueryClient } from 'react-query';
import { Pods as Hooks } from '@tapis/tapisui-hooks';
import { useTapisConfig } from '@tapis/tapisui-hooks';
import { useLocation } from 'react-router-dom';

const GetPodSecretsModal: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const { claims } = useTapisConfig();
  const effectiveUserId = claims['sub'].substring(
    0,
    claims['sub'].lastIndexOf('@')
  );
  const { data } = Hooks.useList({ search: `owner.like.${effectiveUserId}` }); //{search: `owner.like.${''}`,}
  const pods: Array<Pods.PodResponseModel> = data?.result ?? [];

  //Allows the pod list to update without the user having to refresh the page
  const queryClient = useQueryClient();
  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(Hooks.queryKeys.list);
  }, [queryClient]);

  const { getPodSecrets, isLoading, error, isSuccess, reset } =
    Hooks.useGetPodSecrets();

  useEffect(() => {
    reset();
  }, [reset]);

  const validationSchema = Yup.object({
    podId: Yup.string(),
  });

  const podId = useLocation().pathname.split('/')[2];

  const initialValues = {
    podId: podId,
  };

  const onSubmit = ({ podId }: { podId: string }) => {
    getPodSecrets(podId, { onSuccess });
  };

  return (
    <GenericModal
      toggle={toggle}
      title="Pod Secrets"
      backdrop={true}
      body={
        <div className={styles['modal-settings']}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form id="newpod-form">
                <FormikSelect
                  name="podId"
                  description="The pod id"
                  label="Pod ID"
                  required={true}
                  data-testid="podId"
                >
                  <option disabled value={''}>
                    Select a pod to stop
                  </option>
                  {pods.length ? (
                    pods.map((pod) => {
                      return <option>{pod.pod_id}</option>;
                    })
                  ) : (
                    <i>No pods found</i>
                  )}
                </FormikSelect>
              </Form>
            )}
          </Formik>
        </div>
      }
      footer={
        <SubmitWrapper
          className={styles['modal-footer']}
          isLoading={isLoading}
          error={error}
          success={isSuccess ? `Successfully stopped a pod` : ''}
          reverse={true}
        >
          <Button
            form="newpod-form"
            color="primary"
            disabled={isLoading || isSuccess}
            aria-label="Submit"
            type="submit"
          >
            Stop pod
          </Button>
        </SubmitWrapper>
      }
    />
  );
};

export default GetPodSecretsModal;
