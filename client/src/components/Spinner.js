import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({
                     mainColor = "#007bff",
                     bgColor = "#fff",
                     duration="1080ms"
                 }) => {


    return (
        <div className={'spinner'}>
            <svg style={{'background' : bgColor, 'borderRadius' : '5px'}} xmlns="http://www.w3.org/2000/svg" version="1.0" width="98px" height="37px" viewBox="0 0 35 15">
                <g>
                    <path
                        d="M-22.949-5.576l4.525,4.525L-41.051,21.576l-4.525-4.525Zm19.2,0L0.776-1.051-21.851,21.576l-4.526-4.525Zm19.2,0,4.525,4.525L-2.651,21.576l-4.525-4.525Zm19.2,0,4.525,4.525L16.549,21.576l-4.525-4.525Zm19.2,0,4.525,4.525L35.749,21.576l-4.526-4.525Zm38.4,0,4.525,4.525L74.149,21.576l-4.525-4.525Zm-19.2,0,4.525,4.525L54.949,21.576l-4.526-4.525Zm38.4,0,4.525,4.525L93.349,21.576l-4.526-4.525Zm19.2,0,4.525,4.525L112.549,21.576l-4.525-4.525Zm19.2,0,4.525,4.525L131.749,21.576l-4.525-4.525Z"
                        fill={mainColor}/>
                    <animateTransform attributeName="transform" type="translate" from="0 0" to="-19 0" dur={duration}
                                      repeatCount="indefinite"/>
                </g>
            </svg>
        </div>
    )
};

Spinner.propTypes = {
    main: PropTypes.string,
    bg: PropTypes.string,
    duration: PropTypes.string
};

export default Spinner;