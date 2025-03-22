import 'dotenv/config';

export default {
name: "my-sns2",
slug: "my-sns2",
version: "1.0.0",
orientation: "portrait",
icon: "./assets/icon.png",
userInterfaceStyle: "light",
newArchEnabled: true,
splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
},
ios: {
    supportsTablet: true
},
android: {
    adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#ffffff"
    }
},
web: {
    favicon: "./assets/favicon.png"
},
}; 