import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from '../../common/theme/index';

import App from '../../app';

// For using browserHistory with amazon s3, we need our own domain name
// and a custom routerHistory
// http://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html
/*
 <RoutingRules>
 <RoutingRule>
 <Condition>
 <KeyPrefixEquals>ghost/</KeyPrefixEquals>
 <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
 </Condition>
 <Redirect>
 <Protocol>https</Protocol>
 <HostName>admin.rythm.co</HostName>
 <ReplaceKeyPrefixWith>ghost#</ReplaceKeyPrefixWith>
 </Redirect>
 </RoutingRule>
 </RoutingRules>
 */

// put this code INSIDE the component
// handle custom listen override for replacing fragment url from s3
// const path = (/#(.*)$/.exec(history.location.hash) || [])[1];
// if (path) {
//     history.replace(path);
// }

const Root = ({store}) => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
);


Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;
