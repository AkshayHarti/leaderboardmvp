import React from 'react';
import l10n from '../i18n/en';

export default class Competitor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(            
            <div className="row2" id="competitorInfo">
                <h3>
                    {l10n.competitor_registered}
                </h3>
            </div>
        );
    }
}