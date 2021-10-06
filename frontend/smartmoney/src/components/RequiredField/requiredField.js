import React from "react";
import { useMediaQuery } from 'react-responsive';
import webStyles from "./webStyles";
import mobilStyles from "./mobilStyles";

const RequiredField = () => {

    const isMobileDevice = useMediaQuery({
        query: "(max-device-width: 480px)",
      });

    return(
        <p style={isMobileDevice ? mobilStyles.requiredFieldText : webStyles.requiredFieldText}>
            * Este campo es obligatorio
        </p>
    )
}

export default RequiredField;