import {fetch} from '@/services/mall/allot';

export default {
  namespace: 'allot',
  state: {
    tableData: [],
    pagination: {},
    loading: false,
    search: {},
    drawerShow: false
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
            pagination: {current: payload.page, pageSize: payload.limit, total: response.data.count},
            search: {name: payload.name}
          }
        });
        yield put({type: 'changeTableLoading', payload: false});
      }
    },
    * showDrawer({payload}, {call, put}) {
      yield put({type: 'changeShowDrawer'})
    }
  },
  reducers: {
    changeTableData(state, {payload}) {
      return {...state, tableData: payload.tableData, pagination: payload.pagination, search: payload.search};
    },
    changeTableLoading(state, {payload}) {
      return {...state, loading: payload};
    },
    changeShowDrawer(state, {payload}) {
      return {...state, drawerShow: !state.drawerShow}
    }
  },
}
