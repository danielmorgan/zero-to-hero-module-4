import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const Privacy = () => {
  return (
    <WebView
      source={{
        uri: "https://classic-krypton-604.notion.site/Privacy-Policy-0ab3dac6080a42d7b8fb9803cb39678e?pvs=4",
      }}
      style={{ flex: 1 }}
    />
  );
};

export default Privacy;
