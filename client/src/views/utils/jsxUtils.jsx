import React from 'react';
import Utils from './utilities';

const decorateFoundItems = (predicateObjectArray, predicateAccessor, selectionObjectArray, selectionAccessor, decoratorCssClass, joiner) => {

    if (predicateObjectArray && predicateObjectArray.length) {
        return predicateObjectArray.map((item, index) => {
            // const found = selectionObjectArray.find(_ => _[selectionAccessor] === item[predicateAccessor]);
            const found = Utils.findObjectInArray(item[predicateAccessor], selectionObjectArray, selectionAccessor);
            const span = found ?
                <span key={`decorated_${index}`} className={decoratorCssClass}>{item[predicateAccessor]}</span> :
                <span key={`decorated_${index}`}>{item[predicateAccessor]}</span>
            return index < predicateObjectArray.length - 1 ? [...[span, <span key={`joiner_${index}`}>{joiner}</span>]] : span;
        });
    } else {
        return "None";
    }
};


export default {
    decorateFoundItems
};
