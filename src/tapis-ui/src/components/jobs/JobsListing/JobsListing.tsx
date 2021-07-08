import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useJobs } from 'tapis-redux';
import { JobsListCallback } from 'tapis-redux/jobs/list/types';
import { Config, TapisState } from 'tapis-redux/types';
import { Jobs } from '@tapis/tapis-typescript';
import { LoadingSpinner } from 'tapis-ui/_common';

export type OnSelectCallback = (app: Jobs.JobListDTO) => any;

interface JobsListingItemProps {
  job: Jobs.JobListDTO,
  onSelect?: OnSelectCallback
}

const JobsListingItem: React.FC<JobsListingItemProps> = ({ job, onSelect }) => {
  return (
    <div onClick={() => onSelect ? onSelect(job) : null}>
      {`${job.name} ${job.uuid} (${job.status})`}
    </div>
  );
};

JobsListingItem.defaultProps = {
  onSelect: null
}

interface JobsListingProps {
  config?: Config,
  onList?: JobsListCallback,
  onSelect?: OnSelectCallback
}

const JobsListing: React.FC<JobsListingProps> = ({ config, onList, onSelect }) => {
  const dispatch = useDispatch();

  // Get a file listing given the systemId and path
  const { list, jobs } = useJobs(config);
  useEffect(() => {
    dispatch(list({ onList, request: { orderBy: "created(desc)"} }));
  }, [dispatch, onList]);

  const jobSelectCallback = useCallback<OnSelectCallback>(
    (job: Jobs.JobListDTO) => {
      if (onSelect) {
        onSelect(job);
      }
    },
    [onSelect]
  )

  if (!jobs || jobs.loading) {
    return <LoadingSpinner />
  }

  const jobsList: Array<Jobs.JobListDTO> = jobs.results;

  return (
    <div>
      {
        jobsList.map((job: Jobs.JobListDTO) => {
          return (
            <JobsListingItem job={job} onSelect={jobSelectCallback} />
          )
        })
      }
    </div>
  );
};

JobsListing.defaultProps = {
  config: null,
  onList: null,
  onSelect: null
}

export default JobsListing;
