/* global SCORE_PRECISION */
import React, {Fragment} from 'react';
import {css} from 'emotion';
import styled from '@emotion/styled';
import {noop} from 'lodash';
import {CodeSample} from '@substrafoundation/substra-ui';

import PropTypes from 'prop-types';
import {spacingNormal} from '../../../../../../../../assets/css/variables/spacing';
import {ice} from '../../../../../../../../assets/css/variables/colors';
import {
    SingleMetadata,
    MetadataWrapper,
    keyLabelClassName,
    keyValueClassName,
    BrowseRelatedMetadata,
    PermissionsMetadata,
} from '../../../../../common/components/detail/components/metadata';
import CopyInput from '../../../../../common/components/detail/components/copyInput';
import BrowseRelatedLinks from './browseRelatedLinks';
import ScoreMetadata from './scoreMetadata';

const PseudoSection = styled('div')`
    padding-top: ${spacingNormal};
    border-top: 1px solid ${ice};
    margin-top: ${spacingNormal};
`;

const margins = css`
    margin: ${spacingNormal} 0;
`;

const ModelSummary = ({model, addNotification}) => (
    <PseudoSection id={model.traintuple.key}>
        <MetadataWrapper>
            <SingleMetadata
                label="Traintuple key"
                labelClassName={keyLabelClassName}
                valueClassName={keyValueClassName}
            >
                <CopyInput
                    value={model.traintuple.key}
                    addNotification={addNotification}
                    addNotificationMessage="Traintuple\'s key successfully copied to clipboard!"
                />
            </SingleMetadata>
            <ScoreMetadata
                label="Validation Score"
                tupleName="nonCertifiedTesttuple"
                item={model}
            />
            <ScoreMetadata
                label="Score"
                tupleName="testtuple"
                item={model}
            />
            <SingleMetadata label="Creator" value={model.traintuple.creator} />
            <SingleMetadata label="Worker" value={model.traintuple.dataset.worker} />
            <PermissionsMetadata permissions={model.traintuple.permissions} />
            <BrowseRelatedMetadata>
                <BrowseRelatedLinks item={model} />
            </BrowseRelatedMetadata>
        </MetadataWrapper>
        {model && model.traintuple && (
            (model.traintuple.status === 'todo' && <p>Preparing training.</p>)
            || (model.traintuple.status === 'doing' && <p>Undergoing training.</p>)
            || (model.traintuple.status === 'failed' && <p>Training failed.</p>)
            || (model.traintuple.status === 'done' && (
                <Fragment>
                    {!model.testtuple && (
                        <Fragment>
                            <p>
                                {'Training successful. In order to test this model against the objective\'s test data samples, execute the following command:'}
                            </p>
                            <CopyInput
                                addNotification={addNotification}
                                addNotificationMessage="Command copied to clipboard!"
                                value={`substra add testtuple '{"traintuple_key": "${model.traintuple.key}"}'`}
                                isPrompt
                            />
                        </Fragment>
                    )}
                    {model.testtuple && (
                        (model.testtuple.status === 'todo' && <p>Training successful. Preparing testing.</p>)
                        || (model.testtuple.status === 'doing'
                            && <p>Training successful. Undergoing testing.</p>)
                        || (model.testtuple.status === 'failed'
                            && <p>Training successful. Failed testing.</p>)
                        || (model.testtuple.status === 'done' && (
                            <p>
                                {'Model successfully trained with a score of '}
                                <b>{model.testtuple.dataset.perf.toFixed(SCORE_PRECISION)}</b>
                                {' on the objective\'s test data samples.'}
                            </p>
                        ))
                    )}
                </Fragment>
            ))
        )}
        <CodeSample
            className={margins}
            filename="traintuple.json"
            language="json"
            collapsible
            codeString={JSON.stringify(model.traintuple, null, 2)}
        />
        {model && model.testtuple && (
            <CodeSample
                className={margins}
                filename="testtuple.json"
                language="json"
                collapsible
                codeString={JSON.stringify(model.testtuple, null, 2)}
            />
        )}
        {model && model.nonCertifiedTesttuples && model.nonCertifiedTesttuples.map(nonCertifiedTesttuple => (
            <CodeSample
                key={nonCertifiedTesttuple.key}
                className={margins}
                filename="validation-testtuple.json"
                language="json"
                collapsible
                codeString={JSON.stringify(nonCertifiedTesttuple, null, 2)}
            />
        ))}
    </PseudoSection>
);

ModelSummary.propTypes = {
    model: PropTypes.shape(),
    addNotification: PropTypes.func,
};

ModelSummary.defaultProps = {
    model: null,
    addNotification: noop,
};

export default ModelSummary;
