import React from 'react';

const imageUrls = {
  'ico_red': require('../../img/ico_red.png'),
  'ico_flag': require('../../img/ico_flag.png')
};
const ErrorCount = (props) =>  <div><img width="11"
                                    src={ imageUrls[props.value > 0 ? 'ico_red' : 'ico_flag'] }
                                    alt=""/>{props.value}</div>;
export default ErrorCount;
