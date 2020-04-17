import React, { useState } from 'react'

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return (
        <>
            {prices.map(price => (
                <div key={price._id}>
                    <input
                        type="radio"
                        className="mr-2 ml-4"
                        name={price}
                        onChange={handleChange}
                        value={`${price._id}`}
                    />
                    <label className="form-check-label">{price.name}</label>
                </div>
            ))}
        </>
    )
}

export default RadioBox