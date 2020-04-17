import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    const handleToggle = category => () => {
        const currentCategoryId = checked.indexOf(category)
        const newCheckedCategoryId = [...checked]
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return (
        <>
            {categories.map(category => (
                <li className="list-unstyled" key={category._id}>
                    <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)}
                           type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">{category.name}</label>
                </li>
            ))}
        </>
    )
}

export default Checkbox