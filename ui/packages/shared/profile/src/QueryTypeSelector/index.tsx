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

import {createContext, useContext, useState} from 'react';
import Select, {type SelectItem} from '../SimpleMatchers/Select';

type QueryType = 'metrics-only' | 'all';

interface QueryTypeContextType {
  queryType: QueryType;
  setQueryType: (type: QueryType) => void;
  pendingQueryType: QueryType;
  setPendingQueryType: (type: QueryType) => void;
}

export const defaultValue: QueryTypeContextType = {
  queryType: 'all',
  setQueryType: () => {},
  pendingQueryType: 'all',
  setPendingQueryType: () => {},
};

const QueryTypeContext = createContext<QueryTypeContextType>(defaultValue);

export const QueryTypeProvider = ({children}: {children: React.ReactNode}) => {
  const [queryType, setQueryType] = useState<QueryType>('all');
  const [pendingQueryType, setPendingQueryType] = useState<QueryType>('all');
  return (
    <QueryTypeContext.Provider value={{queryType, setQueryType, pendingQueryType, setPendingQueryType}}>
      {children}
    </QueryTypeContext.Provider>
  );
};

export const useQueryTypeContext = (): QueryTypeContextType => {
  const context = useContext(QueryTypeContext);
  if (context === undefined) {
    return defaultValue;
  }
  return context;
};

export const useQueryType = (): QueryType => {
  const {queryType, setQueryType, pendingQueryType, setPendingQueryType} = useQueryTypeContext();
  return queryType
};

export interface QueryTypeSelectorProps {
  disabled?: boolean;
  visable?: boolean;
}

export const activateQueryType = (context :QueryTypeContextType) => {
  context.setQueryType(context.pendingQueryType)
};

interface Items {
	label: string;
	value: QueryType;
}

const transformItemsForSelect = (items: Items[]): SelectItem[] => {
  return items.map(item => ({
    key: item.value,
    element: {
      active: <>{item.label}</>,
      expanded: <>{item.label}</>,
    },
  }));
};


export const QueryTypeSelector = ({
  disabled = false,
  visable = true,
}: QueryTypeSelectorProps): JSX.Element => {
  if (!visable) {
	return <></>;
  }
  const {queryType, setQueryType, pendingQueryType, setPendingQueryType} = useQueryTypeContext();

  return (
    <Select
      items={transformItemsForSelect([
        {label: 'Metrics', value: 'metrics-only'},
        {label: 'All', value: 'all'},
      ])}
	  onSelection={value => setPendingQueryType(value as QueryType)}
      selectedKey={pendingQueryType}
	  className="rounded-tr-none rounded-br-none ring-0 focus:ring-0 outline-none"
	  loading={false}
	  searchable={false}
	  disabled={disabled}
    />
  );
};

export default QueryTypeSelector;