import { useWindowDimensions } from "react-native";
import { Matrix, Canvas, Fill } from "@shopify/react-native-skia";

export default function ClockBack() {
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={{ width: width, height: height }}>
      <Fill color={"red"} />
    </Canvas>
  );
}
