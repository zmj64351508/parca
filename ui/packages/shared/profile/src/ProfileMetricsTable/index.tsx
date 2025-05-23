// Copyright 2025 The Parca Authors
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

import { useEffect } from 'react';
import {
  createColumnHelper,
  type CellContext,
  type ColumnDef,
} from '@tanstack/table-core';
import {
  Table as TableComponent,
  TableSkeleton,
  useParcaContext,
} from '@parca/components';
import { Query } from '@parca/parser';
import { Label, QueryServiceClient, MetricsSample, MetricsSeries as MetricsSeriesPb } from '@parca/client';
import { capitalizeOnlyFirstLetter } from '@parca/utilities';
import { useQueryRange } from '../ProfileMetricsGraph/hooks/useQueryRange';
import { MergedProfileSelection, ProfileSelection } from '..';

const ErrorContent = ({ errorMessage }: { errorMessage: string }): JSX.Element => {
  return (
    <div
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export interface Row {
  metric: Label[];
  value: number
  percent: number
}

export type ProfileMetricsGraphProps = {
  queryClient: QueryServiceClient;
  queryExpression: string;
  profile: ProfileSelection | null;
  from: number;
  to: number;
  sumByLoading: boolean;
  sumBy: string[];
  comparing?: boolean;
};

const ProfileMetricsTable = ({
  queryClient,
  queryExpression,
  profile,
  from,
  to,
  comparing = false,
  sumBy,
  sumByLoading,
}: ProfileMetricsGraphProps): JSX.Element => {
  const {
    isLoading: metricsGraphLoading,
    response,
    error,
  } = useQueryRange(queryClient, queryExpression, from, to, sumBy, sumByLoading);
  const { onError, perf, authenticationErrorMessage, isDarkMode } = useParcaContext();

  useEffect(() => {
    if (error !== null) {
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (response === null) {
      return;
    }

    perf?.markInteraction('Metrics graph render', response.series[0].samples.length);
  }, [perf, response]);

  const series = response?.series;

  const dataAvailable = series !== null && series !== undefined && series?.length > 0;

  const loading = metricsGraphLoading;

  if (!metricsGraphLoading && error !== null) {
    if (authenticationErrorMessage !== undefined && error.code === 'UNAUTHENTICATED') {
      return <ErrorContent errorMessage={authenticationErrorMessage} />;
    }

    return <ErrorContent errorMessage={capitalizeOnlyFirstLetter(error.message)} />;
  }

  let sampleUnit = '';
  let valueHeader = sampleUnit;
  let rows: Row[] = []
  let columns: ColumnDef<Row>[] = []

  if (dataAvailable) {
    if (series.every((val, i, arr) => val?.sampleType?.unit === arr[0]?.sampleType?.unit)) {
      sampleUnit = series[0]?.sampleType?.unit ?? '';
    }
    if (sampleUnit === '') {
      sampleUnit = Query.parse(queryExpression).profileType().sampleUnit;
    }

    let mergedProfile = profile as MergedProfileSelection;
    const isDeltaType = profile !== null ? mergedProfile?.query.profType.delta : false;

    if (isDeltaType) {
      if (sampleUnit === 'nanoseconds') {
        valueHeader = 'CPU Cores per Second';
      }
      if (sampleUnit === 'bytes') {
        valueHeader = 'Bytes per Second';
      }
    }

    rows = series.reduce<Row[]>(function (agg: Row[], s: MetricsSeriesPb) {
      if (s.labelset !== undefined) {
        const metric = s.labelset.labels.sort((a, b) => a.name.localeCompare(b.name));
        agg.push({
          metric,
          value: s.samples.reduce<number>(function (agg: number, d: MetricsSample) {
            if (d.timestamp !== undefined && d.valuePerSecond !== undefined) {
              agg += d.valuePerSecond * Number(d.duration / BigInt(1e9))
            }
            return agg;
          }, 0) / ((to - from) / 1e3),
          percent: 0,
        });
      }
      return agg;
    }, []);
    let valueSum = rows.reduce((acc, row) => acc + row.value, 0);
    for (let i = 0; i < rows.length; i++) {
      rows[i].percent = rows[i].value / valueSum * 100;
    }

    const columnHelper = createColumnHelper<Row>();
    sumBy.sort((a, b) => a.localeCompare(b)).forEach(labelName => {
      columns.push(columnHelper.accessor(row => {
        const label = row.metric.find(m => m.name === labelName);
        return label ? label.value : '';
      }, {
        id: labelName,
        header: labelName,
        size: 80,
        meta: {
          align: 'left',
        },
        invertSorting: true,
      }));
    });
    columns.push(
      columnHelper.accessor('value', {
        id: 'value',
        header: valueHeader,
        cell: info => (info as CellContext<Row, number>).getValue().toFixed(4),
        size: 80,
        meta: {
          align: 'left',
        },
        invertSorting: true,
        sortDescFirst: true,
      })
    );
    columns.push(
      columnHelper.accessor('percent', {
        id: 'percent',
        header: 'Percent',
        cell: info => (info as CellContext<Row, number>).getValue().toFixed(2) + '%',
        size: 80,
        meta: {
          align: 'left',
        },
        invertSorting: true,
        sortDescFirst: true,
      })
    );
  }

  return (
    <div>
      {loading ? (
        <TableSkeleton isHalfScreen={false} isDarkMode={isDarkMode} />
      ) : dataAvailable ? (
        <TableComponent
          data={rows}
          columns={columns}
          initialSorting={[{ id: 'percent', desc: false }]}
        />
      ) : (
        <TableSkeleton isHalfScreen={false} isDarkMode={isDarkMode} />
      )}
    </div>
  )
}

export default ProfileMetricsTable;
