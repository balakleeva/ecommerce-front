export const handleAddToCart = (bookId) => {
	let cart = []
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'))
	}

	cart.push(bookId)

	localStorage.setItem('cart', JSON.stringify(cart))
}

export const handleRemoveFromCart = (bookId) => {
	let cart = []
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'))
	}

	cart = cart.filter((ids) => ids !== bookId)
	localStorage.setItem('cart', JSON.stringify(cart))
}
