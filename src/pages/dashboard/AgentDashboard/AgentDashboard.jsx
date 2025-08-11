import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar/Sidebar";
import LocationPermissionModal from "../../../components/LocationPermissionModal";
import LocationStatusIndicator from "../../../components/LocationStatusIndicator";

const SOCKET_URL = "http://localhost:3003";
const ENABLE_SOCKET = true;

function AgentDashboard() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Debug: Log initial configuration
  // console.log("🔧 AgentDashboard initialized with config:", {
  //   SOCKET_URL,
  //   ENABLE_SOCKET,
  //   geolocationSupported: !!navigator.geolocation,
  //   permissionsSupported: !!navigator.permissions
  // });

  // Location tracking states
  const [isConnected, setIsConnected] = useState(false);
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const socketRef = useRef(null);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by this browser";
        setError(errorMsg);
        // toast.error(errorMsg);
        return false;
      }

      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      setLocationPermission(permission.state);

      if (permission.state === "denied") {
        const errorMsg =
          "Location access denied. Please enable location services for real-time tracking.";
        setError(errorMsg);
        // toast.error(errorMsg);
        return false;
      }

      if (permission.state === "prompt") {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocationPermission("granted");
              setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              setError(null);
              toast.success("Location access granted");
              resolve(true);
            },
            (error) => {
              console.error("Location error:", error);
              setLocationPermission("denied");
              setError(
                "Location access denied. Please enable location services."
              );
              toast.error(
                "Location access denied. Please enable location services."
              );
              resolve(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        });
      }

      return permission.state === "granted";
    } catch (error) {
      console.error("Permission request failed:", error);
      setError("Failed to request location permission: " + error.message);
      toast.error("Failed to request location permission");
      return false;
    }
  };

  // Initialize socket connection
  const initializeTracking = () => {
    if (!ENABLE_SOCKET) {
      console.log(
        "Socket.IO is disabled. Location tracking will work locally only."
      );
      setIsConnected(false);
      return;
    }

    if (!socketRef.current) {
      // For cookie-based authentication, we don't need to check for tokens
      // The browser will automatically send cookies with the Socket.IO connection

      console.log("Initializing Socket.IO connection with cookies...");

      const socketInstance = io(SOCKET_URL, {
        withCredentials: true, // This ensures cookies are sent with the connection
        autoConnect: true,
        transports: ["polling", "websocket"], // Try polling first, then websocket
        timeout: 20000, // 20 second timeout
        forceNew: true, // Force a new connection
      });

      socketInstance.on("connect", () => {
        console.log("✅ Connected to Socket.IO server");
        // console.log("🆔 Socket ID:", socketInstance.id);
        // console.log("🔗 Socket connected state:", socketInstance.connected);
        setIsConnected(true);
        setError(null);
        // toast.success("Connected to tracking service");
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("Disconnected from Socket.IO server:", reason);
        setIsConnected(false);
        setError("Disconnected from tracking service");
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);

        // More specific error handling
        if (error.message && error.message.includes("Authentication")) {
          setError("Authentication failed. Please make sure you're logged in.");
          // toast.error(
          //   "Authentication failed. Please refresh the page and try again."
          // );
        } else if (error.message && error.message.includes("400")) {
          setError(
            "Server rejected connection. Backend may not be configured for cookie auth."
          );
          // toast.error(
          //   "Connection rejected. Please check if you're logged in and the server is running."
          // );
        } else {
          setError("Failed to connect to tracking service: " + error.message);
          // toast.error("Failed to connect to tracking service");
        }
      });

      // Handle authentication errors
      socketInstance.on("auth_error", (error) => {
        console.error("Authentication error:", error);
        setIsConnected(false);
        setError("Authentication failed. Please make sure you're logged in.");
        // toast.error(
        //   "Authentication failed. Please refresh the page and try again."
        // );
      });

      // Add debugging events
      socketInstance.on("error", (error) => {
        console.error("Socket general error:", error);
      });

      // Handle location update responses from backend
      socketInstance.on("location_updated", (data) => {
        console.log("✅ Backend confirmed location saved:", data);
        // Optional: Show success toast
        // toast.success("Location updated in database");
      });

      // Handle general errors from backend
      socketInstance.on("error", (error) => {
        console.error("❌ Backend error:", error);
        setError("Backend error: " + error.message);
      });

      socketRef.current = socketInstance;
    }
  };

  // Start location tracking
  const startLocationTracking = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    if (locationPermission !== "granted") {
      const granted = await requestLocationPermission();
      if (!granted) return;
    }

    // Initialize socket connection if not already done
    if (!socketRef.current && ENABLE_SOCKET) {
      initializeTracking();
    }

    // Start watching position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentLocation(location);
        setError(null);

        // Debug check before emit
        // console.log("🔍 Debug check before emit:", {
        //   hasSocket: !!socketRef.current,
        //   isConnected: isConnected,
        //   enableSocket: ENABLE_SOCKET,
        //   socketId: socketRef.current?.id,
        //   connected: socketRef.current?.connected
        // });

        // Send location to socket if connected
        if (socketRef.current && socketRef.current.connected && ENABLE_SOCKET) {
          console.log("📍 Sending location update via Socket.IO:", location);
          // console.log("🔌 Socket state check:", {
          //   socketExists: !!socketRef.current,
          //   isConnected: isConnected,
          //   socketId: socketRef.current?.id,
          //   connected: socketRef.current?.connected,
          //   enableSocket: ENABLE_SOCKET
          // });
          
          const locationData = {
            lat: location.lat,
            lng: location.lng
          };
          
          // console.log("🚀 About to emit 'agent_location_update' with data:", locationData);
          
          try {
            // Send data in the exact format expected by backend: { lat, lng }
            socketRef.current.emit("agent_location_update", locationData);
            // console.log("✅ Socket.emit() called successfully for agent_location_update");
          } catch (emitError) {
            console.error("❌ Error during socket.emit:", emitError);
          }
          
          // console.log("✅ Location data sent to backend for database storage");
        } else {
          // Log when socket is not available
          // console.log("⚠️ Socket not connected - location update not sent:", {
          //   lat: location.lat,
          //   lng: location.lng,
          //   socketEnabled: ENABLE_SOCKET,
          //   isConnected: isConnected,
          //   hasSocket: !!socketRef.current,
          //   socketId: socketRef.current?.id,
          //   connected: socketRef.current?.connected,
          //   enableSocketValue: ENABLE_SOCKET
          // });
        }
      },
      (error) => {
        console.error("Location tracking error:", error);
        let errorMsg = "Location tracking failed";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location access denied by user";
            setLocationPermission("denied");
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out";
            break;
          default:
            errorMsg = "Unknown location error";
            break;
        }

        setError(errorMsg);
        toast.error(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      }
    );

    watchIdRef.current = watchId;
  };

  // Stop location tracking
  const stopLocationTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }

    setCurrentLocation(null);
    setError(null);
  };

  // Auto-start tracking when component mounts
  useEffect(() => {
    // Check initial permission state
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permission) => {
          setLocationPermission(permission.state);
          if (permission.state === "granted") {
            startLocationTracking();
          }
        })
        .catch(() => {
          setLocationPermission("prompt");
        });
    }

    return () => {
      stopLocationTracking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestPermission = async () => {
    if (locationPermission === "prompt") {
      setShowLocationModal(true);
    } else if (locationPermission === "denied") {
      // Show instructions to manually enable location in browser settings
      alert(
        "Location access is disabled. Please enable location access in your browser settings and refresh the page."
      );
    }
  };

  const handlePermissionResponse = async (granted) => {
    setShowLocationModal(false);
    if (granted) {
      await requestLocationPermission();
    }
  };

  // Manual retry connection function
  const retryConnection = () => {
    console.log("Manually retrying Socket.IO connection...");

    // Clean up existing connection
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setError(null);
    setIsConnected(false);

    // Reinitialize
    setTimeout(() => {
      initializeTracking();
    }, 1000);
  };

  // Test function to manually emit location update
  const testLocationEmit = () => {
    const testLocation = {
      lat: 40.7128, // NYC coordinates for testing
      lng: -74.0060
    };

    console.log("🧪 Testing manual location emit...");
    
    if (socketRef.current && socketRef.current.connected && ENABLE_SOCKET) {
      // console.log("🧪 Emitting test location:", testLocation);
      
      try {
        socketRef.current.emit("agent_location_update", testLocation);
        console.log("✅ Test emit successful");
        toast.success("Test location sent!");
      } catch (error) {
        console.error("❌ Test emit failed:", error);
        toast.error("Test emit failed");
      }
    } else {
      console.log("⚠️ Cannot test emit - socket not ready:", {
        hasSocket: !!socketRef.current,
        isConnected,
        actualSocketConnected: socketRef.current?.connected,
        enableSocket: ENABLE_SOCKET
      });
      toast.error("Socket not connected for testing");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Location Status Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <LocationStatusIndicator
            isConnected={isConnected}
            locationPermission={locationPermission}
            currentLocation={currentLocation}
            onRequestPermission={handleRequestPermission}
          />
          
          {/* Temporary test button for debugging */}
          {socketRef.current && socketRef.current.connected && (
            <button
              onClick={testLocationEmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              🧪 Test Manual Location Emit
            </button>
          )}
          
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              <div className="flex items-center justify-between">
                <span>Location Error: {error}</span>
                {error.includes("Socket") ||
                error.includes("connect") ||
                error.includes("Server") ? (
                  <button
                    onClick={retryConnection}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    Retry Connection
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Location Permission Modal */}
      {showLocationModal && (
        <LocationPermissionModal onResponse={handlePermissionResponse} />
      )}
    </div>
  );
}

export default AgentDashboard;
