// Copyright 2022 The Parca Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {useState} from 'react';

import cx from 'classnames';

import {QueryServiceClient} from '@parca/client';
import {useURLState} from '@parca/components';
import {Query} from '@parca/parser';
import type {NavigateFunction} from '@parca/utilities';

import {ProfileDiffSource, ProfileSelection, ProfileViewWithData} from '..';
import ProfileSelector, {QuerySelection} from '../ProfileSelector';

interface ProfileExplorerCompareProps {
  queryClient: QueryServiceClient;

  queryA: QuerySelection;
  queryB: QuerySelection;
  profileA: ProfileSelection | null;
  profileB: ProfileSelection | null;
  selectQueryA: (query: QuerySelection) => void;
  selectQueryB: (query: QuerySelection) => void;
  selectProfileA: (source: ProfileSelection) => void;
  selectProfileB: (source: ProfileSelection) => void;
  closeProfile: (card: string) => void;

  navigateTo: NavigateFunction;
}

const ProfileExplorerCompare = ({
  queryClient,
  queryA,
  queryB,
  profileA,
  profileB,
  selectQueryA,
  selectQueryB,
  selectProfileA,
  selectProfileB,
  closeProfile,
  navigateTo,
}: ProfileExplorerCompareProps): JSX.Element => {
  const [showMetricsGraph, setShowMetricsGraph] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const closeProfileA = (): void => {
    closeProfile('A');
  };

  const closeProfileB = (): void => {
    closeProfile('B');
  };

  const [compareAbsolute] = useURLState('compare_absolute');
  const [functionFilter] = useURLState('filter_by_function');

  return (
    <>
      <div
        className="flex justify-between gap-2 relative mb-2"
        onMouseEnter={() => {
          if (!showMetricsGraph) return;
          setShowButton(true);
        }}
        onMouseLeave={() => {
          if (!showMetricsGraph) return;
          setShowButton(false);
        }}
      >
        <button
          onClick={() => setShowMetricsGraph(!showMetricsGraph)}
          className={cx(
            'hidden right-0 bottom-3 z-10 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-900',
            showButton && showMetricsGraph && 'absolute !flex',
            !showMetricsGraph && 'relative !flex mt-3 ml-auto'
          )}
        >
          {showMetricsGraph ? 'Hide' : 'Show'} Metrics Graph
        </button>

        {showMetricsGraph ? (
          <>
            <div className="flex-column flex-1 p-2 shadow-md rounded-md">
              <ProfileSelector
                queryClient={queryClient}
                querySelection={queryA}
                profileSelection={profileA}
                selectProfile={selectProfileA}
                selectQuery={selectQueryA}
                closeProfile={closeProfileA}
                enforcedProfileName={''}
                comparing={true}
                navigateTo={navigateTo}
                suffix="_a"
              />
            </div>
            <div className="flex-column flex-1 p-2 shadow-md rounded-md">
              <ProfileSelector
                queryClient={queryClient}
                querySelection={queryB}
                profileSelection={profileB}
                selectProfile={selectProfileB}
                selectQuery={selectQueryB}
                closeProfile={closeProfileB}
                enforcedProfileName={Query.parse(queryA.expression).profileName()}
                comparing={true}
                navigateTo={navigateTo}
                suffix="_b"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-1">
        {profileA != null && profileB != null ? (
          <div>
            <ProfileViewWithData
              queryClient={queryClient}
              profileSource={
                new ProfileDiffSource(
                  profileA.ProfileSource(),
                  profileB.ProfileSource(),
                  Array.isArray(functionFilter) ? functionFilter[0] : functionFilter,
                  compareAbsolute === 'true'
                )
              }
            />
          </div>
        ) : (
          <div>
            <div className="my-20 text-center">
              <p>Select a profile on both sides.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileExplorerCompare;
