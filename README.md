# 📦 Courier & Parcel Management System - Frontend

A modern, responsive web application for courier and delivery management built with React, Vite, and Tailwind CSS. This system provides comprehensive dashboards for admins, delivery agents, and customers with real-time tracking capabilities.

## 🔗 Related Repositories

- **Backend Server**: [courier-server](https://github.com/isalim079/courier-server) - Node.js backend with MongoDB and Socket.IO
- **Frontend Application**: [courier-frontend](https://github.com/isalim079/courier-frontend) - React frontend application (this repository)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- Role-based access control (Admin, Agent, Customer)
- Cookie-based authentication
- Private route protection

### 👑 Admin Dashboard
- **Dashboard Overview**: System statistics and analytics
- **All Bookings**: Comprehensive parcel management
- **User Management**: Manage customers and agents
- **Agent Assignment**: Assign parcels to delivery agents
- **Reports**: Generate system reports and analytics

### 🚚 Agent Dashboard
- **Agent Home**: Personal dashboard with overview
- **Assigned Parcels**: View and manage assigned deliveries
- **Delivery History**: Track completed deliveries
- **Real-time Location Tracking**: Share location with customers via Socket.IO

### 👤 Customer Dashboard
- **Customer Home**: Personal account overview
- **Book Parcel**: Create new delivery requests
- **Track Parcel**: Real-time parcel tracking with live maps
- **Booking History**: View past and current bookings

### 🗺️ Real-time Tracking System
- **Live Agent Location**: Real-time agent location updates
- **Google Maps Integration**: Interactive maps with markers
- **Multiple View Modes**: Overview, agent location, destination, and directions
- **Distance Calculation**: Automatic distance calculation between locations
- **Socket.IO Integration**: Real-time bidirectional communication

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **HTTP Client**: Axios 1.11.0
- **Real-time Communication**: Socket.IO Client 4.8.1
- **Form Handling**: React Hook Form 7.62.0
- **Notifications**: React Hot Toast 2.5.2
- **Icons**: Lucide React 0.536.0
- **Alerts**: SweetAlert2 11.22.3
- **Linting**: ESLint 9.30.1

## 📁 Project Structure

```
courier-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── API/
│   │   └── useAxiosPublic.jsx      # Axios configuration
│   ├── assets/
│   │   └── react.svg
│   ├── components/                 # Reusable UI components
│   ├── context/                    # React context providers
│   ├── hooks/                      # Custom React hooks
│   ├── layouts/                    # Layout components
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard/     # Admin panel components
│   │   │   ├── AgentDashboard/     # Agent panel components
│   │   │   └── CustomerDashboard/  # Customer panel components
│   │   └── shared/
│   │       ├── Login/              # Login page
│   │       └── Register/           # Registration page
│   ├── utils/
│   │   └── PrivateRoute.jsx        # Route protection
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   ├── App.css                     # Global styles
│   └── index.css                   # Base styles
├── eslint.config.js                # ESLint configuration
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Git** for version control

### Backend Requirements

This frontend application requires the backend server to be running. 

**Backend Repository**: [courier-server](https://github.com/isalim079/courier-server)

Make sure to:
1. Clone and set up the backend server from the repository above
2. Start the backend server on `http://localhost:3003`
3. Ensure API endpoints are available at `/api/v1`
4. Configure Socket.IO for real-time communication
5. Set up CORS with credentials support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/isalim079/courier-frontend.git
   cd courier-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

3. **Environment Configuration**
   
   Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend server URLs:
   ```env
   # Backend server configuration
   VITE_API_BASE_URL=http://localhost:3003/api/v1
   VITE_SOCKET_URL=http://localhost:3003
   VITE_NODE_ENV=development
   ```
   
   **Note**: If your backend server runs on different URLs, update these values accordingly.

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. All environment variables are defined in the `.env` file:

```env
# Backend Server Configuration
VITE_API_BASE_URL=http://localhost:3003/api/v1  # Backend API endpoint
VITE_SOCKET_URL=http://localhost:3003           # Socket.IO server endpoint
VITE_NODE_ENV=development                       # Development environment
```

### API Configuration

The API configuration is automatically handled through environment variables in `src/API/useAxiosPublic.jsx`. The application will use:
- `VITE_API_BASE_URL` for HTTP requests
- Falls back to `http://localhost:3003/api/v1` if not set

### Socket.IO Configuration

Socket.IO configuration is handled in `AgentDashboard.jsx` and uses:
- `VITE_SOCKET_URL` for real-time communication
- Falls back to `http://localhost:3003` if not set

### Production Configuration

For production deployment, update your `.env` file with production URLs:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_SOCKET_URL=https://your-api-domain.com
VITE_NODE_ENV=production
```

## 📱 Usage

### For Customers
1. **Register/Login**: Create an account or sign in
2. **Book Parcel**: Fill in pickup and delivery details
3. **Track Parcel**: Use tracking ID to see real-time location
4. **View History**: Check past bookings and deliveries

### For Delivery Agents
1. **Login**: Sign in with agent credentials
2. **View Assignments**: See assigned parcels for delivery
3. **Update Location**: Share real-time location while delivering
4. **Mark Deliveries**: Update delivery status

### For Administrators
1. **Login**: Sign in with admin credentials
2. **Manage System**: Oversee all bookings and users
3. **Assign Agents**: Allocate parcels to available agents
4. **Generate Reports**: View system analytics and reports

## 🗺️ Maps Integration

The application uses Google Maps for:
- Displaying agent and destination locations
- Calculating distances between points
- Showing delivery routes
- Multiple view modes (overview, agent focus, destination focus, directions)

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Isalim079**
- GitHub: [@isalim079](https://github.com/isalim079)

## 🐛 Issues & Support

If you encounter any issues or need support:
1. Check the [Issues](https://github.com/isalim079/courier-frontend/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce the problem

## 🔄 Version History

- **v0.0.0** - Initial release with basic courier management features
- Real-time tracking system
- Role-based dashboards
- Google Maps integration

---

**Built with ❤️ using React, Vite, and Tailwind CSS**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
