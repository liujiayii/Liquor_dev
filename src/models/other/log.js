import {fetch} from '@/services/other/log';

export default {
  namespace: 'log',
  state: {
    tableData: [],
    pagination: {},
    loading: false
  },
  effects: {
    * fetch({payload = {page: 1, limit: 10}}, {call, put}) {
      yield put({type: 'changeTableLoading', payload: true});
      const response = yield call(fetch, payload);
      if (response.code === 0) {
        yield put({
          type: 'changeTableData',
          payload: {
            tableData: response.data.list,
            pagination: {current: payload.page, pageSize: payload.limit, total: response.data.count}
          }
        });
        yield put({type: 'changeTableLoading', payload: false});
      }
    },
  },
  reducers: {
    changeTableData(state, {payload}) {
      return {...state, tableData: payload.tableData, pagination: payload.pagination};
    },
    changeTableLoading(state, {payload}) {
      return {...state, loading: payload};
    },
  },
}
