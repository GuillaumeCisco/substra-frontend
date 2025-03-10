import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getItem, getOrderedResults, getSelected} from '../../selector';
import {withListAnalytics} from '../../../../common/components/list/analytics';
import List from './index';

const mapStateToProps = (state, {
    model, filterUp, addNotification,
}) => ({
    init: state[model].list.init,
    loading: state[model].list.loading,
    results: getOrderedResults(state, model),
    selected: getSelected(state, model),
    order: state[model].order,
    item: getItem(state, model),
    location: state.location,
    filterUp,
    addNotification,
});

const mapDispatchToProps = (dispatch, {actions}) => bindActionCreators({
    fetchList: actions.list.request,
    setSelected: actions.list.selected,
    setOrder: actions.order.set,
}, dispatch);

export const withListRedux = Component => connect(mapStateToProps, mapDispatchToProps)(Component);

export default withListRedux(withListAnalytics(List));
