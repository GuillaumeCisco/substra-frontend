import React, {Component} from 'react';
import universal from 'react-universal-component';
import {injectSaga, injectReducer} from 'redux-sagas-injector';
import {ReactReduxContext} from 'react-redux';

import PulseLoader from 'react-spinners/PulseLoader';

class Universal extends Component {
    constructor(props) {
        super(props);
        this.firstRender = true;
    }

    render() {
        const U = universal(import('../../search/components/index'), {
            loading: <PulseLoader size={6} />,
            onLoad: (module, info, {reduxcontext, ...props}) => {
                // need all models reducers
                // do not forget to pass the reduxcontext.store AND the withInjectedReducers wrapper to your imported redux component, or concurrent calls in the server part will fail

                if (reduxcontext && reduxcontext.store) {
                    injectSaga('objective', module.objectiveSagas, false, reduxcontext.store);
                    injectReducer('objective', module.objectiveReducer, false, reduxcontext.store);

                    injectSaga('dataset', module.datasetSagas, false, reduxcontext.store);
                    injectReducer('dataset', module.datasetReducer, false, reduxcontext.store);

                    injectSaga('algo', module.algoSagas, false, reduxcontext.store);
                    injectReducer('algo', module.algoReducer, false, reduxcontext.store);

                    injectSaga('model', module.modelSagas, false, reduxcontext.store);
                    injectReducer('model', module.modelReducer, false, reduxcontext.store);
                }
            },
            ignoreBabelRename: true,
        });
        if (this.firstRender) {
            this.firstRender = false;
            return (
                <ReactReduxContext.Consumer>
                    {reduxContext => <U reduxcontext={reduxContext} />}
                </ReactReduxContext.Consumer>
);
        }

        return <U />;
    }
}

export default Universal;
