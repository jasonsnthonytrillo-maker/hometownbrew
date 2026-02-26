# Multi-Client React Website

A React + Vite static website that supports multiple clients from a single deployment. Each client has their own:
- Business name
- Logo / banner
- Color theme
- Products / prices
- Messenger checkout link
- Contact information

## URL Structure

```
your-site.com/                    → Default client (hometownbrew)
your-site.com/hometownbrew        → Hometown Brew
your-site.com/hometownbrew/menu  → Hometown Brew Menu
your-site.com/milkteashop        → Milk Tea Shop
your-site.com/milkteashop/menu   → Milk Tea Shop Menu
your-site.com/projectbrew        → Project Brew
your-site.com/projectbrew/menu   → Project Brew Menu
```

## Folder Structure

```
src/
├── data/
│   └── clients.js              ← Client configurations (add new clients here)
├── context/
│   ├── ClientContext.jsx       ← Client detection & data provider
│   └── CartContext.jsx         ← Shopping cart (existing)
├── components/
│   ├── Navbar.jsx              ← Dynamic logo & navigation
│   ├── Footer.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx                ← Dynamic products from client config
│   ├── Contact.jsx              ← Dynamic contact info
│   ├── Cart.jsx                ← Dynamic messenger link
│   └── ClientPage.jsx          ← Client wrapper component
├── App.jsx                     ← Client-aware routing
└── main.jsx
```

## How to Add a New Client

1. **Add client to `src/data/clients.js`**:

```
javascript
// Add new client object to the clients export
newclientname: {
  id: 'newclientname',
  name: 'New Client Name',
  logo: '/newclient-logo.png',        // Put image in public folder
  banner: '/newclient-banner.jpg',
  theme: {
    primary: '#HexColor',
    secondary: '#HexColor',
    accent: '#HexColor',
    background: '#HexColor',
    text: '#HexColor'
  },
  categories: [
    { id: 'all', label: 'All' },
    { id: 'category1', label: 'Category 1' },
    // Add more categories
  ],
  products: [
    {
      id: 1,
      name: 'Product Name',
      description: 'Product description',
      price: 100,
      category: 'category1',
      image: 'https://...'
    },
    // Add more products
  ],
  contact: {
    phone: '(+63) 912-345-6789',
    email: 'email@client.com',
    address: 'Client Address',
    mapLink: 'https://goo.gl/maps/...',
    formsubmitEmail: 'formsubmit@email.com',
    storeHours: [
      { day: 'Monday', hours: '10 AM–10 PM', isClosed: false },
      // Add more days
    ]
  },
  messengerLink: 'https://www.messenger.com/t/PAGE_ID'
}
```

2. **Add logo image**:
   - Place logo image in `public/` folder
   - Reference as `/filename.png` or `/filename.jpg`

3. **Deploy** - Just push to GitHub and Render will automatically deploy!

## Example Configuration

### Client Data Structure (clients.js)

```
javascript
export const clients = {
  hometownbrew: {
    id: 'hometownbrew',
    name: 'Hometown Brew',
    logo: '/hblogo.jpg',
    theme: {
      primary: '#4A2C2A',
      secondary: '#8B4513',
      accent: '#D4A574',
      background: '#FFF8F0',
      text: '#2D1810'
    },
    products: [...],
    contact: {...},
    messengerLink: 'https://www.messenger.com/t/61560806385216'
  },
  
  milkteashop: {
    id: 'milkteashop',
    name: 'Milk Tea Shop',
    logo: '/milktea-logo.png',
    // ... other configuration
  }
}
```

### Using Client Data in Components

```
javascript
import { useClient } from '../context/ClientContext'

function MyComponent() {
  const { client } = useClient()
  
  // Access client-specific data
  const businessName = client?.name
  const logo = client?.logo
  const products = client?.products
  const messengerLink = client?.messengerLink
}
```

## Deploy to Render (Once!)

### Prerequisites
- GitHub account
- Render account

### Steps

1. **Push your code to GitHub**:
   
```
bash
   git add .
   git commit -m "Multi-client support"
   git push origin main
   
```

2. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Select your GitHub repository
   - Configure:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Get your URL (e.g., `your-site.onrender.com`)

5. **Add Custom Domains (Optional)**:
   - Go to your site settings → "Custom Domains"
   - Add your domain
   - Update DNS records as instructed

### How It Works

Once deployed:
- `your-site.onrender.com` → Shows default client
- `your-site.onrender.com/milkteashop` → Shows Milk Tea Shop
- `your-site.onrender.com/projectbrew` → Shows Project Brew

To add a new client:
1. Edit `src/data/clients.js` locally
2. Push to GitHub
3. Render automatically redeploys!
4. New client is live at `your-site.com/newclientname`

## Dynamic Theming

Client themes are applied as CSS variables automatically:

```
css
/* Components can use these CSS variables */
.component {
  background-color: var(--client-background);
  color: var(--client-text);
}

.button {
  background-color: var(--client-primary);
}
```

## Migration from Single Client

If you have an existing single-client website:

1. Move your hardcoded data to `src/data/clients.js`
2. Use the default client key (e.g., `hometownbrew`)
3. Components will automatically use client data from context
4. Test at `/yourclientid` route

## Troubleshooting

**404 on client routes**:
- Make sure all client IDs are added to the clients.js export
- Check that routes in App.jsx include all client IDs

**Products not showing**:
- Verify products array is in client configuration
- Check product category matches category ID

**Messenger link not working**:
- Ensure messengerLink is a valid Facebook Messenger URL
- Test the link format: `https://www.messenger.com/t/PAGE_ID`
