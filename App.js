import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { v4 as uuidv4 } from "uuid";
import {
  isMobile,
  osName,
  browserName,
  browserVersion,
} from "react-device-detect";
import DeviceInfo from "react-native-device-info";
import { db } from "./firebaseConfig";
//import Clock from "./components/clock/clock";
export default function App() {
  const [uuid, setUuid] = useState(null);

  const [isBrowser, setIsBrowser] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [time, setTime] = useState(null);
  const [browserName2, setBrowserName] = useState(null);
  const [browserVersion2, setBrowserVersion] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [deviceModel, setDeviceModel] = useState(null);
  const [device, setDevice] = useState(null);
  const [operatingSystem, setOperatingSystem] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const generateUuid = () => {
      let storedUuid = localStorage.getItem("uuid");
      if (!storedUuid) {
        storedUuid = uuidv4();
        localStorage.setItem("uuid", storedUuid);
      }
      setUuid(storedUuid);
    };

    const checkIsBrowser = () => {
      setDeviceModel(DeviceInfo.getBrand());

      const isWeb = !!(window && window.document);
      setIsBrowser(isWeb);
      if (isWeb) {
        const { name, version, platform } = getBrowserInfo();
        setBrowserName(name);
        setBrowserVersion(version);
        setPlatform(platform);
      } else {
        const { device, os } = Constants;
        setDevice(device.modelName);
        setOperatingSystem(os.name);
      }
    };

    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported");
      }
    };

    const getPanamaTime = async () => {
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/America/Panama"
        );
        const data = await response.json();
        const panamaTime = new Date(data.datetime).toLocaleString();
        setTime(panamaTime);
      } catch (error) {
        console.log(error);
      }
    };

    generateUuid();
    //generateSerialNumber();
    checkIsBrowser();
    getGeolocation();
    getPanamaTime();

    const interval = setInterval(getPanamaTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const name = getBrowserName(userAgent);
    const version = getBrowserVersion(userAgent);
    const platform = navigator.platform;

    return { name, version, platform };
  };

  const getBrowserName = (userAgent) => {
    if (userAgent.includes("edge")) {
      return "Microsoft Edge";
    } else if (userAgent.includes("chrome")) {
      return "Google Chrome";
    } else if (userAgent.includes("safari")) {
      return "Safari";
    } else if (userAgent.includes("firefox")) {
      return "Mozilla Firefox";
    } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
      return "Opera";
    } else if (userAgent.includes("msie") || userAgent.includes("trident")) {
      return "Internet Explorer";
    } else {
      return "Unknown";
    }
  };

  const getBrowserVersion = (userAgent) => {
    const regex =
      /(?:edge|chrome|safari|firefox|opera|msie|rv(?::|\s))\/([\d.]+)/;
    const match = userAgent.match(regex);
    return match ? match[1] : "Unknown";
  };

  const getUserDeviceInfo = () => {
    let userDeviceInfo = "";
    if (isBrowser) {
      userDeviceInfo = `${browserName2} (${browserVersion2}) on ${platform}`;
    } else if (isMobile) {
      userDeviceInfo = `Mobile Device: ${getMobileDeviceName()} (${osName})`;
    } else {
      userDeviceInfo = "Unknown";
    }
    return userDeviceInfo;
  };

  const getDeviceInfo = () => {
    if (isMobile) {
      // Está en un dispositivo móvil
      const deviceName_2 = getMobileDeviceName();
      const operatingSystem = getOperatingSystem();
      return `Mobile Device: ${deviceName_2} (${operatingSystem})`;
    } else {
      // Está en una computadora
      const browser = getBrowserInfo_2();
      const operatingSystem = getOperatingSystem();
      return `Desktop - Browser: ${browser} - OS: ${operatingSystem}`;
    }
  };

  const getMobileDeviceName = () => {
    const userAgent = navigator.userAgent;
    let deviceName = "Unknown";

    if (/iPhone|iPod/.test(userAgent)) {
      deviceName = "iPhone";
    } else if (/iPad/.test(userAgent)) {
      deviceName = "iPad";
    } else if (/Android/.test(userAgent)) {
      deviceName = "Android";
    } else if (/Windows Phone/.test(userAgent)) {
      deviceName = "Windows Phone";
    }

    return deviceName;
  };

  const getBrowserInfo_2 = () => {
    const browser = `${browserName} ${browserVersion}`;
    return browser;
  };

  const getOperatingSystem = () => {
    const operatingSystem = osName;
    return operatingSystem;
  };

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };
  const getHandStyle = (angle) => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: 4,
      height: 80,
      backgroundColor: "black",
      transform: [
        { translateX: -2 },
        { translateY: -40 },
        { rotate: `${angle}deg` },
      ],
      zIndex: 2,
      borderRadius: 2,
    };
  };

  // Obtener el ángulo de rotación para las manecillas
  const getHandAngle = (unit) => {
    const now = new Date();
    const degreesPerUnit = 360 / (unit === "hour" ? 12 : 60);
    const offset = unit === "hour" ? 90 : 270;
    let angle = unit === "hour" ? now.getHours() : now.getMinutes();
    if (unit === "hour") {
      angle = (angle % 12) * degreesPerUnit;
    } else {
      angle *= degreesPerUnit;
    }
    return angle + offset;
  };

  const getTickStyle = (index) => {
    return {
      position: "absolute",
      width: 2,
      height: 10,
      backgroundColor: "gray",
      top: 0,
      left: 99,
      transform: [{ rotate: `${index * 30}deg` }],
      transformOrigin: "0 100%",
    };
  };

  const getTickContainerStyle = () => {
    return {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
      borderColor: "gray",
      borderWidth: 2,
      transform: [{ rotate: "15deg" }],
    };
  };
  const handleInsertData = async () => {
    try {
      const collectionRef = await db.collection("Registro");

      // Datos a insertar en Firestore
      const data = {
        horaPanama: new Date().toLocaleString(),
        latitud: latitude,
        longitud: longitude,
        uuid: uuid,
        dispositivo: isMobile ? "Mobile" : "Desktop",
        sistemaOperativo: isMobile ? osName : getOperatingSystem(),
        browser: isBrowser ? browserName2 : getBrowserInfo_2(),
        versionBrowser: isBrowser ? browserVersion2 : browserVersion,
      };

      // Insertar datos en Firestore             await collectionRef.add(data);
      console.log("Datos insertados correctamente en Firestore.");
    } catch (error) {
      console.error("Error al insertar datos en Firestore:", error);
    }
  };

  const [deviceModel1, setDeviceModel1] = useState(null);

  useEffect(() => {
    const checkDeviceModel = async () => {
      try {
        const deviceModel = await DeviceInfo.getBrand();
        setDeviceModel1(deviceModel);
        console.log(deviceModel);
      } catch (error) {
        console.error("Error al obtener el modelo del dispositivo:", error);
      }
      console.log(deviceModel);
    };

    checkDeviceModel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, User!</Text>
      </View>

      <Text style={styles.text}>Time (Panama): {time}</Text>

      <TouchableOpacity style={styles.button} onPress={handleInsertData}>
        {[...Array(12)].map((_, index) => (
          <View key={index} style={getTickStyle(index)} />
        ))}
        <View style={styles.buttonCircle}>
          {/* Renderizar las rayitas */}

          <View style={getTickContainerStyle()}></View>
          {/* Renderizar las manecillas */}
          <View style={getHandStyle(getHandAngle("hour"))} />
          <View style={getHandStyle(getHandAngle("minute"))} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>UUID: {uuid}</Text>
      <Text style={styles.text}>Model: {deviceModel1}</Text>
      <Text style={styles.text}>{getDeviceInfo()}</Text>
      <Text style={styles.text}>Browser: {getUserDeviceInfo()}</Text>
      <Text style={styles.text}>Latitude: {latitude}</Text>
      <Text style={styles.text}>Longitude: {longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  timelineContainer: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    transform: [{ rotate: "-15deg" }],
  },
  timelineTick: {
    position: "absolute",
    top: 0,
    left: 76,
    width: 2,
    height: 12,
    backgroundColor: "gray",
    transform: [{ rotate: "30deg" }],
  },
  text: {
    color: "black",
    marginBottom: 10,
  },
});
