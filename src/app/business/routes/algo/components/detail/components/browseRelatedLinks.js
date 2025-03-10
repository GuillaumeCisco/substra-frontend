import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {noop} from 'lodash';

import objectiveActions from '../../../../objective/actions';
import datasetActions from '../../../../dataset/actions';
import modelActions from '../../../../model/actions';

import BrowseRelatedLink from '../../../../../common/components/detail/components/browseRelatedLink';


const BrowseRelatedLinks = ({
                                item, unselectObjective, unselectDataset, unselectModel,
                            }) => {
    const filter = `algo:name:${item ? encodeURIComponent(item.name) : ''}`;

    return (
        <Fragment>
            <BrowseRelatedLink model="model" label="models" filter={filter} unselect={unselectModel} />
        </Fragment>
    );
};

BrowseRelatedLinks.propTypes = {
    item: PropTypes.shape(),
    unselectObjective: PropTypes.func,
    unselectDataset: PropTypes.func,
    unselectModel: PropTypes.func,
};


BrowseRelatedLinks.defaultProps = {
    item: null,
    unselectObjective: noop,
    unselectDataset: noop,
    unselectModel: noop,
};

const mapDispatchToProps = dispatch => bindActionCreators({
    unselectObjective: objectiveActions.list.unselect,
    unselectDataset: datasetActions.list.unselect,
    unselectModel: modelActions.list.unselect,
}, dispatch);


export default connect(null, mapDispatchToProps)(BrowseRelatedLinks);
