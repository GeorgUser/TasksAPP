import React from "react";
import PropTypes from "prop-types";

const FormMessage = ({type, children}) => (
    <div className="form-message" style={{color: type === "error" ? "#e81216" : "#039a3c", fontSize: "10px"}}>
        {children}
    </div>
);

FormMessage.propTypes = {
    type: PropTypes.string,
    children: PropTypes.string
};

FormMessage.defaultProps = {
    type: "error",
    children: " ",
};

export default FormMessage;