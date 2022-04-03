import React, {
    FC,
    ReactChild,
    useState
} from 'react'
import cn from 'classnames'

import './index.scss'

type TabItem = {
    header: string, 
    component: JSX.Element[] | ReactChild
}

type TabItems = TabItem[]

const Tabs: FC<{items: TabItems}> = ({items}) => {
    const [toggleState, setToggleState] = useState(0)

    const toggleTab = (id: number) => {
        setToggleState(id)
    }

    return (
        <div>
            <div className='block__tabs'>
                {items.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className={cn('tabs', toggleState == idx ? 'active__tab' : '')}
                            onClick={() => toggleTab(idx)}
                        >
                            {item.header}
                        </div>
                    )
                })}
            </div>
            <div className='content__tabs'>
                {items.map((item, idx) => {
                    return (
                        <div
                            key={idx}
                            className={toggleState == idx ? 'active__content' : 'content'}
                        >
                            {item.component}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs