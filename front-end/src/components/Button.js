import React from 'react'
import PropTypes from 'prop-types'

const TestButton = ({color, text}) => {

    const onClick = (e) =>{
        console.log(e)
    }

    return (
        <div>
            <button style={{ backgroundColor:color}} className='Button' onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

TestButton.defaultProps = {
    color: 'navy',
    text: 'Default Button'
}

TestButton.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string
}

export default TestButton
