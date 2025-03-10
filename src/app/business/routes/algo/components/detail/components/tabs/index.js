import React from 'react';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';
import styled from '@emotion/styled';
import {noop} from 'lodash';

import {
    RoundedButton,
    DownloadSimple,
    Tabs,
    TabList,
    TabPanel,
} from '@substrafoundation/substra-ui';

import Tab from '../../../../../../common/components/detail/components/tabs';
import Description from '../../../../../../common/components/detail/components/description';
import {spacingNormal} from '../../../../../../../../../assets/css/variables/spacing';
import PermissionsTabPanelContent from '../../../../../../common/components/detail/components/permissionsTabPanelContent';

const Span = styled('span')`
    margin-right: ${spacingNormal};
`;

const AlgoTabs = ({
descLoading, item, tabIndex, setTabIndex, downloadFile,
}) => (
    <Tabs
        selectedIndex={tabIndex}
        onSelect={setTabIndex}
    >
        <TabList>
            <Tab>Description</Tab>
            <Tab>Code</Tab>
            <Tab>Permissions</Tab>
        </TabList>
        <TabPanel>
            {descLoading && <PulseLoader size={6} />}
            {!descLoading && <Description item={item} />}
        </TabPanel>
        <TabPanel>
            <Span>The algorithm's source code and Dockerfile are packaged within a zip or tar.gz file.</Span>
            <RoundedButton Icon={DownloadSimple} onClick={downloadFile}>
                Download algo
            </RoundedButton>
        </TabPanel>
        <TabPanel>
            <PermissionsTabPanelContent
                permissions={item.permissions}
                owner={item.owner}
                asset="dataset"
            />
        </TabPanel>
    </Tabs>
);


AlgoTabs.propTypes = {
    item: PropTypes.shape(),
    descLoading: PropTypes.bool,
    tabIndex: PropTypes.number,
    setTabIndex: PropTypes.func,
    downloadFile: PropTypes.func.isRequired,
};

AlgoTabs.defaultProps = {
    item: null,
    descLoading: false,
    tabIndex: 0,
    setTabIndex: noop,
};

export default AlgoTabs;
