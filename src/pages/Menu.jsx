import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useClient } from '../context/ClientContext'
import './Menu.css'

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addToCart } = useCart()
  const { client } = useClient()

  // Get categories and products from client config, with fallbacks
  const categories = client?.categories || [
    { id: 'all', label: 'All' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'dairy', label: 'Dairy Products' },
    { id: 'bestseller', label: 'Best Seller' }
  ]

  const products = client?.products || []

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    })
  }

  return (
    <div className="menu fade-in">
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">Explore our handcrafted selections</p>
        </div>
      </section>

      <section className="menu-content">
        <div className="menu-container">
          <div className="menu-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`menu-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="menu-card">
                <div className="menu-card-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="menu-card-content">
                  <h3 className="menu-card-title">{product.name}</h3>
                  <p className="menu-card-description">{product.description}</p>
                  <div className="menu-card-footer">
                    <span className="menu-card-price">₱{product.price}</span>
                    <button 
                      className="menu-card-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Menu
