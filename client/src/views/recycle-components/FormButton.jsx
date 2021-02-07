import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { Button } from 'reactstrap';

/**
 * A button that will be scaled to fill the horizontal width when width < 768px
 * @returns {*} The React component that creates the responsive button
 */
export const ResponsiveFormButton = (props) => {
    return (
        <Media query={{ minWidth: 768 }}>
            {(matches) => {
                const { classInSmallScreen, classInBigScreen, className, onClick, text, disabled = false, ...rest } = props;
                if (matches) {
                    const mergedClassName = `pl-5 pr-5 ${className} ${classInBigScreen}`;
                    return (
                        <div className="text-right">
                            <Button disabled={disabled} onClick={onClick} {...rest} className={mergedClassName}>{text}</Button>
                        </div>
                    );
                }
                const mergedClassName = `${className} ${classInSmallScreen}`;
                return (
                    <div className="text-center">
                        <Button disabled={disabled} block onClick={onClick} {...rest} className={mergedClassName}>{text}</Button>
                    </div>
                );
            }}
        </Media>
    )
};

ResponsiveFormButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    classInSmallScreen: PropTypes.string,
    classInBigScreen: PropTypes.string,
};