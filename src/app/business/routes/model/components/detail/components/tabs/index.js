/* global SCORE_PRECISION */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {noop} from 'lodash';
import {
    AlertActions,
    CodeSample,
    Tabs,
    TabPanel,
    TabList,
} from '@substrafoundation/substra-ui';

import Tab from '../../../../../../common/components/detail/components/tabs';

import CopyInput from '../../../../../../common/components/detail/components/copyInput';
import {
    AlertWrapper, AlertTitle, AlertInlineButton,
} from '../../../../../../common/components/alert';


class ModelTabs extends Component {
    state = {
        tabIndex: 0,
    };

    setTabIndex = (tabIndex) => {
        this.setState({tabIndex});
    };

    gotoTesttuple = () => {
        this.setTabIndex(1);
    };

    render() {
        const {item, addNotification} = this.props;
        const {tabIndex} = this.state;

        return (
            <Fragment>
                {item && item.traintuple && item.traintuple.status === 'done' && !item.testtuple && (
                <AlertWrapper>
                    <AlertTitle>This model has not been tested yet</AlertTitle>
                    <AlertActions>
                        <AlertInlineButton onClick={this.gotoTesttuple}>learn more</AlertInlineButton>
                    </AlertActions>
                </AlertWrapper>
            )}
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={this.setTabIndex}
                >
                    <TabList>
                        <Tab>Traintuple/Model</Tab>
                        <Tab>Testtuple</Tab>
                    </TabList>
                    <TabPanel>
                        {item && item.traintuple && item.traintuple.status === 'done' && (
                        <p>
                            {'Model successfully trained with a score of '}
                            <b>{item.traintuple.dataset.perf.toFixed(SCORE_PRECISION)}</b>
                            {' on '}
                            <b>train data samples</b>
                            .
                        </p>
                    )}
                        <CodeSample
                            filename="traintuple.json"
                            language="json"
                            codeString={JSON.stringify(item.traintuple, null, 2)}
                        />
                    </TabPanel>
                    <TabPanel>
                        {item.testtuple && (
                        <Fragment>
                            <CodeSample
                                filename="testtuple.json"
                                language="json"
                                codeString={JSON.stringify(item.testtuple, null, 2)}
                            />
                        </Fragment>
                    )}
                        {item.traintuple && !item.testtuple && (
                        (item.traintuple.status === 'done' && (
                            <Fragment>
                                <p>
                                    {'In order to test this model, execute the following command:'}
                                </p>
                                <CopyInput
                                    value={`substra add testtuple '{"traintuple_key": "${item.traintuple.key}"}'`}
                                    addNotification={addNotification}
                                    addNotificationMessage="Command copied to clipboard!"
                                    isPrompt
                                />
                            </Fragment>

                        ))
                        || (item.traintuple.status === 'failed' && (
                            <p>This model could not complete its training (no testing possible).</p>
                        ))
                        || (['waiting', 'todo', 'doing'].includes(item.traintuple.status) && (
                            <Fragment>
                                <p>
                                    You can execute the code below to launch a testing task as soon as the training is over.
                                </p>
                                <CopyInput
                                    value={`substra add testtuple '{"traintuple_key": "${item.traintuple.key}"}'`}
                                    addNotification={addNotification}
                                    addNotificationMessage="Command copied to clipboard!"
                                    isPrompt
                                />
                            </Fragment>
                        ))
                    )}
                    </TabPanel>
                </Tabs>
            </Fragment>
);
    }
}

ModelTabs.propTypes = {
    item: PropTypes.shape(),
    addNotification: PropTypes.func,
};

ModelTabs.defaultProps = {
    item: null,
    addNotification: noop,
};

export default ModelTabs;
