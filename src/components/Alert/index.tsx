import {FC} from 'react'
import cn from 'classnames'

import './index.scss'

type AlertType = {
    message: string
    type?: string
}

const Alert: FC<AlertType> = ({message, type='primary'}) => {
    const alertClass = `alert-${type}`
    
    return (
        <div className={cn('alert', alertClass)} role='alert'>
            {message}
        </div>
    )
}

export default Alert